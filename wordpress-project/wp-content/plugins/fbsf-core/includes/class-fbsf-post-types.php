<?php
/**
 * Custom Post Types for the FBSF website.
 *
 * CPTs: department, programme, journal, article, event, staff, download.
 * Each CPT gets a structured meta box; repeater data is stored as JSON in
 * a hidden field and edited with the bundled repeater UI (fbsf-repeater.js).
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Post type and meta box registration.
 */
class FBSF_Post_Types {

    /**
     * Register all custom post types.
     */
    public static function register() {
        self::register_department();
        self::register_programme();
        self::register_journal();
        self::register_article();
        self::register_event();
        self::register_staff();
        self::register_download();
    }

    /* ------------------------------------------------------------------
     * Department
     * ------------------------------------------------------------------ */

    private static function register_department() {
        register_post_type( 'fbsf_department', array(
            'labels'            => array(
                'name'          => __( 'Faculty Departments', 'fbsf-core' ),
                'singular_name' => __( 'Department', 'fbsf-core' ),
                'menu_name'     => __( 'Departments', 'fbsf-core' ),
                'add_new'       => __( 'Add Department', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Department', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Department', 'fbsf-core' ),
                'new_item'      => __( 'New Department', 'fbsf-core' ),
                'view_item'     => __( 'View Department', 'fbsf-core' ),
                'search_items'  => __( 'Search Departments', 'fbsf-core' ),
                'not_found'     => __( 'No departments found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Departments',
            'menu_icon'        => 'dashicons-building',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => true,
            'rewrite'          => array( 'slug' => 'department', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Programme
     * ------------------------------------------------------------------ */

    private static function register_programme() {
        register_post_type( 'fbsf_programme', array(
            'labels'            => array(
                'name'          => __( 'Academic Programmes', 'fbsf-core' ),
                'singular_name' => __( 'Programme', 'fbsf-core' ),
                'menu_name'     => __( 'Programmes', 'fbsf-core' ),
                'add_new'       => __( 'Add Programme', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Programme', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Programme', 'fbsf-core' ),
                'new_item'      => __( 'New Programme', 'fbsf-core' ),
                'view_item'     => __( 'View Programme', 'fbsf-core' ),
                'search_items'  => __( 'Search Programmes', 'fbsf-core' ),
                'not_found'     => __( 'No programmes found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Programmes',
            'menu_icon'        => 'dashicons-graduation-cap',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => true,
            'rewrite'          => array( 'slug' => 'programme', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Journal
     * ------------------------------------------------------------------ */

    private static function register_journal() {
        register_post_type( 'fbsf_journal', array(
            'labels'            => array(
                'name'          => __( 'Research Journals', 'fbsf-core' ),
                'singular_name' => __( 'Journal', 'fbsf-core' ),
                'menu_name'     => __( 'Journals', 'fbsf-core' ),
                'add_new'       => __( 'Add Journal', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Journal', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Journal', 'fbsf-core' ),
                'new_item'      => __( 'New Journal', 'fbsf-core' ),
                'view_item'     => __( 'View Journal', 'fbsf-core' ),
                'search_items'  => __( 'Search Journals', 'fbsf-core' ),
                'not_found'     => __( 'No journals found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Journals',
            'menu_icon'        => 'dashicons-book-alt',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => true,
            'rewrite'          => array( 'slug' => 'journal', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Article
     * ------------------------------------------------------------------ */

    private static function register_article() {
        register_post_type( 'fbsf_article', array(
            'labels'            => array(
                'name'          => __( 'Research Articles', 'fbsf-core' ),
                'singular_name' => __( 'Article', 'fbsf-core' ),
                'menu_name'     => __( 'Articles', 'fbsf-core' ),
                'add_new'       => __( 'Add Article', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Article', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Article', 'fbsf-core' ),
                'new_item'      => __( 'New Article', 'fbsf-core' ),
                'view_item'     => __( 'View Article', 'fbsf-core' ),
                'search_items'  => __( 'Search Articles', 'fbsf-core' ),
                'not_found'     => __( 'No articles found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Articles',
            'menu_icon'        => 'dashicons-media-document',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => false,
            'rewrite'          => array( 'slug' => 'article', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Event
     * ------------------------------------------------------------------ */

    private static function register_event() {
        register_post_type( 'fbsf_event', array(
            'labels'            => array(
                'name'          => __( 'Events & Symposia', 'fbsf-core' ),
                'singular_name' => __( 'Event', 'fbsf-core' ),
                'menu_name'     => __( 'Events', 'fbsf-core' ),
                'add_new'       => __( 'Add Event', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Event', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Event', 'fbsf-core' ),
                'new_item'      => __( 'New Event', 'fbsf-core' ),
                'view_item'     => __( 'View Event', 'fbsf-core' ),
                'search_items'  => __( 'Search Events', 'fbsf-core' ),
                'not_found'     => __( 'No events found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Events',
            'menu_icon'        => 'dashicons-calendar-alt',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => true,
            'rewrite'          => array( 'slug' => 'event', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Staff
     * ------------------------------------------------------------------ */

    private static function register_staff() {
        register_post_type( 'fbsf_staff', array(
            'labels'            => array(
                'name'          => __( 'Staff Profiles', 'fbsf-core' ),
                'singular_name' => __( 'Staff Profile', 'fbsf-core' ),
                'menu_name'     => __( 'Staff', 'fbsf-core' ),
                'add_new'       => __( 'Add Staff Profile', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Staff Profile', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Staff Profile', 'fbsf-core' ),
                'new_item'      => __( 'New Staff Profile', 'fbsf-core' ),
                'view_item'     => __( 'View Staff Profile', 'fbsf-core' ),
                'search_items'  => __( 'Search Staff', 'fbsf-core' ),
                'not_found'     => __( 'No staff found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Staff',
            'menu_icon'        => 'dashicons-groups',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => false,
            'rewrite'          => array( 'slug' => 'staff', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Download
     * ------------------------------------------------------------------ */

    private static function register_download() {
        register_post_type( 'fbsf_download', array(
            'labels'            => array(
                'name'          => __( 'Downloads', 'fbsf-core' ),
                'singular_name' => __( 'Download', 'fbsf-core' ),
                'menu_name'     => __( 'Downloads', 'fbsf-core' ),
                'add_new'       => __( 'Add Download', 'fbsf-core' ),
                'add_new_item'  => __( 'Add Download', 'fbsf-core' ),
                'edit_item'     => __( 'Edit Download', 'fbsf-core' ),
                'new_item'      => __( 'New Download', 'fbsf-core' ),
                'view_item'     => __( 'View Download', 'fbsf-core' ),
                'search_items'  => __( 'Search Downloads', 'fbsf-core' ),
                'not_found'     => __( 'No downloads found', 'fbsf-core' ),
            ),
            'public'           => true,
            'has_archive'      => true,
            'archive_label'    => 'Downloads',
            'menu_icon'        => 'dashicons-download',
            'show_in_rest'     => true,
            'supports'         => array( 'title', 'editor', 'excerpt', 'page-attributes' ),
            'show_in_nav_menus' => false,
            'rewrite'          => array( 'slug' => 'download', 'with_front' => false ),
            'capability_type'  => 'post',
        ) );
    }

    /* ------------------------------------------------------------------
     * Meta boxes
     * ------------------------------------------------------------------ */

    /**
     * Register the structured meta boxes for every CPT.
     */
    public static function register_meta_boxes() {
        add_action( 'add_meta_boxes_fbsf_department', array( __CLASS__, 'department_meta_box' ) );
        add_action( 'add_meta_boxes_fbsf_programme', array( __CLASS__, 'programme_meta_box' ) );
        add_action( 'add_meta_boxes_fbsf_journal', array( __CLASS__, 'journal_meta_box' ) );
        add_action( 'add_meta_boxes_fbsf_article', array( __CLASS__, 'article_meta_box' ) );
        add_action( 'add_meta_boxes_fbsf_event', array( __CLASS__, 'event_meta_box' ) );
        add_action( 'add_meta_boxes_fbsf_staff', array( __CLASS__, 'staff_meta_box' ) );
        add_action( 'add_meta_boxes_fbsf_download', array( __CLASS__, 'download_meta_box' ) );
    }

    /**
     * Generic meta box renderer.
     *
     * @param array $fields Field definitions: [ ['key','label','type','placeholder','help'] ].
     */
    private static function render_meta_box( $post_id, $fields, $title = 'Content' ) {
        echo '<div class="fbsf-meta-box">';
        echo '<table class="form-table">';
        foreach ( $fields as $f ) {
            $key = esc_attr( $f['key'] );
            $val = get_post_meta( $post_id, $f['key'], true );
            $type = isset( $f['type'] ) ? $f['type'] : 'text';
            echo '<tr><th scope="row"><label>' . esc_html( $f['label'] ) . '</label></th><td>';
            if ( $type === 'textarea' ) {
                echo '<textarea id="fbsf_' . $key . '" name="fbsf_' . $key . '" rows="4" class="widefat">'
                    . esc_textarea( $val ) . '</textarea>';
            } else {
                echo '<input type="' . esc_attr( $type ) . '" id="fbsf_' . $key . '" name="fbsf_' . $key
                    . '" value="' . esc_attr( $val ) . '"'
                    . ( isset( $f['placeholder'] ) ? ' placeholder="' . esc_attr( $f['placeholder'] ) . '"' : '' ) . ' />';
            }
            if ( isset( $f['help'] ) && $f['help'] ) {
                echo '<p class="description">' . esc_html( $f['help'] ) . '</p>';
            }
            echo '</td></tr>';
        }
        echo '</table></div>';
    }

    /**
     * Generic repeater meta box renderer.
     *
     * Schema is passed as JSON in the data attribute; the bundled JS renders
     * the row editor and serialises rows into the hidden field.
     *
     * @param string $key   Hidden meta key.
     * @param array  $schema Repeater schema: [ ['key','label','type','placeholder'] ].
     * @param string $title Box title.
     */
    private static function render_repeater_box( $post_id, $key, $schema, $title ) {
        $key   = esc_attr( $key );
        $val   = get_post_meta( $post_id, $key, true );
        $rows  = is_string( $val ) ? json_decode( $val, true ) : array();
        if ( ! is_array( $rows ) ) {
            $rows = array();
        }
        $json  = wp_json_encode( $schema );
        $id    = 'fbsf-repeater-' . $key;
        echo '<div class="fbsf-repeater" id="' . esc_attr( $id ) . '" data-fbsf-repeater="' . esc_attr( $json ) . '">';
        echo '<input type="hidden" name="fbsf_' . $key . '" id="fbsf_' . $key . '_value" value="'
            . esc_attr( wp_json_encode( $rows ) ) . '" />';
        echo '<div class="fbsf-repeater-rows">';
        echo '<p class="description">Click "Add row" to create a new entry.</p>';
        echo '</div>';
        echo '<button type="button" class="button button-primary fbsf-repeater-add">Add row</button>';
        echo '</div>';
    }

    /**
     * Department meta box.
     */
    public static function department_meta_box() {
        add_meta_box(
            'fbsf_department_meta',
            __( 'Department Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_department_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'abbreviation', 'label' => 'Abbreviation (e.g. DoBF)', 'help' => 'Short department code.' ),
                    array( 'key' => 'tagline', 'label' => 'Tagline' ),
                    array( 'key' => 'intro', 'label' => 'Department introduction', 'type' => 'textarea' ),
                    array( 'key' => 'vision', 'label' => 'Vision', 'type' => 'textarea' ),
                    array( 'key' => 'mission', 'label' => 'Mission', 'type' => 'textarea' ),
                    array( 'key' => 'hod_name', 'label' => 'Head of Department name', 'help' => 'Leave empty if not documented.' ),
                    array( 'key' => 'hod_title', 'label' => 'Head of Department title' ),
                    array( 'key' => 'hod_message', 'label' => "Head of Department's message", 'type' => 'textarea' ),
                    array( 'key' => 'research', 'label' => 'Research activities', 'type' => 'textarea' ),
                    array( 'key' => 'contact', 'label' => 'Contact information', 'type' => 'textarea' ),
                ) );
                self::render_repeater_box(
                    $post->ID,
                    'partners',
                    array(
                        array( 'key' => 'name', 'label' => 'Partner / MoU name' ),
                        array( 'key' => 'detail', 'label' => 'Details' ),
                    ),
                    __( 'Professional Partnerships & MoUs', 'fbsf-core' )
                );
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'contact_email', 'label' => 'Contact email' ),
                    array( 'key' => 'contact_phone', 'label' => 'Contact phone' ),
                ), __( 'Department Contacts', 'fbsf-core' ) );
            },
            'fbsf_department',
            'normal',
            'high'
        );
    }

    /**
     * Programme meta box.
     */
    public static function programme_meta_box() {
        add_meta_box(
            'fbsf_programme_meta',
            __( 'Programme Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_programme_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'code', 'label' => 'Programme code (e.g. DAIS 1263)' ),
                    array( 'key' => 'category_term', 'label' => 'Category term slug', 'help' => 'Undergraduate / Postgraduate / Diploma / Higher Diploma / Advanced Certificate / External' ),
                    array( 'key' => 'department_term', 'label' => 'Department term slug', 'help' => 'Accountancy / Banking-finance / Business-management / Insurance-valuation' ),
                    array( 'key' => 'summary', 'label' => 'Short summary', 'type' => 'textarea' ),
                    array( 'key' => 'description', 'label' => 'Programme description', 'type' => 'textarea' ),
                    array( 'key' => 'duration', 'label' => 'Duration' ),
                    array( 'key' => 'credits', 'label' => 'Credit value' ),
                    array( 'key' => 'slqf_level', 'label' => 'SLQF level' ),
                    array( 'key' => 'fees', 'label' => 'Fees', 'help' => 'Only enter documented fees.' ),
                    array( 'key' => 'deadline', 'label' => 'Application deadline' ),
                    array( 'key' => 'deadline_status', 'label' => 'Deadline status', 'help' => 'historical or upcoming' ),
                    array( 'key' => 'application_contact', 'label' => 'Application contact' ),
                    array( 'key' => 'entry_requirements', 'label' => 'Entry requirements', 'type' => 'textarea' ),
                    array( 'key' => 'highlights', 'label' => 'Programme highlights', 'type' => 'textarea' ),
                    array( 'key' => 'documents_note', 'label' => 'Documents note', 'help' => 'Documents are requested via the faculty office; do not invent files.' ),
                ) );
                self::render_repeater_box(
                    $post->ID,
                    'entry_items',
                    array( array( 'key' => 'text', 'label' => 'Entry requirement' ) ),
                    __( 'Entry Requirements (repeater)', 'fbsf-core' )
                );
                self::render_repeater_box(
                    $post->ID,
                    'course_structure',
                    array(
                        array( 'key' => 'semester', 'label' => 'Semester / Year' ),
                        array( 'key' => 'code', 'label' => 'Course code' ),
                        array( 'key' => 'title', 'label' => 'Course title' ),
                        array( 'key' => 'credits', 'label' => 'Credits' ),
                    ),
                    __( 'Course Structure (repeater)', 'fbsf-core' )
                );
            },
            'fbsf_programme',
            'normal',
            'high'
        );
    }

    /**
     * Journal meta box.
     */
    public static function journal_meta_box() {
        add_meta_box(
            'fbsf_journal_meta',
            __( 'Journal Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_journal_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'abbreviation', 'label' => 'Abbreviation' ),
                    array( 'key' => 'type', 'label' => 'Journal type', 'help' => 'Refereed / Open-access / Double-blind peer-reviewed / Magazine' ),
                    array( 'key' => 'publisher', 'label' => 'Publisher' ),
                    array( 'key' => 'issn', 'label' => 'ISSN' ),
                    array( 'key' => 'frequency', 'label' => 'Publication frequency' ),
                    array( 'key' => 'description', 'label' => 'Journal overview / aims & scope', 'type' => 'textarea' ),
                    array( 'key' => 'submission', 'label' => 'Submission guidelines', 'type' => 'textarea' ),
                    array( 'key' => 'email', 'label' => 'Submission email' ),
                    array( 'key' => 'latest_issue', 'label' => 'Latest issue', 'help' => 'Only enter documented issues.' ),
                ) );
                self::render_repeater_box(
                    $post->ID,
                    'issues',
                    array(
                        array( 'key' => 'year', 'label' => 'Year / volume' ),
                        array( 'key' => 'detail', 'label' => 'Issue detail' ),
                    ),
                    __( 'Published Issues (repeater)', 'fbsf-core' )
                );
                self::render_repeater_box(
                    $post->ID,
                    'editorial_board',
                    array(
                        array( 'key' => 'role', 'label' => 'Role' ),
                        array( 'key' => 'name', 'label' => 'Name' ),
                    ),
                    __( 'Editorial Board (repeater)', 'fbsf-core' )
                );
            },
            'fbsf_journal',
            'normal',
            'high'
        );
    }

    /**
     * Article meta box.
     */
    public static function article_meta_box() {
        add_meta_box(
            'fbsf_article_meta',
            __( 'Article Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_article_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'journal_term', 'label' => 'Parent journal term slug', 'help' => 'Slug of the journal this article belongs to.' ),
                    array( 'key' => 'authors', 'label' => 'Authors' ),
                    array( 'key' => 'issue', 'label' => 'Issue / volume' ),
                    array( 'key' => 'description', 'label' => 'Article description', 'type' => 'textarea' ),
                ) );
            },
            'fbsf_article',
            'normal',
            'high'
        );
    }

    /**
     * Event meta box.
     */
    public static function event_meta_box() {
        add_meta_box(
            'fbsf_event_meta',
            __( 'Event Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_event_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'event_type', 'label' => 'Event type term slug', 'help' => 'Research Symposium / Conference / Programme Application / Journal Call' ),
                    array( 'key' => 'edition', 'label' => 'Edition / year' ),
                    array( 'key' => 'theme', 'label' => 'Theme' ),
                    array( 'key' => 'status', 'label' => 'Event status', 'help' => 'past, upcoming or archived' ),
                    array( 'key' => 'organizer', 'label' => 'Organiser' ),
                    array( 'key' => 'keynote_name', 'label' => 'Keynote speaker name' ),
                    array( 'key' => 'keynote_details', 'label' => 'Keynote details', 'type' => 'textarea' ),
                    array( 'key' => 'description', 'label' => 'Event description', 'type' => 'textarea' ),
                    array( 'key' => 'submission', 'label' => 'Submission information', 'type' => 'textarea' ),
                    array( 'key' => 'contact', 'label' => 'Contact' ),
                ) );
                self::render_repeater_box(
                    $post->ID,
                    'tracks',
                    array( array( 'key' => 'title', 'label' => 'Track title' ) ),
                    __( 'Tracks (repeater)', 'fbsf-core' )
                );
                self::render_repeater_box(
                    $post->ID,
                    'dates',
                    array(
                        array( 'key' => 'label', 'label' => 'Label (e.g. Submission deadline)' ),
                        array( 'key' => 'date', 'label' => 'Date' ),
                    ),
                    __( 'Key Dates (repeater)', 'fbsf-core' )
                );
                self::render_repeater_box(
                    $post->ID,
                    'committee',
                    array(
                        array( 'key' => 'role', 'label' => 'Role' ),
                        array( 'key' => 'name', 'label' => 'Name' ),
                    ),
                    __( 'Committee (repeater)', 'fbsf-core' )
                );
                self::render_repeater_box(
                    $post->ID,
                    'downloads',
                    array(
                        array( 'key' => 'title', 'label' => 'Item title' ),
                        array( 'key' => 'note', 'label' => 'Note (e.g. request via email)' ),
                    ),
                    __( 'Materials & Downloads (repeater)', 'fbsf-core' )
                );
            },
            'fbsf_event',
            'normal',
            'high'
        );
    }

    /**
     * Staff meta box.
     */
    public static function staff_meta_box() {
        add_meta_box(
            'fbsf_staff_meta',
            __( 'Staff Profile Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_staff_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'title_role', 'label' => 'Position / title' ),
                    array( 'key' => 'department_term', 'label' => 'Department term slug' ),
                    array( 'key' => 'qualifications', 'label' => 'Qualifications', 'type' => 'textarea' ),
                    array( 'key' => 'roles', 'label' => 'Roles & responsibilities', 'type' => 'textarea' ),
                    array( 'key' => 'bio', 'label' => 'Biography', 'type' => 'textarea' ),
                    array( 'key' => 'email', 'label' => 'Email' ),
                ) );
            },
            'fbsf_staff',
            'normal',
            'high'
        );
    }

    /**
     * Download meta box.
     */
    public static function download_meta_box() {
        add_meta_box(
            'fbsf_download_meta',
            __( 'Download Details', 'fbsf-core' ),
            function ( $post ) {
                echo '<input type="hidden" name="fbsf_nonce" value="' . wp_create_nonce( 'fbsf_download_meta' ) . '" />';
                self::render_meta_box( $post->ID, array(
                    array( 'key' => 'file', 'label' => 'File name (for request notice)', 'help' => 'No file is stored on the server; the notice emails the faculty office.' ),
                    array( 'key' => 'category', 'label' => 'Category term slug', 'help' => 'Application / Symposium / Publication / QA / Other' ),
                    array( 'key' => 'description', 'label' => 'Description', 'type' => 'textarea' ),
                ) );
            },
            'fbsf_download',
            'normal',
            'high'
        );
    }

    /**
     * Save meta boxes for all CPTs (nonce + sanitisation).
     */
    public static function save_meta_boxes( $post_id ) {
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        $nonce_key = 'fbsf_nonce';
        if ( ! isset( $_POST[ $nonce_key ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ $nonce_key ] ) ), $post->post_type . '_meta' ) ) {
            return;
        }

        $fields = array(
            'fbsf_department' => array(
                'abbreviation', 'tagline', 'intro', 'vision', 'mission', 'hod_name', 'hod_title',
                'hod_message', 'research', 'contact', 'contact_email', 'contact_phone',
            ),
            'fbsf_programme' => array(
                'code', 'category_term', 'department_term', 'summary', 'description', 'duration',
                'credits', 'slqf_level', 'fees', 'deadline', 'deadline_status', 'application_contact',
                'entry_requirements', 'highlights', 'documents_note',
            ),
            'fbsf_journal' => array(
                'abbreviation', 'type', 'publisher', 'issn', 'frequency', 'description',
                'submission', 'email', 'latest_issue',
            ),
            'fbsf_article' => array(
                'journal_term', 'authors', 'issue', 'description',
            ),
            'fbsf_event' => array(
                'event_type', 'edition', 'theme', 'status', 'organizer', 'keynote_name',
                'keynote_details', 'description', 'submission', 'contact',
            ),
            'fbsf_staff' => array(
                'title_role', 'department_term', 'qualifications', 'roles', 'bio', 'email',
            ),
            'fbsf_download' => array(
                'file', 'category', 'description',
            ),
        );

        $allowed = $fields[ $post->post_type ] ?? array();
        foreach ( $allowed as $field ) {
            if ( isset( $_POST[ 'fbsf_' . $field ] ) ) {
                $value = is_array( $_POST[ 'fbsf_' . $field ] )
                    ? array_map( 'sanitize_text_field', $_POST[ 'fbsf_' . $field ] )
                    : sanitize_textarea_field( wp_unslash( $_POST[ 'fbsf_' . $field ] ) );
                update_post_meta( $post_id, $field, $value );
            }
        }

        // Repeater fields (JSON strings).
        $repeaters = array(
            'fbsf_programme' => array( 'entry_items', 'course_structure' ),
            'fbsf_journal'   => array( 'issues', 'editorial_board' ),
            'fbsf_event'     => array( 'tracks', 'dates', 'committee', 'downloads' ),
            'fbsf_department' => array( 'partners' ),
        );
        if ( isset( $repeaters[ $post->post_type ] ) ) {
            foreach ( $repeaters[ $post->post_type ] as $rkey ) {
                if ( isset( $_POST[ 'fbsf_' . $rkey ] ) ) {
                    $rows = json_decode( sanitize_textarea_field( wp_unslash( $_POST[ 'fbsf_' . $rkey ] ) ), true );
                    if ( is_array( $rows ) ) {
                        update_post_meta( $post_id, $rkey, $rows );
                    }
                }
            }
        }
    }
}

// Hook meta boxes (registered on add_meta_boxes action for CPTs).
add_action( 'add_meta_boxes', array( 'FBSF_Post_Types', 'register_meta_boxes' ) );
add_action( 'save_post', array( 'FBSF_Post_Types', 'save_meta_boxes' ) );
