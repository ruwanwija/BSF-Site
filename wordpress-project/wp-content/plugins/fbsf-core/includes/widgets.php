<?php
/**
 * Elementor widget implementations for the FBSF website.
 *
 * Each widget wraps the shortcode rendering logic so administrators can drop
 * dynamic content into pages from the Elementor editor without code.
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'Elementor\Widget_Base' ) ) {
    return;
}

/**
 * Base class for FBSF widgets (shared category + prefix).
 */
abstract class FBSF_Widget_Base extends \Elementor\Widget_Base {

    /**
     * Widget name (lowercase hyphenated).
     */
    abstract public function get_name();

    /**
     * Widget title.
     */
    abstract public function get_title();

    /**
     * Widget icon.
     */
    public function get_icon() {
        return 'eicon-posts';
    }

    /**
     * Widget categories.
     */
    public function get_categories() {
        return array( 'FBSF Content' );
    }

    /**
     * Prefix for settings keys.
     */
    protected function prefix() {
        return 'fbsf_' . $this->get_name();
    }

    /**
     * Read a setting.
     */
    protected function setting( $key, $default = '' ) {
        $value = $this->get_settings( $this->prefix() . '_' . $key );
        return ( '' === $value || null === $value ) ? $default : $value;
    }
}

/**
 * Programme filter + cards.
 */
class FBSF_Widget_Programme_Filter extends FBSF_Widget_Base {

    public function get_name() {
        return 'programme-filter';
    }

    public function get_title() {
        return __( 'FBSF — Programme Filter', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-filter';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Programme Filter', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_columns', array(
            'label'   => __( 'Cards per row', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::SELECT,
            'options' => array(
                '1' => '1', '2' => '2', '3' => '3', '4' => '4', '5' => '5',
            ),
            'default' => '3',
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        echo FBSF_Shortcodes::programme_filter( array(
            'columns' => $this->setting( 'columns', '3' ),
        ) );
    }
}

/**
 * Journal tabs.
 */
class FBSF_Widget_Journal_Tabs extends FBSF_Widget_Base {

    public function get_name() {
        return 'journal-tabs';
    }

    public function get_title() {
        return __( 'FBSF — Journal Tabs', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-tabs';
    }

    protected function render() {
        echo FBSF_Shortcodes::journal_tabs( array() );
    }
}

/**
 * Article search.
 */
class FBSF_Widget_Article_Search extends FBSF_Widget_Base {

    public function get_name() {
        return 'article-search';
    }

    public function get_title() {
        return __( 'FBSF — Article Search', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-search';
    }

    protected function render() {
        echo FBSF_Shortcodes::article_search( array() );
    }
}

/**
 * Event cards.
 */
class FBSF_Widget_Events extends FBSF_Widget_Base {

    public function get_name() {
        return 'events';
    }

    public function get_title() {
        return __( 'FBSF — Events', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-calendar';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Events', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_type', array(
            'label'   => __( 'Event type', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::SELECT,
            'options' => array(
                'all'                 => __( 'All', 'fbsf-core' ),
                'research-symposium'  => __( 'Research Symposium', 'fbsf-core' ),
                'conference'          => __( 'Conference', 'fbsf-core' ),
                'programme-application' => __( 'Programme Application', 'fbsf-core' ),
            ),
            'default' => 'all',
        ) );
        $this->add_control( $this->prefix() . '_limit', array(
            'label'   => __( 'Limit', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::NUMBER,
            'default' => 20,
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        echo FBSF_Shortcodes::events( array(
            'type'  => $this->setting( 'type', 'all' ),
            'limit' => absint( $this->setting( 'limit', 20 ) ),
        ) );
    }
}

/**
 * Announcement cards.
 */
class FBSF_Widget_Announcements extends FBSF_Widget_Base {

    public function get_name() {
        return 'announcements';
    }

    public function get_title() {
        return __( 'FBSF — Announcements', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-info';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Announcements', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_limit', array(
            'label'   => __( 'Limit', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::NUMBER,
            'default' => 10,
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        echo FBSF_Shortcodes::announcements( array(
            'limit' => absint( $this->setting( 'limit', 10 ) ),
        ) );
    }
}

/**
 * Department cards.
 */
class FBSF_Widget_Department_Cards extends FBSF_Widget_Base {

    public function get_name() {
        return 'department-cards';
    }

    public function get_title() {
        return __( 'FBSF — Department Cards', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-building';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Departments', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_limit', array(
            'label'   => __( 'Limit', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::NUMBER,
            'default' => 4,
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        echo FBSF_Shortcodes::department_cards( array(
            'limit' => absint( $this->setting( 'limit', 4 ) ),
        ) );
    }
}

/**
 * Programme cards (no filter bar).
 */
class FBSF_Widget_Programme_Cards extends FBSF_Widget_Base {

    public function get_name() {
        return 'programme-cards';
    }

    public function get_title() {
        return __( 'FBSF — Programme Cards', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-graduation';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Programme Cards', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_category', array(
            'label'   => __( 'Category', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::SELECT,
            'options' => array(
                'all' => __( 'All', 'fbsf-core' ),
                'undergraduate'      => __( 'Undergraduate', 'fbsf-core' ),
                'postgraduate'       => __( 'Postgraduate', 'fbsf-core' ),
                'diploma'             => __( 'Diploma', 'fbsf-core' ),
                'higher-diploma'      => __( 'Higher Diploma', 'fbsf-core' ),
                'advanced-certificate' => __( 'Advanced Certificate', 'fbsf-core' ),
                'external'            => __( 'External', 'fbsf-core' ),
            ),
            'default' => 'all',
        ) );
        $this->add_control( $this->prefix() . '_department', array(
            'label'   => __( 'Department', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::SELECT,
            'options' => array(
                'all' => __( 'All', 'fbsf-core' ),
                'accountancy'        => __( 'Accountancy', 'fbsf-core' ),
                'banking-finance'    => __( 'Banking & Finance', 'fbsf-core' ),
                'business-management' => __( 'Business Management', 'fbsf-core' ),
                'insurance-valuation' => __( 'Insurance & Valuation', 'fbsf-core' ),
            ),
            'default' => 'all',
        ) );
        $this->add_control( $this->prefix() . '_limit', array(
            'label'   => __( 'Limit', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::NUMBER,
            'default' => 50,
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        echo FBSF_Shortcodes::programme_cards( array(
            'category'   => $this->setting( 'category', 'all' ),
            'department' => $this->setting( 'department', 'all' ),
            'limit'      => absint( $this->setting( 'limit', 50 ) ),
        ) );
    }
}

/**
 * Journal cards.
 */
class FBSF_Widget_Journal_Cards extends FBSF_Widget_Base {

    public function get_name() {
        return 'journal-cards';
    }

    public function get_title() {
        return __( 'FBSF — Journal Cards', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-book-open';
    }

    protected function render() {
        echo FBSF_Shortcodes::journal_cards( array() );
    }
}

/**
 * Contact cards.
 */
class FBSF_Widget_Contact_Cards extends FBSF_Widget_Base {

    public function get_name() {
        return 'contact-cards';
    }

    public function get_title() {
        return __( 'FBSF — Contact Cards', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-phone';
    }

    protected function render() {
        echo FBSF_Shortcodes::contact_cards( array() );
    }
}

/**
 * FAQ accordion.
 */
class FBSF_Widget_Faq extends FBSF_Widget_Base {

    public function get_name() {
        return 'faq';
    }

    public function get_title() {
        return __( 'FBSF — FAQ Accordion', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-info-circle';
    }

    protected function render() {
        echo FBSF_Shortcodes::faq( array() );
    }
}

/**
 * Downloads.
 */
class FBSF_Widget_Downloads extends FBSF_Widget_Base {

    public function get_name() {
        return 'downloads';
    }

    public function get_title() {
        return __( 'FBSF — Downloads', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-download';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Downloads', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_limit', array(
            'label'   => __( 'Limit', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::NUMBER,
            'default' => 20,
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        echo FBSF_Shortcodes::downloads( array(
            'limit' => absint( $this->setting( 'limit', 20 ) ),
        ) );
    }
}

/**
 * Stat band (homepage stats).
 */
class FBSF_Widget_Stat_Band extends FBSF_Widget_Base {

    public function get_name() {
        return 'stat-band';
    }

    public function get_title() {
        return __( 'FBSF — Stats Band', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-bar-chart';
    }

    protected function render() {
        echo FBSF_Shortcodes::stats();
    }
}

/**
 * Quick links grid.
 */
class FBSF_Widget_Quick_Links extends FBSF_Widget_Base {

    public function get_name() {
        return 'quick-links';
    }

    public function get_title() {
        return __( 'FBSF — Quick Links', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-link';
    }

    protected function render() {
        echo FBSF_Shortcodes::quick_links();
    }
}

/**
 * Site-wide content blocks (vision/mission, dean message, timeline, office hours).
 */
class FBSF_Widget_Site_Content extends FBSF_Widget_Base {

    public function get_name() {
        return 'site-content';
    }

    public function get_title() {
        return __( 'FBSF — Site Content', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-file';
    }

    protected function _register_controls() {
        $this->start_controls_section( $this->prefix() . '_section', array( 'label' => __( 'Site Content', 'fbsf-core' ) ) );
        $this->add_control( $this->prefix() . '_block', array(
            'label'   => __( 'Block', 'fbsf-core' ),
            'type'    => \Elementor\Controls_Manager::SELECT,
            'options' => array(
                'vision_mission' => __( 'Vision & Mission', 'fbsf-core' ),
                'dean_message'   => __( "Dean's Message", 'fbsf-core' ),
                'history'        => __( 'History Timeline', 'fbsf-core' ),
                'office_hours'   => __( 'Office Hours', 'fbsf-core' ),
                'visit_us'       => __( 'Visit Us', 'fbsf-core' ),
                'research_areas' => __( 'Research Areas', 'fbsf-core' ),
                'committees'     => __( 'Faculty Committees', 'fbsf-core' ),
                'qa_units'       => __( 'Departmental QA Units', 'fbsf-core' ),
                'fqac'           => __( 'FQAC Information', 'fbsf-core' ),
            ),
            'default' => 'vision_mission',
        ) );
        $this->end_controls_section();
    }

    protected function render() {
        $block = $this->setting( 'block', 'vision_mission' );
        switch ( $block ) {
            case 'dean_message':
                echo FBSF_Shortcodes::dean_message();
                break;
            case 'history':
                echo FBSF_Shortcodes::history_timeline();
                break;
            case 'office_hours':
                echo FBSF_Shortcodes::office_hours();
                break;
            case 'visit_us':
                echo FBSF_Shortcodes::visit_us();
                break;
            case 'research_areas':
                echo FBSF_Shortcodes::research_areas();
                break;
            case 'committees':
                echo FBSF_Shortcodes::committees();
                break;
            case 'qa_units':
                echo FBSF_Shortcodes::qa_units();
                break;
            case 'fqac':
                echo FBSF_Shortcodes::fqac_info();
                break;
            default:
                echo FBSF_Shortcodes::vision_mission();
                break;
        }
    }
}

/**
 * Search results (used on the search results template).
 */
class FBSF_Widget_Search_Results extends FBSF_Widget_Base {

    public function get_name() {
        return 'search-results';
    }

    public function get_title() {
        return __( 'FBSF — Search Results', 'fbsf-core' );
    }

    public function get_icon() {
        return 'eicon-search';
    }

    protected function render() {
        echo FBSF_Shortcodes::search_results();
    }
}
