<?php
/**
 * Custom Taxonomies for the FBSF website.
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Taxonomy registration.
 */
class FBSF_Taxonomies {

    /**
     * Register all custom taxonomies.
     */
    public static function register() {
        self::register_programme_category();
        self::register_department();
        self::register_journal_type();
        self::register_event_type();
        self::register_publication_type();
    }

    /**
     * Programme category: Undergraduate / Postgraduate / Diploma /
     * Higher Diploma / Advanced Certificate / External.
     */
    private static function register_programme_category() {
        register_taxonomy(
            'fbsf_programme_category',
            array( 'fbsf_programme' ),
            array(
                'labels'            => array(
                    'name'          => __( 'Programme Categories', 'fbsf-core' ),
                    'singular_name' => __( 'Category', 'fbsf-core' ),
                    'menu_name'     => __( 'Categories', 'fbsf-core' ),
                    'search_items'  => __( 'Search categories', 'fbsf-core' ),
                    'all_items'     => __( 'All categories', 'fbsf-core' ),
                    'edit_item'     => __( 'Edit category', 'fbsf-core' ),
                    'update_item'   => __( 'Update category', 'fbsf-core' ),
                    'add_new_item'  => __( 'Add new category', 'fbsf-core' ),
                    'new_item_name' => __( 'New category name', 'fbsf-core' ),
                ),
                'hierarchical'      => false,
                'public'            => true,
                'show_in_nav_menus' => true,
                'show_in_rest'      => true,
                'rewrite'           => array( 'slug' => 'programme-category', 'with_front' => false ),
            )
        );
    }

    /**
     * Department taxonomy (shared by programmes and staff).
     */
    private static function register_department() {
        register_taxonomy(
            'fbsf_department',
            array( 'fbsf_programme', 'fbsf_staff' ),
            array(
                'labels'            => array(
                    'name'          => __( 'Departments', 'fbsf-core' ),
                    'singular_name' => __( 'Department', 'fbsf-core' ),
                    'menu_name'     => __( 'Departments', 'fbsf-core' ),
                    'search_items'  => __( 'Search departments', 'fbsf-core' ),
                    'all_items'     => __( 'All departments', 'fbsf-core' ),
                    'edit_item'     => __( 'Edit department', 'fbsf-core' ),
                    'update_item'   => __( 'Update department', 'fbsf-core' ),
                    'add_new_item'  => __( 'Add new department', 'fbsf-core' ),
                    'new_item_name' => __( 'New department name', 'fbsf-core' ),
                ),
                'hierarchical'      => false,
                'public'            => true,
                'show_in_nav_menus' => true,
                'show_in_rest'      => true,
                'rewrite'           => array( 'slug' => 'department', 'with_front' => false ),
            )
        );
    }

    /**
     * Journal type taxonomy.
     */
    private static function register_journal_type() {
        register_taxonomy(
            'fbsf_journal_type',
            array( 'fbsf_journal' ),
            array(
                'labels'            => array(
                    'name'          => __( 'Journal Types', 'fbsf-core' ),
                    'singular_name' => __( 'Journal type', 'fbsf-core' ),
                    'menu_name'     => __( 'Types', 'fbsf-core' ),
                    'search_items'  => __( 'Search types', 'fbsf-core' ),
                    'all_items'     => __( 'All types', 'fbsf-core' ),
                    'edit_item'     => __( 'Edit type', 'fbsf-core' ),
                    'update_item'   => __( 'Update type', 'fbsf-core' ),
                    'add_new_item'  => __( 'Add new type', 'fbsf-core' ),
                    'new_item_name' => __( 'New type name', 'fbsf-core' ),
                ),
                'hierarchical'      => false,
                'public'            => true,
                'show_in_nav_menus' => false,
                'show_in_rest'      => true,
                'rewrite'           => array( 'slug' => 'journal-type', 'with_front' => false ),
            )
        );
    }

    /**
     * Event type taxonomy.
     */
    private static function register_event_type() {
        register_taxonomy(
            'fbsf_event_type',
            array( 'fbsf_event' ),
            array(
                'labels'            => array(
                    'name'          => __( 'Event Types', 'fbsf-core' ),
                    'singular_name' => __( 'Event type', 'fbsf-core' ),
                    'menu_name'     => __( 'Types', 'fbsf-core' ),
                    'search_items'  => __( 'Search types', 'fbsf-core' ),
                    'all_items'     => __( 'All types', 'fbsf-core' ),
                    'edit_item'     => __( 'Edit type', 'fbsf-core' ),
                    'update_item'   => __( 'Update type', 'fbsf-core' ),
                    'add_new_item'  => __( 'Add new type', 'fbsf-core' ),
                    'new_item_name' => __( 'New type name', 'fbsf-core' ),
                ),
                'hierarchical'      => false,
                'public'            => true,
                'show_in_nav_menus' => false,
                'show_in_rest'      => true,
                'rewrite'           => array( 'slug' => 'event-type', 'with_front' => false ),
            )
        );
    }

    /**
     * Publication type taxonomy (journal / magazine / proceedings).
     */
    private static function register_publication_type() {
        register_taxonomy(
            'fbsf_publication_type',
            array( 'fbsf_journal', 'fbsf_download' ),
            array(
                'labels'            => array(
                    'name'          => __( 'Publication Types', 'fbsf-core' ),
                    'singular_name' => __( 'Publication type', 'fbsf-core' ),
                    'menu_name'     => __( 'Types', 'fbsf-core' ),
                    'search_items'  => __( 'Search types', 'fbsf-core' ),
                    'all_items'     => __( 'All types', 'fbsf-core' ),
                    'edit_item'     => __( 'Edit type', 'fbsf-core' ),
                    'update_item'   => __( 'Update type', 'fbsf-core' ),
                    'add_new_item'  => __( 'Add new type', 'fbsf-core' ),
                    'new_item_name' => __( 'New type name', 'fbsf-core' ),
                ),
                'hierarchical'      => false,
                'public'            => true,
                'show_in_nav_menus' => false,
                'show_in_rest'      => true,
                'rewrite'           => array( 'slug' => 'publication-type', 'with_front' => false ),
            )
        );
    }
}
