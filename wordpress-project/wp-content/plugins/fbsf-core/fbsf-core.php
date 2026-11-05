<?php
/**
 * Plugin Name: FBSF Core
 * Plugin URI: https://wyb.ac.lk
 * Description: Custom post types, taxonomies, shortcodes, Elementor widgets and content importer for the Faculty of Business Studies and Finance website.
 * Version: 1.0.0
 * Author: FBSF Web Team
 * Author URI: https://wyb.ac.lk
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // No direct access.
}

define( 'FBSF_CORE_VERSION', '1.0.0' );
define( 'FBSF_CORE_FILE', __FILE__ );
define( 'FBSF_CORE_PATH', plugin_dir_path( __FILE__ ) );
define( 'FBSF_CORE_URL', plugin_dir_url( __FILE__ ) );

require_once FBSF_CORE_PATH . 'includes/class-fbsf-post-types.php';
require_once FBSF_CORE_PATH . 'includes/class-fbsf-taxonomies.php';
require_once FBSF_CORE_PATH . 'includes/class-fbsf-options.php';
require_once FBSF_CORE_PATH . 'includes/class-fbsf-shortcodes.php';
require_once FBSF_CORE_PATH . 'includes/class-fbsf-widgets.php';
require_once FBSF_CORE_PATH . 'includes/class-fbsf-importer.php';

/**
 * Activation hook: register post types/taxonomies and flush rewrite rules.
 */
function fbsf_core_activate() {
    FBSF_Post_Types::register();
    FBSF_Taxonomies::register();
    flush_rewrite_rules();
}
register_activation_hook( FBSF_CORE_FILE, 'fbsf_core_activate' );

/**
 * Initialise on init so CPTs/taxonomies are registered for permalinks.
 */
function fbsf_core_init() {
    FBSF_Post_Types::register();
    FBSF_Taxonomies::register();
}
add_action( 'init', 'fbsf_core_init' );

/**
 * Load everything that needs WordPress fully loaded.
 */
function fbsf_core_load() {
    FBSF_Options::register();
    FBSF_Shortcodes::register();
    FBSF_Widgets::register();
    FBSF_Importer::register();
    FBSF_Options::enqueue_admin_assets();
}
add_action( 'plugins_loaded', 'fbsf_core_load' );
