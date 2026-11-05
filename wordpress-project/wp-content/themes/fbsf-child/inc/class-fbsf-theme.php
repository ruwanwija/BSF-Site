<?php
/**
 * FBSF Child theme helper.
 *
 * Small utilities: page titles, meta descriptions, body classes and the
 * front-page Elementor compatibility tweaks.
 *
 * @package FBSF_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme helpers.
 */
class FBSF_Theme {

    /**
     * Add the FBSF body class.
     */
    public static function body_classes( $classes ) {
        $classes[] = 'fbsf-site';
        return $classes;
    }

    /**
     * Page meta description (fallback).
     */
    public static function meta_description() {
        if ( is_front_page() ) {
            return 'Faculty of Business Studies and Finance — Wayamba University of Sri Lanka. Academic programmes, research journals, symposia and student resources.';
        }
        if ( is_page() ) {
            return wp_kses_post( wp_strip_all_tags( get_the_title() ) ) . ' — Faculty of Business Studies and Finance, Wayamba University of Sri Lanka.';
        }
        return 'Faculty of Business Studies and Finance — Wayamba University of Sri Lanka.';
    }

    /**
     * Register.
     */
    public static function init() {
        add_filter( 'body_class', array( __CLASS__, 'body_classes' ) );
        add_filter( 'wp_title', array( __CLASS__, 'document_title' ) );
        add_action( 'wp_head', array( __CLASS__, 'meta_description' ) );
    }

    /**
     * Document title.
     */
    public static function document_title( $title ) {
        if ( is_front_page() ) {
            return $title . ' — FBSF';
        }
        return $title . ' — Faculty of Business Studies and Finance';
    }
}

FBSF_Theme::init();
