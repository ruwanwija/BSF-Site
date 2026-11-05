<?php
/**
 * Elementor widgets for the FBSF website.
 *
 * Registered only when Elementor is active. Each widget wraps the shortcode
 * rendering logic so administrators can drop dynamic content into pages
 * from the Elementor editor without code.
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Elementor widget registration.
 */
class FBSF_Widgets {

    /**
     * Register widgets (Elementor active only).
     */
    public static function register() {
        if ( ! defined( 'ELEMENTOR_VERSION' ) ) {
            return;
        }
        add_action( 'elementor/widgets/register', array( __CLASS__, 'register_widgets' ) );
    }

    /**
     * Register all FBSF widgets (single file with all classes).
     */
    public static function register_widgets() {
        require_once FBSF_CORE_PATH . 'includes/widgets.php';
        $classes = array(
            'FBSF_Widget_Programme_Filter',
            'FBSF_Widget_Journal_Tabs',
            'FBSF_Widget_Article_Search',
            'FBSF_Widget_Events',
            'FBSF_Widget_Announcements',
            'FBSF_Widget_Department_Cards',
            'FBSF_Widget_Programme_Cards',
            'FBSF_Widget_Journal_Cards',
            'FBSF_Widget_Contact_Cards',
            'FBSF_Widget_Faq',
            'FBSF_Widget_Downloads',
            'FBSF_Widget_Stat_Band',
            'FBSF_Widget_Quick_Links',
            'FBSF_Widget_Site_Content',
            'FBSF_Widget_Search_Results',
        );
        $category = array(
            'title' => __( 'FBSF Content', 'fbsf-core' ),
            'icon'  => 'eicon-star',
        );
        foreach ( $classes as $class ) {
            if ( class_exists( $class ) ) {
                \Elementor\Plugin::instance()->widgets_manager->register_widget_type( new $class() );
            }
        }
    }
}
