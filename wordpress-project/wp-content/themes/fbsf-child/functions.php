<?php
/**
 * FBSF Child theme functions.
 *
 * Enqueues the design system CSS and interaction scripts, registers SVG
 * icons, adds admin bar shortcut and small theme tweaks. Header/footer are
 * delivered by the Elementor Theme Builder templates.
 *
 * @package FBSF_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'FBSF_CHILD_VERSION', '1.0.0' );
define( 'FBSF_CHILD_PATH', get_template_directory() );
define( 'FBSF_CHILD_URL', get_template_directory_uri() );

/**
 * Theme setup.
 */
function fbsf_child_setup() {
    // Let the parent theme handle display.
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'fbsf_child_setup' );

/**
 * Enqueue assets on the front end.
 */
function fbsf_child_assets() {
    // Design system (cards, filters, accordions, timeline, tokens).
    wp_enqueue_style(
        'fbsf-style',
        FBSF_CHILD_URL . '/assets/css/fbsf-style.css',
        array(),
        FBSF_CHILD_VERSION
    );

    // Plugin shortcode component styles (loaded after theme styles).
    if ( defined( 'FBSF_CORE_URL' ) ) {
        wp_enqueue_style(
            'fbsf-shortcodes',
            FBSF_CORE_URL . 'assets/css/fbsf-shortcodes.css',
            array( 'fbsf-style' ),
            FBSF_CORE_VERSION
        );
    }

    // Interaction scripts (back-to-top, smooth scroll, filters, notices).
    wp_enqueue_script(
        'fbsf-scripts',
        FBSF_CHILD_URL . '/assets/js/fbsf-scripts.js',
        array(),
        FBSF_CHILD_VERSION,
        true
    );

    // Pass site options to the front-end script (safe subset).
    if ( class_exists( 'FBSF_Options' ) ) {
        $opts = FBSF_Options::get();
    } else {
        $opts = array(
            'site_name' => 'Faculty of Business Studies and Finance',
            'site_short' => 'FBSF',
            'tel' => '',
            'email' => '',
        );
    }
    wp_localize_script( 'fbsf-scripts', 'FBSF_DATA', array(
        'site'     => array(
            'name'    => $opts['site_name'],
            'short'   => $opts['site_short'],
            'tel'     => $opts['tel'],
            'email'   => $opts['email'],
        ),
        'assets'   => array(
            'logo' => FBSF_CHILD_URL . '/assets/images/logo.svg',
        ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'fbsf_child_assets' );

/**
 * Smooth scrolling + compact Elementor topbar tweaks.
 */
function fbsf_child_smooth_scroll() {
    ?>
    <style>
        html {
            scroll-behavior: smooth;
        }
        /* Elementor topbar compatibility */
        .fbsf-topbar {
            background: #192f59;
            color: #fff;
            font-size: 13px;
        }
        .fbsf-topbar a {
            color: #fff;
            text-decoration: none;
        }
    </style>
    <?php
}
add_action( 'wp_head', 'fbsf_child_smooth_scroll', 90 );

/**
 * Add a back-to-top button to the body end (rendered by JS).
 */
function fbsf_child_back_to_top() {
    echo '<button class="fbsf-back-to-top" type="button" aria-label="Back to top">&#8593;</button>';
}
add_action( 'wp_footer', 'fbsf_child_back_to_top' );

/**
 * Register image sizes for the site.
 */
function fbsf_child_image_sizes() {
    add_image_size( 'fbsf-card', 480, 320, true );
    add_image_size( 'fbsf-wide', 1200, 480, true );
}
add_action( 'init', 'fbsf_child_image_sizes' );

/**
 * Register SVG icon library for Elementor icon pickers.
 */
function fbsf_child_register_icons() {
    if ( ! defined( 'ELEMENTOR_VERSION' ) ) {
        return;
    }
    \Elementor\Icons_Manager::register_icon( array(
        'bsf-logo'    => array( 'name' => 'bsf-logo', 'prefix' => 'bsf', 'label' => 'FBSF Logo', 'attrs' => array() ),
        'bsf-book'    => array( 'name' => 'bsf-book', 'prefix' => 'bsf', 'label' => 'Book / Journal', 'attrs' => array() ),
        'bsf-users'   => array( 'name' => 'bsf-users', 'prefix' => 'bsf', 'label' => 'Users / Students', 'attrs' => array() ),
        'bsf-calendar' => array( 'name' => 'bsf-calendar', 'prefix' => 'bsf', 'label' => 'Calendar / Events', 'attrs' => array() ),
    ) );
}
add_action( 'elementor/icons/register', 'fbsf_child_register_icons' );

/**
 * Disable the parent theme's default header on Elementor pages (the
 * Elementor Theme Builder header replaces it).
 */
function fbsf_child_disable_default_header() {
    if ( ! defined( 'ELEMENTOR_VERSION' ) ) {
        return;
    }
    $enable = get_option( 'fbsf_disable_header' );
    if ( '1' === $enable ) {
        remove_action( 'wp_header', 'twentytwentyfive_header', 10 );
    }
}
add_action( 'wp', 'fbsf_child_disable_default_header' );

/**
 * Include custom post types in WordPress search results.
 */
function fbsf_child_search_cpt( $query ) {
    if ( ! is_admin() && $query->is_main_query() && $query->is_search() ) {
        $post_types = array( 'page', 'post', 'fbsf_programme', 'fbsf_department', 'fbsf_journal', 'fbsf_article', 'fbsf_event', 'fbsf_staff', 'fbsf_download' );
        $query->set( 'post_type', $post_types );
    }
    return $query;
}
add_action( 'pre_get_posts', 'fbsf_child_search_cpt' );

/**
 * Enqueue the FBSF admin repeater styles on CPT edit screens.
 */
function fbsf_child_admin_assets( $hook ) {
    if ( false === strpos( $hook, 'post.php' ) && false === strpos( $hook, 'post-new.php' ) ) {
        return;
    }
    $post_type = isset( $_GET['post_type'] ) ? sanitize_text_field( wp_unslash( $_GET['post_type'] ) ) : '';
    if ( in_array( $post_type, array( 'fbsf_department', 'fbsf_programme', 'fbsf_journal', 'fbsf_article', 'fbsf_event', 'fbsf_staff', 'fbsf_download' ), true ) ) {
        wp_enqueue_style( 'fbsf-shortcodes', FBSF_CORE_URL . 'assets/css/fbsf-shortcodes.css', array(), FBSF_CORE_VERSION );
        wp_enqueue_script( 'fbsf-repeater', FBSF_CORE_URL . 'assets/js/fbsf-repeater.js', array( 'jquery' ), FBSF_CORE_VERSION, true );
    }
}
add_action( 'admin_enqueue_scripts', 'fbsf_child_admin_assets' );

/**
 * Include helper classes.
 */
require_once FBSF_CHILD_PATH . '/inc/class-fbsf-theme.php';
