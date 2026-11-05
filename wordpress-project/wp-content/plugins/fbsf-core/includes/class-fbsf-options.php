<?php
/**
 * Global site options for the FBSF website.
 *
 * Stores frequently updated site-wide content (vision, mission, dean's
 * message, history timeline, contact groups, FAQs, quick links, stats) in a
 * single option, editable from Settings → FBSF Options. Page templates pull
 * these values through shortcodes instead of hardcoding content.
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Options registration and rendering.
 */
class FBSF_Options {

    const OPTION_NAME = 'fbsf_options';

    /**
     * Default values (verified faculty content; nothing invented).
     */
    public static function defaults() {
        return array(
            'site_name'        => 'Faculty of Business Studies and Finance',
            'site_short'       => 'FBSF',
            'site_motto'       => 'Building Tomorrow’s Business & Finance Leaders',
            'university'       => 'Wayamba University of Sri Lanka',
            'established'      => '1999',
            'address'          => 'Madampitiya Road, Kurunegala, Sri Lanka',
            'tel'              => '+94 37 228 4215',
            'email'            => 'bsfoffice@wyb.ac.lk',
            'dean_name'        => 'Professor S. K. Gamage',
            'dean_title'       => 'Dean',
            'dean_message'     => '',
            'vision'           => '',
            'mission'          => '',
            'history_intro'    => '',
            'history_timeline' => array(),
            'stats'            => array(),
            'quick_links'      => array(),
            'contact_groups'   => array(),
            'faqs'             => array(),
            'research_areas'   => array(),
            'office_hours'     => '',
            'fqac_structure'   => '',
            'fqac_functions'   => '',
            'fqac_committees'  => array(),
        );
    }

    /**
     * Register the Settings submenu page and save handler.
     */
    public static function register() {
        add_action( 'admin_menu', array( __CLASS__, 'add_menu' ) );
        add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
    }

    /**
     * Add Settings submenu.
     */
    public static function add_menu() {
        add_options_page(
            __( 'FBSF Options', 'fbsf-core' ),
            __( 'FBSF Options', 'fbsf-core' ),
            'manage_options',
            'fbsf-options',
            array( __CLASS__, 'render_page' )
        );
    }

    /**
     * Register settings + save handler.
     */
    public static function register_settings() {
        register_setting(
            'fbsf_options_group',
            self::OPTION_NAME,
            array(
                'type'              => 'array',
                'sanitize_callback' => array( __CLASS__, 'sanitize' ),
            )
        );
    }

    /**
     * Sanitise the options array.
     */
    public static function sanitize( $input ) {
        $defaults = self::defaults();
        $clean = array();

        $text_keys = array(
            'site_name', 'site_short', 'site_motto', 'university', 'established',
            'address', 'tel', 'email', 'dean_name', 'dean_title', 'dean_message',
            'vision', 'mission', 'history_intro', 'office_hours',
            'fqac_structure', 'fqac_functions',
        );
        foreach ( $text_keys as $k ) {
            if ( isset( $input[ $k ] ) ) {
                $clean[ $k ] = sanitize_textarea_field( wp_unslash( $input[ $k ] ) );
            }
        }

        $repeater_keys = array(
            'history_timeline', 'stats', 'quick_links', 'contact_groups',
            'faqs', 'research_areas', 'fqac_committees',
        );
        foreach ( $repeater_keys as $k ) {
            if ( isset( $input[ $k ] ) && is_array( $input[ $k ] ) ) {
                $rows = array();
                foreach ( $input[ $k ] as $row ) {
                    if ( is_array( $row ) ) {
                        $clean_row = array();
                        foreach ( $row as $field => $value ) {
                            $clean_row[ $field ] = sanitize_textarea_field( wp_unslash( $value ) );
                        }
                        $rows[] = $clean_row;
                    }
                }
                $clean[ $k ] = $rows;
            }
        }

        return array_merge( $defaults, $clean );
    }

    /**
     * Enqueue admin assets for the options page (repeater UI).
     */
    public static function enqueue_admin_assets() {
        global $pagenow;
        if ( 'options.php' !== $pagenow ) {
            return;
        }
        wp_enqueue_style(
            'fbsf-admin',
            FBSF_CORE_URL . 'assets/css/fbsf-admin.css',
            array(),
            FBSF_CORE_VERSION
        );
        wp_enqueue_script(
            'fbsf-repeater',
            FBSF_CORE_URL . 'assets/js/fbsf-repeater.js',
            array( 'jquery' ),
            FBSF_CORE_VERSION,
            true
        );
    }

    /**
     * Get options merged with defaults.
     */
    public static function get( $key = null ) {
        $options = get_option( self::OPTION_NAME, self::defaults() );
        if ( ! is_array( $options ) ) {
            $options = self::defaults();
        }
        $options = array_merge( self::defaults(), $options );
        if ( null !== $key ) {
            return $options[ $key ] ?? '';
        }
        return $options;
    }

    /**
     * Render the Settings page.
     */
    public static function render_page() {
        $options = self::get();
        $repeaters = array(
            'history_timeline' => array(
                'title'  => 'History & Establishment — Timeline Events',
                'schema' => array(
                    array( 'key' => 'date', 'label' => 'Date / year' ),
                    array( 'key' => 'title', 'label' => 'Event title' ),
                    array( 'key' => 'text', 'label' => 'Event description' ),
                ),
            ),
            'stats' => array(
                'title'  => 'Homepage Statistics',
                'schema' => array(
                    array( 'key' => 'value', 'label' => 'Value' ),
                    array( 'key' => 'label', 'label' => 'Label' ),
                ),
            ),
            'quick_links' => array(
                'title'  => 'Quick Links',
                'schema' => array(
                    array( 'key' => 'title', 'label' => 'Title' ),
                    array( 'key' => 'url', 'label' => 'URL' ),
                    array( 'key' => 'icon', 'label' => 'Icon (e.g. book, users)' ),
                ),
            ),
            'contact_groups' => array(
                'title'  => 'Contact Groups',
                'schema' => array(
                    array( 'key' => 'group', 'label' => 'Group name' ),
                    array( 'key' => 'contact', 'label' => 'Contact person' ),
                    array( 'key' => 'email', 'label' => 'Email' ),
                    array( 'key' => 'phone', 'label' => 'Phone' ),
                ),
            ),
            'faqs' => array(
                'title'  => 'Frequently Asked Questions',
                'schema' => array(
                    array( 'key' => 'question', 'label' => 'Question' ),
                    array( 'key' => 'answer', 'label' => 'Answer' ),
                ),
            ),
            'research_areas' => array(
                'title'  => 'Research Areas',
                'schema' => array(
                    array( 'key' => 'name', 'label' => 'Area name' ),
                ),
            ),
            'fqac_committees' => array(
                'title'  => 'Faculty Committees',
                'schema' => array(
                    array( 'key' => 'title', 'label' => 'Committee name' ),
                    array( 'key' => 'text', 'label' => 'Description' ),
                ),
            ),
        );
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_option( 'blogname' ) ); ?> — FBSF Options</h1>
            <p class="description"><?php esc_html_e( 'Edit site-wide content. Repeater rows are saved as structured data used by page templates.', 'fbsf-core' ); ?></p>
            <form method="post" action="options.php">
                <?php settings_fields( 'fbsf_options_group' ); ?>
                <h2>General</h2>
                <table class="form-table">
                    <tr><th scope="row"><label for="fbsf_site_name">Site name</label></th><td><input type="text" class="regular-text" id="fbsf_site_name" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[site_name]" value="<?php echo esc_attr( $options['site_name'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_site_short">Short name</label></th><td><input type="text" id="fbsf_site_short" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[site_short]" value="<?php echo esc_attr( $options['site_short'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_site_motto">Motto</label></th><td><input type="text" class="regular-text" id="fbsf_site_motto" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[site_motto]" value="<?php echo esc_attr( $options['site_motto'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_university">University</label></th><td><input type="text" class="regular-text" id="fbsf_university" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[university]" value="<?php echo esc_attr( $options['university'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_established">Established</label></th><td><input type="text" id="fbsf_established" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[established]" value="<?php echo esc_attr( $options['established'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_address">Address</label></th><td><input type="text" class="regular-text" id="fbsf_address" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[address]" value="<?php echo esc_attr( $options['address'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_tel">Telephone</label></th><td><input type="text" id="fbsf_tel" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[tel]" value="<?php echo esc_attr( $options['tel'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_email">Email</label></th><td><input type="text" class="regular-text" id="fbsf_email" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[email]" value="<?php echo esc_attr( $options['email'] ); ?>" /></td></tr>
                </table>

                <h2>Vision, Mission & Dean's Message</h2>
                <table class="form-table">
                    <tr><th scope="row"><label for="fbsf_vision">Vision</label></th><td><textarea rows="3" class="widefat" id="fbsf_vision" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[vision]"><?php echo esc_textarea( $options['vision'] ); ?></textarea></td></tr>
                    <tr><th scope="row"><label for="fbsf_mission">Mission</label></th><td><textarea rows="3" class="widefat" id="fbsf_mission" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[mission]"><?php echo esc_textarea( $options['mission'] ); ?></textarea></td></tr>
                    <tr><th scope="row"><label for="fbsf_dean_name">Dean name</label></th><td><input type="text" id="fbsf_dean_name" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[dean_name]" value="<?php echo esc_attr( $options['dean_name'] ); ?>" /></td></tr>
                    <tr><th scope="row"><label for="fbsf_dean_message">Dean's message</label></th><td><textarea rows="5" class="widefat" id="fbsf_dean_message" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[dean_message]"><?php echo esc_textarea( $options['dean_message'] ); ?></textarea></td></tr>
                </table>

                <h2>History</h2>
                <table class="form-table">
                    <tr><th scope="row"><label for="fbsf_history_intro">History introduction</label></th><td><textarea rows="3" class="widefat" id="fbsf_history_intro" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[history_intro]"><?php echo esc_textarea( $options['history_intro'] ); ?></textarea></td></tr>
                </table>
                <?php self::render_repeaters( $repeaters, $options ); ?>

                <h2>Office Hours & FQAC</h2>
                <table class="form-table">
                    <tr><th scope="row"><label for="fbsf_office_hours">Office hours</label></th><td><textarea rows="3" class="widefat" id="fbsf_office_hours" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[office_hours]"><?php echo esc_textarea( $options['office_hours'] ); ?></textarea></td></tr>
                    <tr><th scope="row"><label for="fbsf_fqac_structure">FQAC structure</label></th><td><textarea rows="3" class="widefat" id="fbsf_fqac_structure" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[fqac_structure]"><?php echo esc_textarea( $options['fqac_structure'] ); ?></textarea></td></tr>
                    <tr><th scope="row"><label for="fbsf_fqac_functions">FQAC functions</label></th><td><textarea rows="3" class="widefat" id="fbsf_fqac_functions" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[fqac_functions]"><?php echo esc_textarea( $options['fqac_functions'] ); ?></textarea></td></tr>
                </table>

                <p class="submit">
                    <button type="submit" class="button button-primary"><?php esc_html_e( 'Save Changes', 'fbsf-core' ); ?></button>
                </p>
            </form>
        </div>
        <?php
    }

    /**
     * Render repeater editors for the options page.
     */
    private static function render_repeaters( $repeaters, $options ) {
        foreach ( $repeaters as $key => $config ) {
            $rows = isset( $options[ $key ] ) && is_array( $options[ $key ] ) ? $options[ $key ] : array();
            $json = wp_json_encode( $config['schema'] );
            ?>
            <table class="form-table">
                <tr><th scope="row"><label><?php echo esc_html( $config['title'] ); ?></label></th><td>
                    <div class="fbsf-repeater" id="fbsf-opt-<?php echo esc_attr( $key ); ?>" data-fbsf-repeater="<?php echo esc_attr( $json ); ?>">
                        <input type="hidden" name="<?php echo esc_attr( self::OPTION_NAME ); ?>[<?php echo esc_attr( $key ); ?>]" id="fbsf_opt_<?php echo esc_attr( $key ); ?>_value" value="<?php echo esc_attr( wp_json_encode( $rows ) ); ?>" />
                        <div class="fbsf-repeater-rows"></div>
                        <button type="button" class="button button-primary fbsf-repeater-add"><?php esc_html_e( 'Add row', 'fbsf-core' ); ?></button>
                    </div>
                </td></tr>
            </table>
            <?php
        }
    }
}
