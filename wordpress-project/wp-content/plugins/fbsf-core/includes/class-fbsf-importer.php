<?php
/**
 * Content importer for the FBSF website.
 *
 * Imports the machine-generated migration file (fbsf-wp-import.json) which
 * contains: global options, taxonomy terms, custom post types, Elementor
 * page layouts, Elementor header/footer/reusable templates and the primary
 * navigation menu. Idempotent — re-running updates existing posts by slug.
 *
 * Usage:
 *   wp fbsf import --file=/path/to/fbsf-wp-import.json
 *   # or via Tools → FBSF Import (admin upload)
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Importer registration and logic.
 */
class FBSF_Importer {

    /**
     * Register WP-CLI command + admin tools page.
     */
    public static function register() {
        if ( defined( 'WP_CLI' ) && WP_CLI ) {
            WP_CLI::add_command( 'fbsf', array( __CLASS__, 'cli' ) );
        }
        add_action( 'admin_menu', array( __CLASS__, 'admin_menu' ) );
        add_action( 'admin_post_fbsf_import', array( __CLASS__, 'handle_admin_post' ) );
    }

    /**
     * Admin Tools submenu.
     */
    public static function admin_menu() {
        add_management_page(
            __( 'FBSF Content Import', 'fbsf-core' ),
            __( 'FBSF Import', 'fbsf-core' ),
            'manage_options',
            'fbsf-import',
            array( __CLASS__, 'render_admin_page' )
        );
    }

    /**
     * Admin page render.
     */
    public static function render_admin_page() {
        ?>
        <div class="wrap">
            <h1><?php esc_html_e( 'FBSF Content Import', 'fbsf-core' ); ?></h1>
            <p><?php esc_html_e( 'Upload the migration JSON file to build the website content (departments, programmes, journals, events, pages, Elementor templates and menus).', 'fbsf-core' ); ?></p>
            <form method="post" action="admin-post.php" enctype="multipart/form-data">
                <?php wp_nonce_field( 'fbsf_import_upload', 'fbsf_import_nonce' ); ?>
                <p>
                    <input type="file" name="fbsf_import_file" accept=".json" required />
                    <input type="submit" class="button button-primary" value="<?php esc_attr_e( 'Import', 'fbsf-core' ); ?>" />
                </p>
            </form>
            <p class="description"><?php esc_html_e( 'Tip: run "wp fbsf import --file=..." on the server for large sites.', 'fbsf-core' ); ?></p>
        </div>
        <?php
    }

    /**
     * Handle admin form post.
     */
    public static function handle_admin_post() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Insufficient permissions.', 'fbsf-core' ) );
        }
        check_admin_referer( 'fbsf_import_upload', 'fbsf_import_nonce' );
        if ( empty( $_FILES['fbsf_import_file']['tmp_name'] ) ) {
            wp_die( esc_html__( 'No file uploaded.', 'fbsf-core' ) );
        }
        $json = file_get_contents( sanitize_text_field( wp_unslash( $_FILES['fbsf_import_file']['tmp_name'] ) ) );
        if ( ! $json ) {
            wp_die( esc_html__( 'Could not read file.', 'fbsf-core' ) );
        }
        $data = json_decode( $json, true );
        if ( ! is_array( $data ) ) {
            wp_die( esc_html__( 'Invalid JSON file.', 'fbsf-core' ) );
        }
        $result = self::import( $data );
        wp_redirect( admin_url( 'admin.php?page=fbsf-import&fbsf_result=' . urlencode( wp_json_encode( $result ) ) ) );
        exit;
    }

    /**
     * WP-CLI command.
     */
    public static function cli( $args, $assoc ) {
        $file = isset( $assoc['file'] ) ? $assoc['file'] : '';
        if ( ! $file || ! file_exists( $file ) ) {
            WP_CLI::error( 'Usage: wp fbsf import --file=/path/to/fbsf-wp-import.json' );
        }
        $data = json_decode( file_get_contents( $file ), true );
        if ( ! is_array( $data ) ) {
            WP_CLI::error( 'Invalid JSON file.' );
        }
        $result = self::import( $data );
        WP_CLI::log( 'FBSF import completed: ' . wp_json_encode( $result ) );
    }

    /**
     * Execute the import.
     *
     * @param array $data Import payload.
     * @return array Summary counts.
     */
    public static function import( $data ) {
        $summary = array(
            'terms' => 0, 'departments' => 0, 'programmes' => 0, 'journals' => 0,
            'articles' => 0, 'events' => 0, 'downloads' => 0, 'pages' => 0,
            'templates' => 0, 'menu' => 0,
        );

        // 1. Taxonomy terms.
        $terms = isset( $data['taxonomies'] ) ? $data['taxonomies'] : array();
        foreach ( $terms as $taxonomy => $names ) {
            foreach ( (array) $names as $name ) {
                $slug = sanitize_title( $name );
                $existing = get_term_by( 'slug', $slug, $taxonomy );
                if ( $existing ) {
                    continue;
                }
                $result = wp_insert_term( $name, $taxonomy, array( 'slug' => $slug ) );
                if ( ! is_wp_error( $result ) ) {
                    $summary['terms']++;
                }
            }
        }

        // 2. Global options.
        if ( isset( $data['options'] ) && is_array( $data['options'] ) ) {
            update_option( FBSF_Options::OPTION_NAME, array_merge( FBSF_Options::defaults(), $data['options'] ) );
        }

        // 3. Custom post types.
        foreach ( array( 'departments', 'programmes', 'journals', 'articles', 'events', 'downloads' ) as $kind ) {
            if ( ! isset( $data[ $kind ] ) ) {
                continue;
            }
            foreach ( $data[ $kind ] as $item ) {
                if ( ! isset( $item['slug'] ) ) {
                    continue;
                }
                $post_type = self::post_type_for_kind( $kind );
                $post_id = self::upsert_post( $item, $post_type );
                if ( $post_id ) {
                    $summary[ $kind ]++;
                }
            }
        }

        // 4. Pages with Elementor layouts.
        if ( isset( $data['pages'] ) ) {
            foreach ( $data['pages'] as $page ) {
                if ( ! isset( $page['slug'] ) ) {
                    continue;
                }
                $post_id = self::upsert_post( $page, 'page' );
                if ( $post_id && isset( $page['elementor'] ) ) {
                    update_post_meta( $post_id, 'elementor_data', $page['elementor'] );
                }
                if ( $post_id ) {
                    $summary['pages']++;
                }
            }
        }

        // 5. Front page.
        if ( isset( $data['front_page'] ) && $summary['pages'] ) {
            $home_id = self::find_post_by_slug( $data['front_page'], 'page' );
            if ( $home_id ) {
                update_option( 'show_on_front', 'page' );
                update_option( 'page_on_front', $home_id );
            }
        }

        // 6. Elementor templates (header, footer, search results).
        if ( isset( $data['templates'] ) ) {
            foreach ( $data['templates'] as $key => $template ) {
                if ( ! isset( $template['content'] ) ) {
                    continue;
                }
                $post_id = self::upsert_template( $key, $template );
                if ( $post_id ) {
                    $summary['templates']++;
                }
            }
        }

        // 6b. Single templates (department / programme / journal / event).
        if ( isset( $data['singles'] ) ) {
            foreach ( $data['singles'] as $key => $single ) {
                if ( ! isset( $single['content'] ) ) {
                    continue;
                }
                $post_id = self::upsert_template( 'single-' . $key, $single );
                if ( $post_id ) {
                    $summary['templates']++;
                }
            }
        }

        // 6c. Reusable templates (Elementor Template Library).
        if ( isset( $data['reusable'] ) ) {
            foreach ( $data['reusable'] as $i => $reusable ) {
                $title = isset( $reusable['title'] ) ? $reusable['title'] : 'FBSF Reusable ' . ( $i + 1 );
                $post_id = self::upsert_template( 'reusable-' . ( $i + 1 ), array(
                    'title'   => $title,
                    'content' => $reusable['content'],
                ) );
                if ( $post_id ) {
                    $summary['templates']++;
                }
            }
        }

        // 6d. Rewrite {{child}} placeholders in all Elementor content.
        self::rewrite_child_urls( $data );

        // 7. Menus.
        if ( isset( $data['menu'] ) && is_array( $data['menu'] ) ) {
            $menu_id = wp_create_nav_menu( isset( $data['menu']['name'] ) ? $data['menu']['name'] : 'FBSF Primary' );
            if ( ! is_wp_error( $menu_id ) ) {
                self::build_menu_items( $menu_id, $data['menu']['items'] ?? array() );
                $summary['menu']++;
            }
        }

        // 8. Assign the menu to header template nav widget.
        if ( $summary['menu'] && ! empty( $summary['templates'] ) && defined( 'ELEMENTOR_VERSION' ) ) {
            self::patch_nav_menu_templates();
        }

        // 9. Permalinks.
        flush_rewrite_rules();

        return $summary;
    }

    /**
     * Replace {{child}} placeholders with the child theme asset URL in all
     * Elementor content (pages + templates). Mutates $data in place.
     */
    private static function rewrite_child_urls( &$data ) {
        $child_url = defined( 'FBSF_CHILD_URL' )
            ? trailingslashit( FBSF_CHILD_URL )
            : trailingslashit( get_template_directory_uri() ) . '/assets/images/';
        $replace = function ( &$node ) use ( $child_url, &$replace ) {
            if ( is_array( $node ) ) {
                foreach ( $node as &$value ) {
                    if ( is_array( $value ) ) {
                        $replace( $value );
                    } elseif ( is_string( $value ) ) {
                        $value = str_replace( '{{child}}', $child_url, $value );
                    }
                }
            }
        };
        if ( isset( $data['pages'] ) ) {
            foreach ( $data['pages'] as &$page ) {
                if ( isset( $page['elementor'] ) ) {
                    $replace( $page['elementor'] );
                }
            }
        }
        if ( isset( $data['templates'] ) ) {
            foreach ( $data['templates'] as &$template ) {
                $replace( $template );
            }
        }
        if ( isset( $data['singles'] ) ) {
            foreach ( $data['singles'] as &$single ) {
                $replace( $single );
            }
        }
        if ( isset( $data['reusable'] ) ) {
            foreach ( $data['reusable'] as &$reusable ) {
                $replace( $reusable );
            }
        }
    }

    /**
     * Map import kind → post type.
     */
    private static function post_type_for_kind( $kind ) {
        $map = array(
            'departments' => 'fbsf_department',
            'programmes'  => 'fbsf_programme',
            'journals'    => 'fbsf_journal',
            'articles'    => 'fbsf_article',
            'events'      => 'fbsf_event',
            'downloads'   => 'fbsf_download',
        );
        return $map[ $kind ] ?? 'post';
    }

    /**
     * Find post by slug (any post type).
     */
    private static function find_post_by_slug( $slug, $post_type = 'post' ) {
        $query = new WP_Query( array(
            'post_type'      => $post_type,
            'name'           => sanitize_title( $slug ),
            'posts_per_page' => 1,
        ) );
        if ( $query->have_posts() ) {
            return get_post( $query->post->ID )->ID;
        }
        return 0;
    }

    /**
     * Upsert a post (by slug) with meta + terms.
     */
    private static function upsert_post( $item, $post_type ) {
        $slug = sanitize_title( $item['slug'] );
        $post_id = self::find_post_by_slug( $slug, $post_type );
        if ( ! $post_id ) {
            $post_id = wp_insert_post( array(
                'post_title'   => isset( $item['title'] ) ? wp_kses_post( $item['title'] ) : $slug,
                'post_name'    => $slug,
                'post_type'    => $post_type,
                'post_status'  => isset( $item['status'] ) ? $item['status'] : 'publish',
                'post_content' => isset( $item['content'] ) ? wp_kses_post( $item['content'] ) : '',
                'post_excerpt' => isset( $item['excerpt'] ) ? wp_kses_post( $item['excerpt'] ) : '',
                'menu_order'   => isset( $item['menu_order'] ) ? absint( $item['menu_order'] ) : 0,
            ) );
            if ( is_wp_error( $post_id ) ) {
                return 0;
            }
        }

        // Meta.
        if ( isset( $item['meta'] ) && is_array( $item['meta'] ) ) {
            foreach ( $item['meta'] as $key => $value ) {
                if ( is_array( $value ) ) {
                    update_post_meta( $post_id, $key, $value );
                } else {
                    update_post_meta( $post_id, $key, wp_kses_post( $value ) );
                }
            }
        }

        // Terms.
        if ( isset( $item['terms'] ) && is_array( $item['terms'] ) ) {
            foreach ( $item['terms'] as $taxonomy => $term_slugs ) {
                $ids = array();
                foreach ( (array) $term_slugs as $term_slug ) {
                    $term = get_term_by( 'slug', sanitize_title( $term_slug ), $taxonomy );
                    if ( $term && ! is_wp_error( $term ) ) {
                        $ids[] = $term->term_id;
                    }
                }
                if ( $ids ) {
                    wp_set_post_terms( $post_id, $ids, $taxonomy, true );
                }
            }
        }
        return $post_id;
    }

    /**
     * Upsert an Elementor template (elementor_library post).
     */
    private static function upsert_template( $key, $template ) {
        $slug = 'fbsf-template-' . sanitize_title( $key );
        $post_id = self::find_post_by_slug( $slug, 'elementor_library' );
        $title = isset( $template['title'] ) ? $template['title'] : $key;
        if ( ! $post_id ) {
            $post_id = wp_insert_post( array(
                'post_title'   => $title,
                'post_name'    => $slug,
                'post_type'    => 'elementor_library',
                'post_status'  => 'publish',
            ) );
            if ( is_wp_error( $post_id ) ) {
                return 0;
            }
        }
        update_post_meta( $post_id, 'elementor_data', $template['content'] );
        if ( in_array( $key, array( 'header', 'footer' ), true ) ) {
            update_post_meta( $post_id, 'elementor_template_type', $key );
            update_post_meta( $post_id, 'elementor_template_condition', 'all' );
        }
        return $post_id;
    }

    /**
     * Build WP menu items (pages by slug + custom URLs + dropdowns).
     */
    private static function build_menu_items( $menu_id, $items ) {
        foreach ( $items as $item ) {
            $type = isset( $item['type'] ) ? $item['type'] : 'custom';
            $args = array(
                'menu-item-title'  => isset( $item['title'] ) ? wp_kses_post( $item['title'] ) : '',
                'menu-item-status' => 'publish',
                'menu-item-type'   => $type,
                'menu-item-parent' => isset( $item['parent'] ) ? $item['parent'] : 0,
            );
            if ( 'page' === $type ) {
                $page_id = self::find_post_by_slug( $item['page'] ?? '', 'page' );
                if ( $page_id ) {
                    $args['menu-item-object']    = 'page';
                    $args['menu-item-object-id'] = $page_id;
                }
            } elseif ( 'custom' === $type ) {
                $args['menu-item-url'] = isset( $item['url'] ) ? esc_url( $item['url'] ) : '#';
            } elseif ( 'taxonomy' === $type ) {
                $term = get_term_by( 'slug', sanitize_title( $item['term'] ?? '' ), $item['taxonomy'] ?? 'categories' );
                if ( $term && ! is_wp_error( $term ) ) {
                    $args['menu-item-object']    = $item['taxonomy'];
                    $args['menu-item-object-id'] = $term->term_id;
                }
            }
            $item_id = wp_update_nav_menu_item( $menu_id, 0, $args );
            if ( isset( $item['children'] ) && is_array( $item['children'] ) && ! is_wp_error( $item_id ) ) {
                self::build_menu_items( $menu_id, $item['children'] );
            }
        }
    }

    /**
     * Patch nav-menu widget settings in header/footer templates to use the
     * created menu (so Theme Builder templates render the primary menu).
     */
    private static function patch_nav_menu_templates() {
        $menus = wp_get_nav_menus();
        if ( empty( $menus ) ) {
            return;
        }
        $menu_id = $menus[0]->term_id;
        $templates = get_posts( array(
            'post_type'      => 'elementor_library',
            'posts_per_page' => 50,
            'meta_key'       => 'elementor_template_type',
            'meta_value'     => 'header',
        ) );
        foreach ( $templates as $template ) {
            $data = get_post_meta( $template->ID, 'elementor_data', true );
            if ( ! is_array( $data ) || empty( $data['content'] ) ) {
                continue;
            }
            self::patch_nav_widget( $data['content'], $menu_id );
            update_post_meta( $template->ID, 'elementor_data', $data );
        }
    }

    /**
     * Recursively set 'menu' on nav-menu widgets.
     */
    private static function patch_nav_widget( &$nodes, $menu_id ) {
        if ( ! is_array( $nodes ) ) {
            return;
        }
        foreach ( $nodes as $node ) {
            if ( ! is_array( $node ) ) {
                continue;
            }
            if ( isset( $node['widgetType'] ) && 'nav-menu' === $node['widgetType'] && isset( $node['settings']['menu'] ) ) {
                $node['settings']['menu'] = $menu_id;
            }
            if ( isset( $node['elements'] ) && is_array( $node['elements'] ) ) {
                self::patch_nav_widget( $node['elements'], $menu_id );
            }
        }
    }
}
