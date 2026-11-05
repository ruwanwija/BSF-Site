<?php
/**
 * Shortcodes for dynamic FBSF content.
 *
 * Every shortcode is self-contained: it queries the relevant CPTs/options,
 * renders verified-content cards, and applies the same design system as the
 * original static site. No invented content; missing data renders
 * "Information not available". Historical dates are always flagged as
 * concluded/archived.
 *
 * @package FBSF_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Shortcode registration and rendering.
 */
class FBSF_Shortcodes {

    /**
     * Register all shortcodes.
     */
    public static function register() {
        add_shortcode( 'fbsf_site_info', array( __CLASS__, 'site_info' ) );
        add_shortcode( 'fbsf_vision_mission', array( __CLASS__, 'vision_mission' ) );
        add_shortcode( 'fbsf_dean_message', array( __CLASS__, 'dean_message' ) );
        add_shortcode( 'fbsf_history_timeline', array( __CLASS__, 'history_timeline' ) );
        add_shortcode( 'fbsf_stats', array( __CLASS__, 'stats' ) );
        add_shortcode( 'fbsf_quick_links', array( __CLASS__, 'quick_links' ) );
        add_shortcode( 'fbsf_department_cards', array( __CLASS__, 'department_cards' ) );
        add_shortcode( 'fbsf_programme_filter', array( __CLASS__, 'programme_filter' ) );
        add_shortcode( 'fbsf_programme_cards', array( __CLASS__, 'programme_cards' ) );
        add_shortcode( 'fbsf_journal_tabs', array( __CLASS__, 'journal_tabs' ) );
        add_shortcode( 'fbsf_journal_cards', array( __CLASS__, 'journal_cards' ) );
        add_shortcode( 'fbsf_article_search', array( __CLASS__, 'article_search' ) );
        add_shortcode( 'fbsf_events', array( __CLASS__, 'events' ) );
        add_shortcode( 'fbsf_announcements', array( __CLASS__, 'announcements' ) );
        add_shortcode( 'fbsf_downloads', array( __CLASS__, 'downloads' ) );
        add_shortcode( 'fbsf_contact_cards', array( __CLASS__, 'contact_cards' ) );
        add_shortcode( 'fbsf_faq', array( __CLASS__, 'faq' ) );
        add_shortcode( 'fbsf_research_areas', array( __CLASS__, 'research_areas' ) );
        add_shortcode( 'fbsf_office_hours', array( __CLASS__, 'office_hours' ) );
        add_shortcode( 'fbsf_visit_us', array( __CLASS__, 'visit_us' ) );
        add_shortcode( 'fbsf_faq_list', array( __CLASS__, 'faq' ) );
        add_shortcode( 'fbsf_journal_submissions', array( __CLASS__, 'journal_submissions' ) );
        add_shortcode( 'fbsf_committees', array( __CLASS__, 'committees' ) );
        add_shortcode( 'fbsf_qa_units', array( __CLASS__, 'qa_units' ) );
        add_shortcode( 'fbsf_search_results', array( __CLASS__, 'search_results' ) );
        add_shortcode( 'fbsf_department_single', array( __CLASS__, 'department_single' ) );
        add_shortcode( 'fbsf_programme_single', array( __CLASS__, 'programme_single' ) );
        add_shortcode( 'fbsf_journal_single', array( __CLASS__, 'journal_single' ) );
        add_shortcode( 'fbsf_event_single', array( __CLASS__, 'event_single' ) );
        add_shortcode( 'fbsf_fqac_info', array( __CLASS__, 'fqac_info' ) );
    }

    /**
     * Shared card markup helpers.
     */

    /**
     * Escape helper alias.
     */
    private static function esc( $v ) {
        return esc_html( $v );
    }

    /**
     * Get a term by slug (safe lookup).
     */
    private static function term_by_slug( $slug ) {
        if ( ! $slug ) {
            return null;
        }
        $term = get_term_by( 'slug', sanitize_title( $slug ), 'fbsf_programme_category' );
        if ( ! $term ) {
            $term = get_term_by( 'slug', sanitize_title( $slug ), 'fbsf_department' );
        }
        return $term;
    }

    /**
     * Render a card wrapper.
     */
    private static function card( $inner, $class = 'fbsf-card' ) {
        return '<div class="' . esc_attr( $class ) . '">' . $inner . '</div>';
    }

    /**
     * Badge for historical/archived items.
     */
    private static function archived_badge( $status ) {
        $status = strtolower( (string) $status );
        if ( in_array( $status, array( 'past', 'historical', 'archived', 'concluded' ), true ) ) {
            return '<span class="fbsf-badge fbsf-badge--archived">Archived — concluded</span>';
        }
        return '';
    }

    /* ------------------------------------------------------------------
     * Site info
     * ------------------------------------------------------------------ */

    public static function site_info( $atts ) {
        $opts = FBSF_Options::get();
        $key  = isset( $atts['key'] ) ? sanitize_text_field( $atts['key'] ) : '';
        return isset( $opts[ $key ] ) ? FBSF_Shortcodes::esc( $opts[ $key ] ) : '';
    }

    /* ------------------------------------------------------------------
     * Vision & Mission
     * ------------------------------------------------------------------ */

    public static function vision_mission() {
        $opts = FBSF_Options::get();
        $vision = $opts['vision'] ?: __( 'Information not available.', 'fbsf-core' );
        $mission = $opts['mission'] ?: __( 'Information not available.', 'fbsf-core' );
        $out = '<div class="fbsf-vm-grid">';
        $out .= self::card( '<div class="fbsf-vm"><span class="fbsf-vm-label">Vision</span><p>' . wp_kses_post( $vision ) . '</p></div>', 'fbsf-vm-card fbsf-vm-card--vision' );
        $out .= self::card( '<div class="fbsf-vm"><span class="fbsf-vm-label">Mission</span><p>' . wp_kses_post( $mission ) . '</p></div>', 'fbsf-vm-card fbsf-vm-card--mission' );
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Dean's message
     * ------------------------------------------------------------------ */

    public static function dean_message() {
        $opts = FBSF_Options::get();
        if ( ! $opts['dean_message'] ) {
            return self::card( '<p class="fbsf-muted">Information not available.</p>', 'fbsf-dean' );
        }
        $name = $opts['dean_name'] ? '<strong>' . self::esc( $opts['dean_name'] ) . '</strong>, ' . self::esc( $opts['dean_title'] ) : '';
        return '<div class="fbsf-dean">'
            . '<blockquote>' . wp_kses_post( $opts['dean_message'] ) . '</blockquote>'
            . '<p class="fbsf-dean-signature">' . $name . '</p>'
            . '</div>';
    }

    /* ------------------------------------------------------------------
     * History timeline
     * ------------------------------------------------------------------ */

    public static function history_timeline() {
        $opts = FBSF_Options::get();
        $rows = $opts['history_timeline'];
        if ( empty( $rows ) ) {
            return '';
        }
        $out = '<ol class="fbsf-timeline">';
        foreach ( $rows as $r ) {
            $date  = isset( $r['date'] ) ? self::esc( $r['date'] ) : '';
            $title = isset( $r['title'] ) ? self::esc( $r['title'] ) : '';
            $text  = isset( $r['text'] ) ? wp_kses_post( $r['text'] ) : '';
            $out .= '<li class="fbsf-timeline-item">'
                . ( $date ? '<span class="fbsf-timeline-date">' . $date . '</span>' : '' )
                . '<div class="fbsf-timeline-body"><h4>' . $title . '</h4><p>' . $text . '</p></div>'
                . '</li>';
        }
        $out .= '</ol>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Stats
     * ------------------------------------------------------------------ */

    public static function stats() {
        $opts = FBSF_Options::get();
        $rows = $opts['stats'];
        if ( empty( $rows ) ) {
            return '';
        }
        $out = '<div class="fbsf-stats">';
        foreach ( $rows as $r ) {
            $value = isset( $r['value'] ) ? self::esc( $r['value'] ) : '';
            $label = isset( $r['label'] ) ? self::esc( $r['label'] ) : '';
            $out .= '<div class="fbsf-stat"><span class="fbsf-stat-value">' . $value . '</span><span class="fbsf-stat-label">' . $label . '</span></div>';
        }
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Quick links
     * ------------------------------------------------------------------ */

    public static function quick_links() {
        $opts = FBSF_Options::get();
        $rows = $opts['quick_links'];
        if ( empty( $rows ) ) {
            return '';
        }
        $out = '<div class="fbsf-quick-links">';
        foreach ( $rows as $r ) {
            $title = isset( $r['title'] ) ? self::esc( $r['title'] ) : '';
            $url   = isset( $r['url'] ) ? esc_url( $r['url'] ) : '#';
            $icon  = isset( $r['icon'] ) ? self::esc( $r['icon'] ) : 'link';
            $out .= '<a class="fbsf-quick-link" href="' . $url . '"><span class="fbsf-ql-icon">' . $icon . '</span><span>' . $title . '</span></a>';
        }
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Department cards
     * ------------------------------------------------------------------ */

    public static function department_cards( $atts ) {
        $args = array(
            'post_type'      => 'fbsf_department',
            'post_status'    => 'publish',
            'posts_per_page' => isset( $atts['limit'] ) ? absint( $atts['limit'] ) : 4,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        );
        $query = new WP_Query( $args );
        if ( ! $query->have_posts() ) {
            return '<p class="fbsf-muted">No departments published yet.</p>';
        }
        $out = '<div class="fbsf-grid fbsf-grid--departments">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $id    = get_the_ID();
            $title = get_the_title();
            $abbr  = get_post_meta( $id, 'abbreviation', true );
            $tagline = get_post_meta( $id, 'tagline', true );
            $intro = get_post_meta( $id, 'intro', true );
            $out .= '<div class="fbsf-dept-card">'
                . '<div class="fbsf-dept-icon">' . self::esc( $abbr ? substr( $abbr, 0, 3 ) : 'D' ) . '</div>'
                . '<h3 class="fbsf-dept-title">' . self::esc( $title ) . '</h3>'
                . ( $tagline ? '<p class="fbsf-dept-tagline">' . self::esc( $tagline ) . '</p>' : '' )
                . ( $intro ? '<p class="fbsf-dept-intro">' . wp_kses_post( $intro ) . '</p>' : '' )
                . '<a class="fbsf-btn fbsf-btn--ghost" href="' . esc_url( get_permalink() ) . '">Learn more</a>'
                . '</div>';
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Programme cards
     * ------------------------------------------------------------------ */

    /**
     * Programme card renderer (used by both shortcodes and widgets).
     */
    public static function programme_card( $post_id ) {
        $title  = get_the_title( $post_id );
        $code   = get_post_meta( $post_id, 'code', true );
        $summary = get_post_meta( $post_id, 'summary', true );
        $cat    = get_post_meta( $post_id, 'category_term', true );
        $dept   = get_post_meta( $post_id, 'department_term', true );
        $duration  = get_post_meta( $post_id, 'duration', true );
        $credits   = get_post_meta( $post_id, 'credits', true );
        $deadline  = get_post_meta( $post_id, 'deadline', true );
        $dstatus   = get_post_meta( $post_id, 'deadline_status', true );
        $contact   = get_post_meta( $post_id, 'application_contact', true );
        $out  = '<div class="fbsf-prog-card" data-fbsf-cat="' . esc_attr( $cat ) . '" data-fbsf-dept="' . esc_attr( $dept ) . '">';
        $out .= '<div class="fbsf-prog-head">';
        $out .= '<h3 class="fbsf-prog-title">' . self::esc( $title ) . '</h3>';
        $out .= '<span class="fbsf-badge fbsf-badge--cat">' . self::esc( $cat ?: 'Programme' ) . '</span>';
        if ( 'external' === strtolower( $cat ) ) {
            $out .= '<span class="fbsf-badge fbsf-badge--green">External</span>';
        }
        $out .= '</div>';
        if ( $code ) {
            $out .= '<p class="fbsf-prog-code">' . self::esc( $code ) . '</p>';
        }
        if ( $summary ) {
            $out .= '<p class="fbsf-prog-summary">' . wp_kses_post( $summary ) . '</p>';
        }
        if ( $duration || $credits ) {
            $out .= '<div class="fbsf-prog-meta">';
            if ( $duration ) {
                $out .= '<span class="fbsf-prog-meta-item"><strong>Duration</strong> ' . self::esc( $duration ) . '</span>';
            }
            if ( $credits ) {
                $out .= '<span class="fbsf-prog-meta-item"><strong>Credits</strong> ' . self::esc( $credits ) . '</span>';
            }
            $out .= '</div>';
        }
        // Expandable details.
        $out .= '<details class="fbsf-prog-detail">';
        if ( $duration || $credits || $deadline || $contact ) {
            $out .= '<summary>Programme details</summary><div class="fbsf-prog-detail-body">';
            if ( $deadline ) {
                $out .= '<p><strong>Application deadline:</strong> ' . self::esc( $deadline ) . self::archived_badge( $dstatus ) . '</p>';
            }
            if ( $contact ) {
                $out .= '<p><strong>Applications:</strong> ' . wp_kses_post( $contact ) . '</p>';
            }
            $out .= '</div>';
        }
        // Course structure repeater.
        $structure = get_post_meta( $post_id, 'course_structure', true );
        if ( is_array( $structure ) && ! empty( $structure ) ) {
            $out .= '<details class="fbsf-prog-detail"><summary>Course structure</summary><table class="fbsf-table"><tbody>';
            foreach ( $structure as $row ) {
                $semester = isset( $row['semester'] ) ? self::esc( $row['semester'] ) : '';
                $ccode    = isset( $row['code'] ) ? self::esc( $row['code'] ) : '';
                $ctitle   = isset( $row['title'] ) ? self::esc( $row['title'] ) : '';
                $ccredits = isset( $row['credits'] ) ? self::esc( $row['credits'] ) : '';
                $out .= '<tr>'
                    . ( $semester ? '<td class="fbsf-table-sem">' . $semester . '</td>' : '<td class="fbsf-table-sem"></td>' )
                    . ( $ccode ? '<td class="fbsf-table-code">' . $ccode . '</td>' : '<td class="fbsf-table-code"></td>' )
                    . '<td class="fbsf-table-title">' . $ctitle . '</td>'
                    . ( $ccredits ? '<td class="fbsf-table-credits">' . $ccredits . '</td>' : '<td class="fbsf-table-credits"></td>' )
                    . '</tr>';
            }
            $out .= '</tbody></table></details>';
        }
        $out .= '</details>';
        $out .= '</div>';
        return $out;
    }

    /**
     * Programme cards grid.
     */
    public static function programme_cards( $atts ) {
        $cat = isset( $atts['category'] ) ? sanitize_text_field( $atts['category'] ) : '';
        $dept = isset( $atts['department'] ) ? sanitize_text_field( $atts['department'] ) : '';
        $args = array(
            'post_type'      => 'fbsf_programme',
            'post_status'    => 'publish',
            'posts_per_page' => isset( $atts['limit'] ) ? absint( $atts['limit'] ) : 50,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        );
        if ( $cat && 'all' !== $cat ) {
            $args['tax_query'][] = array(
                'taxonomy' => 'fbsf_programme_category',
                'field'    => 'slug',
                'terms'    => $cat,
            );
        }
        if ( $dept && 'all' !== $dept ) {
            $args['tax_query'][] = array(
                'taxonomy' => 'fbsf_department',
                'field'    => 'slug',
                'terms'    => $dept,
            );
        }
        $query = new WP_Query( $args );
        if ( ! $query->have_posts() ) {
            return '<p class="fbsf-muted">No programmes match this filter.</p>';
        }
        $out = '<div class="fbsf-grid fbsf-grid--programmes">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $out .= self::programme_card( get_the_ID() );
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /**
     * Programme filter + cards (the flagship interactive element).
     */
    public static function programme_filter( $atts ) {
        $columns = isset( $atts['columns'] ) ? absint( $atts['columns'] ) : 3;
        $cats = get_terms( array(
            'taxonomy'   => 'fbsf_programme_category',
            'hide_empty' => true,
        ) );
        $depts = get_terms( array(
            'taxonomy'   => 'fbsf_department',
            'hide_empty' => true,
        ) );
        $cat_slugs = array_map( function ( $t ) { return $t->slug; }, (array) $cats );
        $dept_slugs = array_map( function ( $t ) { return $t->slug; }, (array) $depts );
        $out = '<div class="fbsf-filter" data-fbsf-filter="programme">';
        $out .= '<div class="fbsf-filter-pills" role="group" aria-label="Filter by category">';
        $out .= '<button type="button" class="fbsf-pill is-active" data-fbsf-cat="all">All</button>';
        foreach ( $cat_slugs as $slug ) {
            $term = get_term_by( 'slug', $slug, 'fbsf_programme_category' );
            $label = $term ? $term->name : $slug;
            $out .= '<button type="button" class="fbsf-pill" data-fbsf-cat="' . esc_attr( $slug ) . '">' . self::esc( $label ) . '</button>';
        }
        $out .= '</div>';
        $out .= '<div class="fbsf-filter-bar">';
        $out .= '<select class="fbsf-filter-select" aria-label="Filter by department"><option value="all">All departments</option>';
        foreach ( $dept_slugs as $slug ) {
            $term = get_term_by( 'slug', $slug, 'fbsf_department' );
            $label = $term ? $term->name : $slug;
            $out .= '<option value="' . esc_attr( $slug ) . '">' . self::esc( $label ) . '</option>';
        }
        $out .= '</select>';
        $out .= '<input type="search" class="fbsf-filter-search" placeholder="Search programmes..." aria-label="Search programmes" />';
        $out .= '<span class="fbsf-filter-count" data-fbsf-count></span>';
        $out .= '</div>';
        $out .= self::programme_cards( array( 'limit' => 50 ) );
        $out .= '<div class="fbsf-filter-empty" hidden>No programmes match your search.</div>';
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Journal tabs + cards
     * ------------------------------------------------------------------ */

    /**
     * Single journal card renderer (used by cards + tabs).
     */
    public static function journal_card( $post_id ) {
        $title  = get_the_title( $post_id );
        $abbr   = get_post_meta( $post_id, 'abbreviation', true );
        $issn   = get_post_meta( $post_id, 'issn', true );
        $freq   = get_post_meta( $post_id, 'frequency', true );
        $desc   = get_post_meta( $post_id, 'description', true );
        $issues = get_post_meta( $post_id, 'issues', true );
        $latest = get_post_meta( $post_id, 'latest_issue', true );
        $out  = '<div class="fbsf-journal-card">'
            . '<div class="fbsf-journal-head">'
            . '<h3 class="fbsf-journal-title">' . self::esc( $title ) . '</h3>'
            . '<span class="fbsf-badge">' . self::esc( $abbr ?: 'Journal' ) . '</span>'
            . '</div>'
            . ( $issn ? '<p class="fbsf-journal-issn"><strong>ISSN:</strong> ' . self::esc( $issn ) . '</p>' : '' )
            . ( $freq ? '<p class="fbsf-journal-freq"><strong>Frequency:</strong> ' . self::esc( $freq ) . '</p>' : '' )
            . ( $desc ? '<p class="fbsf-journal-desc">' . wp_kses_post( $desc ) . '</p>' : '' )
            . ( $latest ? '<p class="fbsf-journal-latest"><strong>Latest issue:</strong> ' . self::esc( $latest ) . '</p>' : '' )
            . ( is_array( $issues ) && ! empty( $issues ) ? '<ul class="fbsf-journal-issues">' : '' );
        if ( is_array( $issues ) ) {
            foreach ( $issues as $issue ) {
                $yv = isset( $issue['year'] ) ? self::esc( $issue['year'] ) : '';
                $dv = isset( $issue['detail'] ) ? self::esc( $issue['detail'] ) : '';
                $out .= '<li>' . $yv . ( $dv ? ' — ' . $dv : '' ) . '</li>';
            }
        }
        if ( is_array( $issues ) && ! empty( $issues ) ) {
            $out .= '</ul>';
        }
        $out .= '<a class="fbsf-btn fbsf-btn--ghost" href="' . esc_url( get_permalink( $post_id ) ) . '">View journal</a>'
            . '</div>';
        return $out;
    }

    /**
     * Journal cards grid.
     */
    public static function journal_cards( $atts ) {
        $args = array(
            'post_type'      => 'fbsf_journal',
            'post_status'    => 'publish',
            'posts_per_page' => isset( $atts['limit'] ) ? absint( $atts['limit'] ) : 20,
        );
        $query = new WP_Query( $args );
        if ( ! $query->have_posts() ) {
            return '<p class="fbsf-muted">No journals published yet.</p>';
        }
        $out = '<div class="fbsf-grid fbsf-grid--journals">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $out .= self::journal_card( get_the_ID() );
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /**
     * Journal tabs (All + each journal).
     */
    public static function journal_tabs( $atts ) {
        $out = '<div class="fbsf-journal-tabs" data-fbsf-journal-tabs>';
        $out .= '<div class="fbsf-journal-tablist" role="tablist">';
        $out .= '<button type="button" class="fbsf-jtab is-active" data-fbsf-jtab="all">All journals</button>';
        $query = new WP_Query( array(
            'post_type'      => 'fbsf_journal',
            'post_status'    => 'publish',
            'posts_per_page' => 50,
        ) );
        $ids = array();
        while ( $query->have_posts() ) {
            $query->the_post();
            $ids[] = get_the_ID();
            $out .= '<button type="button" class="fbsf-jtab" data-fbsf-jtab="' . esc_attr( sanitize_title( get_the_title() ) ) . '">'
                . self::esc( get_the_title() ) . '</button>';
        }
        wp_reset_postdata();
        $out .= '</div>';
        $out .= '<div class="fbsf-journal-tabpanels">';
        $out .= '<div class="fbsf-journal-panel is-active" data-fbsf-jpanel="all">' . self::journal_cards( array() ) . '</div>';
        // Per-journal panels (render single cards directly — no nested queries).
        foreach ( $ids as $id ) {
            $slug = sanitize_title( get_the_title( $id ) );
            $out .= '<div class="fbsf-journal-panel" data-fbsf-jpanel="' . esc_attr( $slug ) . '" hidden>'
                . '<div class="fbsf-grid fbsf-grid--journals">'
                . self::journal_card( $id )
                . '</div></div>';
        }
        $out .= '</div>';
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Article search
     * ------------------------------------------------------------------ */

    public static function article_search( $atts ) {
        $query = new WP_Query( array(
            'post_type'      => 'fbsf_article',
            'post_status'    => 'publish',
            'posts_per_page' => 100,
        ) );
        $articles = array();
        while ( $query->have_posts() ) {
            $query->the_post();
            $articles[] = array(
                'id'        => get_the_ID(),
                'title'     => get_the_title(),
                'authors'   => get_post_meta( get_the_ID(), 'authors', true ),
                'issue'     => get_post_meta( get_the_ID(), 'issue', true ),
                'desc'      => get_post_meta( get_the_ID(), 'description', true ),
            );
        }
        wp_reset_postdata();
        $out = '<div class="fbsf-article-search" data-fbsf-article-search>';
        $out .= '<div class="fbsf-article-search-bar">';
        $out .= '<input type="search" class="fbsf-article-search-input" placeholder="Search articles by title, author or keyword..." aria-label="Search articles" />';
        $out .= '<span class="fbsf-filter-count" data-fbsf-article-count></span>';
        $out .= '</div>';
        $out .= '<div class="fbsf-article-results" data-fbsf-article-results>';
        foreach ( $articles as $a ) {
            $out .= '<div class="fbsf-article-item" data-fbsf-article-text="'
                . esc_attr( wp_json_encode( array(
                    'title'   => strtolower( $a['title'] ),
                    'authors' => strtolower( $a['authors'] ),
                    'desc'    => strtolower( $a['desc'] ),
                ) ) ) . '">'
                . '<h4>' . self::esc( $a['title'] ) . '</h4>'
                . ( $a['authors'] ? '<p class="fbsf-article-authors">' . self::esc( $a['authors'] ) . '</p>' : '' )
                . ( $a['issue'] ? '<p class="fbsf-article-issue"><span class="fbsf-badge">' . self::esc( $a['issue'] ) . '</span></p>' : '' )
                . ( $a['desc'] ? '<p class="fbsf-article-desc">' . wp_kses_post( $a['desc'] ) . '</p>' : '' )
                . '</div>';
        }
        $out .= '</div>';
        $out .= '<div class="fbsf-filter-empty" hidden>No articles match your search.</div>';
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Events & announcements
     * ------------------------------------------------------------------ */

    /**
     * Event card renderer (used by events + announcements shortcodes).
     */
    public static function event_card( $post_id, $kind = 'event' ) {
        $title  = get_the_title( $post_id );
        $edition = get_post_meta( $post_id, 'edition', true );
        $theme  = get_post_meta( $post_id, 'theme', true );
        $status = get_post_meta( $post_id, 'status', true );
        $organizer = get_post_meta( $post_id, 'organizer', true );
        $desc   = get_post_meta( $post_id, 'description', true );
        $dates  = get_post_meta( $post_id, 'dates', true );
        $tracks = get_post_meta( $post_id, 'tracks', true );
        $keynote = get_post_meta( $post_id, 'keynote_name', true );
        $kdetails = get_post_meta( $post_id, 'keynote_details', true );
        $submission = get_post_meta( $post_id, 'submission', true );
        $downloads = get_post_meta( $post_id, 'downloads', true );
        $contact = get_post_meta( $post_id, 'contact', true );
        $head = $edition ? self::esc( $edition ) . ' · ' : '';
        $out  = '<article class="fbsf-event-card" data-fbsf-event-kind="' . esc_attr( $kind ) . '">';
        $out .= '<div class="fbsf-event-head">';
        $out .= '<h3 class="fbsf-event-title">' . $head . self::esc( $title ) . '</h3>';
        $out .= self::archived_badge( $status );
        $out .= '</div>';
        if ( $theme ) {
            $out .= '<p class="fbsf-event-theme"><strong>Theme:</strong> ' . self::esc( $theme ) . '</p>';
        }
        if ( $desc ) {
            $out .= '<p class="fbsf-event-desc">' . wp_kses_post( $desc ) . '</p>';
        }
        if ( is_array( $dates ) && ! empty( $dates ) ) {
            $out .= '<ul class="fbsf-event-dates">';
            foreach ( $dates as $d ) {
                $label = isset( $d['label'] ) ? self::esc( $d['label'] ) : '';
                $date  = isset( $d['date'] ) ? self::esc( $d['date'] ) : '';
                if ( $label || $date ) {
                    $out .= '<li><strong>' . $label . ':</strong> ' . $date . '</li>';
                }
            }
            $out .= '</ul>';
        }
        if ( is_array( $tracks ) && ! empty( $tracks ) ) {
            $out .= '<div class="fbsf-event-tracks">';
            foreach ( $tracks as $t ) {
                $ttitle = isset( $t['title'] ) ? self::esc( $t['title'] ) : '';
                if ( $ttitle ) {
                    $out .= '<span class="fbsf-chip">' . $ttitle . '</span>';
                }
            }
            $out .= '</div>';
        }
        if ( $keynote ) {
            $out .= '<p class="fbsf-event-keynote"><strong>Keynote:</strong> ' . self::esc( $keynote )
                . ( $kdetails ? ' — ' . wp_kses_post( $kdetails ) : '' ) . '</p>';
        }
        if ( $submission ) {
            $out .= '<p class="fbsf-event-submission">' . wp_kses_post( $submission ) . '</p>';
        }
        if ( is_array( $downloads ) && ! empty( $downloads ) ) {
            $out .= '<ul class="fbsf-event-downloads">';
            foreach ( $downloads as $dl ) {
                $dltitle = isset( $dl['title'] ) ? self::esc( $dl['title'] ) : '';
                $dlnote  = isset( $dl['note'] ) ? self::esc( $dl['note'] ) : '';
                if ( $dltitle ) {
                    $out .= '<li>' . $dltitle . ( $dlnote ? ' — ' . $dlnote : '' ) . '</li>';
                }
            }
            $out .= '</ul>';
        }
        if ( $contact ) {
            $out .= '<p class="fbsf-event-contact"><strong>Contact:</strong> ' . wp_kses_post( $contact ) . '</p>';
        }
        $out .= '</article>';
        return $out;
    }

    /**
     * Event cards (symposiums / conferences).
     */
    public static function events( $atts ) {
        $type = isset( $atts['type'] ) ? sanitize_text_field( $atts['type'] ) : '';
        $args = array(
            'post_type'      => 'fbsf_event',
            'post_status'    => 'publish',
            'posts_per_page' => isset( $atts['limit'] ) ? absint( $atts['limit'] ) : 20,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        );
        if ( $type && 'all' !== $type ) {
            $args['tax_query'][] = array(
                'taxonomy' => 'fbsf_event_type',
                'field'    => 'slug',
                'terms'    => $type,
            );
        }
        $query = new WP_Query( $args );
        if ( ! $query->have_posts() ) {
            return '<p class="fbsf-muted">No events published yet.</p>';
        }
        $out = '<div class="fbsf-grid fbsf-grid--events">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $out .= self::event_card( get_the_ID() );
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /**
     * Announcements (archived notices).
     */
    public static function announcements( $atts ) {
        return self::events( array( 'type' => 'programme-application', 'limit' => isset( $atts['limit'] ) ? absint( $atts['limit'] ) : 10 ) );
    }

    /* ------------------------------------------------------------------
     * Downloads
     * ------------------------------------------------------------------ */

    public static function downloads( $atts ) {
        $args = array(
            'post_type'      => 'fbsf_download',
            'post_status'    => 'publish',
            'posts_per_page' => isset( $atts['limit'] ) ? absint( $atts['limit'] ) : 20,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        );
        $query = new WP_Query( $args );
        if ( ! $query->have_posts() ) {
            return '<p class="fbsf-muted">No downloads published yet.</p>';
        }
        $out = '<div class="fbsf-grid fbsf-grid--downloads">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $id    = get_the_ID();
            $file  = get_post_meta( $id, 'file', true );
            $cat   = get_post_meta( $id, 'category', true );
            $desc  = get_post_meta( $id, 'description', true );
            $out .= '<div class="fbsf-download-card">'
                . '<h3 class="fbsf-download-title">' . self::esc( get_the_title() ) . '</h3>'
                . ( $cat ? '<span class="fbsf-badge">' . self::esc( $cat ) . '</span>' : '' )
                . ( $desc ? '<p class="fbsf-download-desc">' . wp_kses_post( $desc ) . '</p>' : '' )
                . '<button type="button" class="fbsf-btn fbsf-btn--primary js-fbsf-download-notice" data-fbsf-file="' . esc_attr( $file ) . '">Request this document</button>'
                . '</div>';
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Contact cards
     * ------------------------------------------------------------------ */

    public static function contact_cards( $atts ) {
        $opts = FBSF_Options::get();
        $rows = $opts['contact_groups'];
        if ( empty( $rows ) ) {
            return '<p class="fbsf-muted">Contact information not available.</p>';
        }
        $out = '<div class="fbsf-grid fbsf-grid--contacts">';
        foreach ( $rows as $r ) {
            $group = isset( $r['group'] ) ? self::esc( $r['group'] ) : '';
            $contact = isset( $r['contact'] ) ? self::esc( $r['contact'] ) : '';
            $email = isset( $r['email'] ) ? esc_url( $r['email'] ) : '';
            $phone = isset( $r['phone'] ) ? self::esc( $r['phone'] ) : '';
            $out .= '<div class="fbsf-contact-card">'
                . '<h3 class="fbsf-contact-title">' . $group . '</h3>'
                . ( $contact ? '<p class="fbsf-contact-line"><strong>Contact:</strong> ' . $contact . '</p>' : '' )
                . ( $email ? '<p class="fbsf-contact-line"><strong>Email:</strong> <a href="mailto:' . esc_attr( $email ) . '">' . self::esc( $email ) . '</a></p>' : '' )
                . ( $phone ? '<p class="fbsf-contact-line"><strong>Phone:</strong> ' . $phone . '</p>' : '' )
                . '</div>';
        }
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * FAQ accordion
     * ------------------------------------------------------------------ */

    public static function faq( $atts ) {
        $opts = FBSF_Options::get();
        $rows = $opts['faqs'];
        if ( empty( $rows ) ) {
            return '';
        }
        $out = '<div class="fbsf-faq" data-fbsf-faq>';
        foreach ( $rows as $r ) {
            $q = isset( $r['question'] ) ? self::esc( $r['question'] ) : '';
            $a = isset( $r['answer'] ) ? wp_kses_post( $r['answer'] ) : '';
            if ( ! $q ) {
                continue;
            }
            $out .= '<details class="fbsf-faq-item"><summary>' . $q . '</summary><div class="fbsf-faq-answer">' . $a . '</div></details>';
        }
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Research areas chips
     * ------------------------------------------------------------------ */

    public static function research_areas() {
        $opts = FBSF_Options::get();
        $rows = $opts['research_areas'];
        if ( empty( $rows ) ) {
            return '';
        }
        $out = '<div class="fbsf-chips">';
        foreach ( $rows as $r ) {
            $name = isset( $r['name'] ) ? self::esc( $r['name'] ) : '';
            if ( $name ) {
                $out .= '<span class="fbsf-chip">' . $name . '</span>';
            }
        }
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Office hours / visit us
     * ------------------------------------------------------------------ */

    public static function office_hours() {
        $opts = FBSF_Options::get();
        if ( ! $opts['office_hours'] ) {
            return self::card( '<p class="fbsf-muted">Office hours not documented.</p>', 'fbsf-hours-card' );
        }
        return self::card( '<h3 class="fbsf-card-title">Office Hours</h3><p>' . wp_kses_post( $opts['office_hours'] ) . '</p>', 'fbsf-hours-card' );
    }

    public static function visit_us() {
        $opts = FBSF_Options::get();
        return self::card(
            '<h3 class="fbsf-card-title">Visit Us</h3>'
            . '<p><strong>' . self::esc( $opts['address'] ) . '</strong></p>'
            . '<p>Wayamba University of Sri Lanka</p>',
            'fbsf-visit-card'
        );
    }

    /* ------------------------------------------------------------------
     * Journal submissions (per journal email list)
     * ------------------------------------------------------------------ */

    public static function journal_submissions() {
        $query = new WP_Query( array(
            'post_type'      => 'fbsf_journal',
            'post_status'    => 'publish',
            'posts_per_page' => 20,
        ) );
        if ( ! $query->have_posts() ) {
            return '';
        }
        $out = '<div class="fbsf-journal-submissions">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $id     = get_the_ID();
            $name   = get_the_title();
            $email  = get_post_meta( $id, 'email', true );
            $sub    = get_post_meta( $id, 'submission', true );
            $out .= '<div class="fbsf-journal-submission-item">'
                . '<h4>' . self::esc( $name ) . '</h4>';
            if ( $email ) {
                $out .= '<p class="fbsf-contact-line"><strong>Submission email:</strong> <a href="mailto:' . esc_attr( $email ) . '">' . self::esc( $email ) . '</a></p>';
            }
            if ( $sub ) {
                $out .= '<p class="fbsf-journal-desc">' . wp_kses_post( $sub ) . '</p>';
            }
            $out .= '</div>';
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Faculty committees
     * ------------------------------------------------------------------ */

    public static function committees() {
        $opts = FBSF_Options::get();
        $rows = $opts['fqac_committees'];
        if ( empty( $rows ) ) {
            return '';
        }
        $out = '<div class="fbsf-grid fbsf-grid--committees">';
        foreach ( $rows as $r ) {
            $title = isset( $r['title'] ) ? self::esc( $r['title'] ) : '';
            $text  = isset( $r['text'] ) ? wp_kses_post( $r['text'] ) : '';
            $out .= self::card( '<h4 class="fbsf-card-title">' . $title . '</h4>'
                . ( $text ? '<p>' . $text . '</p>' : '' ), 'fbsf-committee-card' );
        }
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Departmental QA units
     * ------------------------------------------------------------------ */

    public static function qa_units() {
        $query = new WP_Query( array(
            'post_type'      => 'fbsf_department',
            'post_status'    => 'publish',
            'posts_per_page' => 20,
        ) );
        if ( ! $query->have_posts() ) {
            return '';
        }
        $out = '<div class="fbsf-grid fbsf-grid--departments">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $id    = get_the_ID();
            $title = get_the_title();
            $contact = get_post_meta( $id, 'contact', true );
            $out .= self::card( '<div class="fbsf-dept-icon">QA</div>'
                . '<h3 class="fbsf-dept-title">' . self::esc( $title ) . ' — Quality Assurance Unit</h3>'
                . '<p class="fbsf-dept-intro">Liaises with the FQAC on departmental quality assurance activities.</p>'
                . ( $contact ? '<p class="fbsf-dept-intro">' . wp_kses_post( $contact ) . '</p>' : '' ),
                'fbsf-dept-card' );
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Search results (used on the search results template)
     * ------------------------------------------------------------------ */

    public static function search_results() {
        global $wp_query;
        $q = isset( $wp_query->query_vars['s'] ) ? sanitize_text_field( wp_unslash( $wp_query->query_vars['s'] ) ) : '';
        $args = array(
            'post_status'    => 'publish',
            'posts_per_page' => 15,
            's'              => $q,
        );
        $query = new WP_Query( $args );
        if ( ! $query->have_posts() ) {
            return '<p class="fbsf-muted">No results found. Try a different keyword.</p>';
        }
        $out = '<div class="fbsf-search-results">';
        while ( $query->have_posts() ) {
            $query->the_post();
            $title = get_the_title();
            $type  = get_post_type();
            $out .= '<div class="fbsf-article-item">'
                . '<h4><a href="' . esc_url( get_permalink() ) . '">' . self::esc( $title ) . '</a></h4>'
                . '<p class="fbsf-article-issue"><span class="fbsf-badge">' . self::esc( $type ) . '</span></p>'
                . '<p class="fbsf-article-desc">' . wp_kses_post( wp_trim_words( get_the_excerpt(), 30 ) ) . '</p>'
                . '</div>';
        }
        wp_reset_postdata();
        $out .= '</div>';
        return $out;
    }

    /* ------------------------------------------------------------------
     * Single department (dynamic single-page layout)
     * ------------------------------------------------------------------ */

    public static function department_single() {
        global $post;
        if ( ! $post || 'fbsf_department' !== $post->post_type ) {
            return '';
        }
        $id    = $post->ID;
        $title = get_the_title( $id );
        $abbr  = get_post_meta( $id, 'abbreviation', true );
        $tagline = get_post_meta( $id, 'tagline', true );
        $intro  = get_post_meta( $id, 'intro', true );
        $vision = get_post_meta( $id, 'vision', true );
        $mission = get_post_meta( $id, 'mission', true );
        $hod_name = get_post_meta( $id, 'hod_name', true );
        $hod_title = get_post_meta( $id, 'hod_title', true );
        $hod_message = get_post_meta( $id, 'hod_message', true );
        $research = get_post_meta( $id, 'research', true );
        $partners = get_post_meta( $id, 'partners', true );
        $contact  = get_post_meta( $id, 'contact', true );
        $email = get_post_meta( $id, 'contact_email', true );
        $phone = get_post_meta( $id, 'contact_phone', true );

        $out = '';
        // Intro + at a glance.
        $out .= '<div class="fbsf-single">';
        if ( $tagline ) {
            $out .= '<p class="fbsf-dept-tagline">' . self::esc( $tagline ) . '</p>';
        }
        if ( $intro ) {
            $out .= '<p class="fbsf-single-intro">' . wp_kses_post( $intro ) . '</p>';
        }
        $out .= '<div class="fbsf-chips"><span class="fbsf-chip">' . self::esc( $abbr ?: 'Department' ) . '</span></div>';
        $out .= '</div>';

        // Vision & mission.
        if ( $vision || $mission ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:36px">Vision & Mission</h3><div class="fbsf-vm-grid">';
            $out .= self::card( '<div class="fbsf-vm"><span class="fbsf-vm-label">Vision</span><p>'
                . ( $vision ? wp_kses_post( $vision ) : '<em>Information not available.</em>' ) . '</p></div>', 'fbsf-vm-card fbsf-vm-card--vision' );
            $out .= self::card( '<div class="fbsf-vm"><span class="fbsf-vm-label">Mission</span><p>'
                . ( $mission ? wp_kses_post( $mission ) : '<em>Information not available.</em>' ) . '</p></div>', 'fbsf-vm-card fbsf-vm-card--mission' );
            $out .= '</div>';
        }

        // HOD message.
        if ( $hod_message ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:36px">Message from the Head of the Department</h3>';
            $out .= '<blockquote class="fbsf-dean">' . wp_kses_post( $hod_message ) . '</blockquote>';
            if ( $hod_name ) {
                $out .= '<p class="fbsf-dean-signature">' . self::esc( $hod_name )
                    . ( $hod_title ? ', ' . self::esc( $hod_title ) : '' ) . '</p>';
            }
        }

        // Programmes for this department.
        $q = new WP_Query( array(
            'post_type'      => 'fbsf_programme',
            'post_status'    => 'publish',
            'posts_per_page' => 20,
            'tax_query'      => array( array(
                'taxonomy' => 'fbsf_department',
                'field'    => 'slug',
                'terms'    => get_post_meta( $id, 'department_term', true ) ?: '',
            ) ),
        ) );
        if ( $q->have_posts() ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:36px">Academic Programmes</h3>';
            $out .= '<div class="fbsf-grid fbsf-grid--programmes">';
            while ( $q->have_posts() ) {
                $q->the_post();
                $out .= self::programme_card( get_the_ID() );
            }
            wp_reset_postdata();
            $out .= '</div>';
        }

        // Research.
        if ( $research ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:36px">Research Activities</h3>';
            $out .= '<p class="fbsf-single-intro">' . wp_kses_post( $research ) . '</p>';
        }

        // Partners.
        if ( is_array( $partners ) && ! empty( $partners ) ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:36px">Professional Partnerships & MoUs</h3><div class="fbsf-grid fbsf-grid--departments">';
            foreach ( $partners as $p ) {
                $pname  = isset( $p['name'] ) ? self::esc( $p['name'] ) : '';
                $pdetail = isset( $p['detail'] ) ? wp_kses_post( $p['detail'] ) : '';
                $out .= self::card( '<h4 class="fbsf-card-title">' . $pname . '</h4>'
                    . ( $pdetail ? '<p>' . $pdetail . '</p>' : '' ), 'fbsf-committee-card' );
            }
            $out .= '</div>';
        }

        // Contact.
        if ( $contact || $email || $phone ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:36px">Contact the Department</h3><div class="fbsf-contact-card">';
            if ( $contact ) {
                $out .= '<p class="fbsf-contact-line">' . wp_kses_post( $contact ) . '</p>';
            }
            if ( $email ) {
                $out .= '<p class="fbsf-contact-line"><strong>Email:</strong> <a href="mailto:' . esc_attr( $email ) . '">' . self::esc( $email ) . '</a></p>';
            }
            if ( $phone ) {
                $out .= '<p class="fbsf-contact-line"><strong>Phone:</strong> ' . self::esc( $phone ) . '</p>';
            }
            $out .= '</div>';
        }
        return $out;
    }

    /* ------------------------------------------------------------------
     * Single programme (dynamic single-page layout)
     * ------------------------------------------------------------------ */

    public static function programme_single() {
        global $post;
        if ( ! $post || 'fbsf_programme' !== $post->post_type ) {
            return '';
        }
        $id    = $post->ID;
        $out   = '';
        $summary  = get_post_meta( $id, 'summary', true );
        $desc     = get_post_meta( $id, 'description', true );
        $duration = get_post_meta( $id, 'duration', true );
        $credits  = get_post_meta( $id, 'credits', true );
        $fees     = get_post_meta( $id, 'fees', true );
        $deadline = get_post_meta( $id, 'deadline', true );
        $status   = get_post_meta( $id, 'deadline_status', true );
        $contact  = get_post_meta( $id, 'application_contact', true );
        $entry    = get_post_meta( $id, 'entry_requirements', true );
        $highlights = get_post_meta( $id, 'highlights', true );
        $structure = get_post_meta( $id, 'course_structure', true );
        $docs_note = get_post_meta( $id, 'documents_note', true );

        if ( $summary ) {
            $out .= '<p class="fbsf-single-intro">' . wp_kses_post( $summary ) . '</p>';
        }
        // Meta table.
        $meta = array(
            'Duration'  => $duration,
            'Credits'   => $credits,
            'Fees'      => $fees,
            'Deadline'  => $deadline ? $deadline . self::archived_badge( $status ) : '',
        );
        $meta_html = '';
        foreach ( $meta as $label => $value ) {
            if ( $value ) {
                $meta_html .= '<div class="fbsf-prog-meta-item"><strong>' . self::esc( $label ) . ':</strong> '
                    . ( $label === 'Deadline' ? $value : wp_kses_post( $value ) ) . '</div>';
            }
        }
        if ( $meta_html ) {
            $out .= '<div class="fbsf-prog-meta" style="margin-top:18px">' . $meta_html . '</div>';
        }

        if ( $desc ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:32px">Programme Description</h3><p>' . wp_kses_post( $desc ) . '</p>';
        }
        if ( $entry ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:32px">Entry Requirements</h3><p>' . wp_kses_post( $entry ) . '</p>';
        }
        if ( $highlights ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:32px">Programme Highlights</h3><p>' . wp_kses_post( $highlights ) . '</p>';
        }
        if ( is_array( $structure ) && ! empty( $structure ) ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:32px">Course Structure</h3>';
            $out .= '<table class="fbsf-table"><thead><tr><th>Semester</th><th>Course</th></tr></thead><tbody>';
            foreach ( $structure as $sem ) {
                $sem_name = isset( $sem['semester'] ) ? self::esc( $sem['semester'] ) : '';
                $courses  = isset( $sem['title'] ) ? wp_kses_post( $sem['title'] ) : '';
                $lines = preg_split( '/\r\n|\r|\n/', $courses );
                if ( $sem_name ) {
                    $out .= '<tr><td class="fbsf-table-sem" rowspan="' . max( 1, count( $lines ) ) . '">' . $sem_name . '</td>';
                    foreach ( $lines as $line ) {
                        if ( $line !== '' ) {
                            $out .= '<td class="fbsf-table-title">' . $line . '</td></tr><tr>';
                        }
                    }
                    $out = rtrim( $out, '<tr>' );
                } else {
                    foreach ( $lines as $line ) {
                        if ( $line !== '' ) {
                            $out .= '<tr><td class="fbsf-table-title">' . $line . '</td></tr>';
                        }
                    }
                }
            }
            $out .= '</tbody></table>';
        }
        if ( $docs_note ) {
            $out .= '<div class="fbsf-notice" style="margin-top:24px">' . wp_kses_post( $docs_note ) . '</div>';
        }
        if ( $contact ) {
            $out .= '<div class="fbsf-contact-card" style="margin-top:24px"><p class="fbsf-contact-line">' . wp_kses_post( $contact ) . '</p></div>';
        }
        return $out;
    }

    /* ------------------------------------------------------------------
     * Single journal (dynamic single-page layout)
     * ------------------------------------------------------------------ */

    public static function journal_single() {
        global $post;
        if ( ! $post || 'fbsf_journal' !== $post->post_type ) {
            return '';
        }
        $id     = $post->ID;
        $abbr   = get_post_meta( $id, 'abbreviation', true );
        $type   = get_post_meta( $id, 'type', true );
        $publisher = get_post_meta( $id, 'publisher', true );
        $issn   = get_post_meta( $id, 'issn', true );
        $freq   = get_post_meta( $id, 'frequency', true );
        $desc   = get_post_meta( $id, 'description', true );
        $latest = get_post_meta( $id, 'latest_issue', true );
        $submission = get_post_meta( $id, 'submission', true );
        $email  = get_post_meta( $id, 'email', true );
        $issues = get_post_meta( $id, 'issues', true );
        $editorial = get_post_meta( $id, 'editorial_board', true );

        $out = '<div class="fbsf-journal-meta-band">';
        if ( $issn ) { $out .= '<span class="fbsf-badge">ISSN: ' . self::esc( $issn ) . '</span>'; }
        if ( $freq ) { $out .= '<span class="fbsf-badge fbsf-badge--cat">' . self::esc( $freq ) . '</span>'; }
        if ( $type ) { $out .= '<span class="fbsf-badge fbsf-badge--green">' . self::esc( $type ) . '</span>'; }
        $out .= '</div>';
        if ( $publisher ) {
            $out .= '<p class="fbsf-single-intro"><strong>Publisher:</strong> ' . self::esc( $publisher ) . '</p>';
        }
        if ( $latest ) {
            $out .= '<p class="fbsf-single-intro"><strong>Latest issue:</strong> ' . self::esc( $latest ) . '</p>';
        }
        if ( $desc ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:28px">Aims & Scope</h3><p>' . wp_kses_post( $desc ) . '</p>';
        }
        if ( is_array( $issues ) && ! empty( $issues ) ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:28px">Published Issues</h3><ul class="fbsf-journal-issues">';
            foreach ( $issues as $issue ) {
                $yv = isset( $issue['year'] ) ? self::esc( $issue['year'] ) : '';
                $dv = isset( $issue['detail'] ) ? self::esc( $issue['detail'] ) : '';
                $out .= '<li>' . $yv . ( $dv ? ' — ' . $dv : '' ) . '</li>';
            }
            $out .= '</ul>';
        }
        if ( is_array( $editorial ) && ! empty( $editorial ) ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:28px">Editorial Board</h3><div class="fbsf-grid fbsf-grid--departments">';
            foreach ( $editorial as $member ) {
                $role = isset( $member['role'] ) ? self::esc( $member['role'] ) : '';
                $name = isset( $member['name'] ) ? self::esc( $member['name'] ) : '';
                $out .= self::card( '<h4 class="fbsf-card-title">' . $name . '</h4><p>' . $role . '</p>', 'fbsf-committee-card' );
            }
            $out .= '</div>';
        }
        if ( $submission ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:28px">Submission Guidelines</h3><p>' . wp_kses_post( $submission ) . '</p>';
        }
        if ( $email ) {
            $out .= '<p class="fbsf-contact-line"><strong>Submission email:</strong> <a href="mailto:' . esc_attr( $email ) . '">' . self::esc( $email ) . '</a></p>';
        }
        return $out;
    }

    /* ------------------------------------------------------------------
     * Single event (dynamic single-page layout)
     * ------------------------------------------------------------------ */

    public static function event_single() {
        global $post;
        if ( ! $post || 'fbsf_event' !== $post->post_type ) {
            return '';
        }
        $id    = $post->ID;
        return self::event_card( $id, 'event' );
    }

    /* ------------------------------------------------------------------
     * FQAC information block
     * ------------------------------------------------------------------ */

    public static function fqac_info() {
        $opts = FBSF_Options::get();
        $structure = $opts['fqac_structure'];
        $functions = $opts['fqac_functions'];
        $out = '';
        if ( $structure ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:28px">FQAC Structure</h3>';
            $lines = preg_split( '/\r\n|\r|\n/', $structure );
            $out .= '<ol class="fbsf-timeline">';
            foreach ( $lines as $line ) {
                if ( trim( $line ) !== '' ) {
                    $out .= '<li class="fbsf-timeline-item"><div class="fbsf-timeline-body"><p>' . wp_kses_post( $line ) . '</p></div></li>';
                }
            }
            $out .= '</ol>';
        }
        if ( $functions ) {
            $out .= '<h3 class="fbsf-section-title" style="margin-top:28px">What FQAC Does</h3>';
            $out .= '<p class="fbsf-single-intro">' . wp_kses_post( $functions ) . '</p>';
        }
        return $out;
    }
}
