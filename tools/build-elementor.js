#!/usr/bin/env node
/**
 * FBSF Elementor page generator.
 *
 * Reads migration/fbsf-content.json (verified site content) and generates:
 *   elementor/templates/header.json, footer.json, search-results.json
 *   elementor/templates/single-department.json, single-programme.json,
 *                    single-journal.json, single-event.json
 *   elementor/templates/reusable-*.json
 *   elementor/pages/*.json (9 landing pages)
 *   migration/fbsf-wp-import.json (options, terms, CPTs, pages, templates, menu)
 *
 * Image URLs use the {{child}} placeholder; the importer rewrites them to
 * the child theme URL at import time.
 */

'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const ROOT = '/home/user/BSF-Site';
const EL_DIR = path.join( ROOT, 'wordpress-project', 'elementor' );
const PAGES_DIR = path.join( EL_DIR, 'pages' );
const TPL_DIR = path.join( EL_DIR, 'templates' );

const D = require( path.join( ROOT, 'migration', 'fbsf-content.json' ) );

/* ------------------------------------------------------------------
 * Element builders
 * ------------------------------------------------------------------ */

let idc = 0;
const nid = () => 'b' + ( ++idc ).toString( 36 ).padStart( 6, '0' );

function section( settings, elements ) {
    return { id: nid(), elType: 'section', settings, elements: elements || [] };
}
function column( settings, elements ) {
    return { id: nid(), elType: 'column', settings, elements: elements || [] };
}
function widget( widgetType, settings ) {
    return { id: nid(), elType: 'widget', widgetType, settings: settings || {} };
}

function esc( s ) {
    return String( s || '' ).replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );
}

function wHeading( text, opts ) {
    opts = opts || {};
    return widget( 'heading', {
        title: text,
        header_size: opts.size || 'h2',
        alignment: opts.align || 'left',
        title_color: opts.color || '#161616',
        _title_color: opts.color || '#161616',
        _title_font_size: { unit: 'px', size: opts.sizePx || 28 },
    } );
}

function wText( html, opts ) {
    opts = opts || {};
    return widget( 'text-editor', {
        editor: html,
        alignment: opts.align || 'left',
        text_color: opts.color || '#2b2f36',
        _text_color: opts.color || '#2b2f36',
        _font_size: { unit: 'px', size: opts.sizePx || 15 },
    } );
}

function wButton( text, url, opts ) {
    opts = opts || {};
    return widget( 'button', {
        text,
        link: [ { url, is_external: '', target: '' } ],
        style: opts.style || 'solid',
        background_color: opts.bg || '#3db166',
        _background_color: opts.bg || '#3db166',
        text_color: opts.fg || '#ffffff',
        _text_color: opts.fg || '#ffffff',
        _border_radius: { unit: 'px', top: 12, right: 12, bottom: 12, left: 12 },
        _button_width: opts.width || 'auto',
    } );
}

function wImage( url, opts ) {
    opts = opts || {};
    return widget( 'image', {
        image: { id: 0, url },
        _image_size: 'full',
        _alignment: opts.align || 'center',
    } );
}

function wCounter( value, label ) {
    return widget( 'counter', {
        starting_number: value,
        suffix: '',
        prefix: '',
        title: label,
        _title_color: '#192f59',
        _starting_number_color: '#192f59',
        _title_font_size: { unit: 'px', size: 13 },
        _starting_number_font_size: { unit: 'px', size: 34 },
    } );
}

function wIconList( items ) {
    return widget( 'icon-list', {
        icon_list: items.map( ( it, i ) => ( {
            id: 'icon_' + i,
            icon: it.icon || 'fa fa-circle-info',
            tab: it.text || '',
        } ) ),
        icon_list_view_type: 'traditional',
        _icon_list_view_type: 'traditional',
    } );
}

function wForm() {
    return widget( 'form', {
        form_fields: [
            { id: 'field_name', type: 'text', label: 'Full name', required: 'yes', placeholder: 'Your name', inputType: 'text' },
            { id: 'field_email', type: 'email', label: 'Email address', required: 'yes', placeholder: 'you@example.com', inputType: 'email' },
            { id: 'field_phone', type: 'text', label: 'Phone', required: 'no', placeholder: 'Optional', inputType: 'tel' },
            { id: 'field_subject', type: 'text', label: 'Subject', required: 'no', placeholder: 'e.g. Programme enquiry', inputType: 'text' },
            { id: 'field_message', type: 'textarea', label: 'Message', required: 'yes', placeholder: 'Your message', inputType: 'textarea' },
        ],
        mailto: D.site.email || 'bsfoffice@wyb.ac.lk',
        submit_button_text: 'Send message',
        submit_button_background_color: '#3db166',
        _submit_button_background_color: '#3db166',
        submit_button_text_color: '#ffffff',
        _submit_button_text_color: '#ffffff',
        success_message: 'Thank you — your enquiry has been received by the faculty office.',
    } );
}

function wCustom( type, settings ) {
    return widget( type, settings || {} );
}

/* ------------------------------------------------------------------
 * Section builders
 * ------------------------------------------------------------------ */

function sHero( widgets ) {
    return section( {
        background_background: 'classic',
        _element_background_background: 'classic',
        background_color: '#192f59',
        _background_color: '#192f59',
        background_image: { id: 0, url: '{{child}}/assets/images/hero-pattern.svg' },
        _background_image: { id: 0, url: '{{child}}/assets/images/hero-pattern.svg' },
        background_position: 'center center',
        _background_position: 'center center',
        padding: { unit: 'px', top: '56', right: '40', bottom: '56', left: '40' },
        _padding: { unit: 'px', top: '56', right: '40', bottom: '56', left: '40' },
    }, [ column( { _element_width: '100' }, widgets ) ] );
}

function sWhite( widgets ) {
    return section( {
        background_background: 'classic',
        background_color: '#ffffff',
        _background_color: '#ffffff',
        padding: { unit: 'px', top: '44', right: '20', bottom: '44', left: '20' },
        _padding: { unit: 'px', top: '44', right: '20', bottom: '44', left: '20' },
    }, [ column( { _element_width: '100' }, widgets ) ] );
}

function sAlt( widgets ) {
    return section( {
        background_background: 'classic',
        background_color: '#f5f7fa',
        _background_color: '#f5f7fa',
        padding: { unit: 'px', top: '44', right: '20', bottom: '44', left: '20' },
        _padding: { unit: 'px', top: '44', right: '20', bottom: '44', left: '20' },
    }, [ column( { _element_width: '100' }, widgets ) ] );
}

function pageHero( title, sub, crumb ) {
    const items = [];
    if ( crumb ) {
        items.push( wText( '<div class="fbsf-breadcrumb"><a href="/">Home</a> / ' + esc( crumb ) + '</div>',
            { color: 'rgba(255,255,255,0.7)', sizePx: 13 } ) );
    }
    items.push( wHeading( title, { size: 'h1', sizePx: 34, color: '#ffffff' } ) );
    if ( sub ) {
        items.push( wText( '<p style="color:rgba(255,255,255,0.88)">' + esc( sub ) + '</p>',
            { color: 'rgba(255,255,255,0.88)', sizePx: 16 } ) );
    }
    return sHero( items );
}

function sSectionHeading( eyebrow, title, sub ) {
    const items = [];
    if ( eyebrow ) {
        items.push( wText( '<span class="fbsf-section-eyebrow">' + esc( eyebrow ) + '</span>' ) );
    }
    items.push( wHeading( title, { size: 'h2', sizePx: 28 } ) );
    if ( sub ) {
        items.push( wText( '<p class="fbsf-section-sub">' + esc( sub ) + '</p>' ) );
    }
    return section( {
        padding: { unit: 'px', top: '44', right: '20', bottom: '8', left: '20' },
        _padding: { unit: 'px', top: '44', right: '20', bottom: '8', left: '20' },
    }, [ column( { _element_width: '100' }, items ) ] );
}

function sContactStrip() {
    const email = D.site.email || 'bsfoffice@wyb.ac.lk';
    const tel = D.site.tel || '+94 37 228 4215';
    return section( {
        background_background: 'classic',
        background_color: '#192f59',
        _background_color: '#192f59',
        padding: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40' },
        _padding: { unit: 'px', top: '40', right: '40', bottom: '40', left: '40' },
    }, [
        column( { _element_width: '50' }, [
            wHeading( 'Need help?', { size: 'h3', color: '#ffffff', sizePx: 22 } ),
            wText( '<p style="color:rgba(255,255,255,0.85)">Contact the faculty office for programme enquiries, applications and general information.</p>',
                { color: 'rgba(255,255,255,0.85)' } ),
        ] ),
        column( { _element_width: '25' }, [
            wText( '<strong style="color:#ffffff">Telephone</strong><br>' + esc( tel ), { color: '#ffffff' } ),
        ] ),
        column( { _element_width: '25' }, [
            wButton( 'Email the office', 'mailto:' + email, { bg: '#3db166' } ),
        ] ),
    ] );
}

function notice( text, kind ) {
    return section( {
        background_background: 'classic',
        background_color: '#ffffff',
        _background_color: '#ffffff',
        padding: { unit: 'px', top: '12', right: '20', bottom: '24', left: '20' },
        _padding: { unit: 'px', top: '12', right: '20', bottom: '24', left: '20' },
    }, [ column( { _element_width: '100' }, [
        wText( '<div class="fbsf-notice ' + ( kind === 'archived' ? 'fbsf-notice--archived' : '' ) + '">'
            + esc( text ) + '</div>' ),
    ] ) ] );
}

/* ------------------------------------------------------------------
 * Page definitions
 * ------------------------------------------------------------------ */

function buildHome() {
    const els = [];
    const site = D.site;

    // Hero: left text + right campus art.
    els.push( section( {
        background_background: 'classic',
        _element_background_background: 'classic',
        background_color: '#192f59',
        _background_color: '#192f59',
        background_image: { id: 0, url: '{{child}}/assets/images/hero-pattern.svg' },
        _background_image: { id: 0, url: '{{child}}/assets/images/hero-pattern.svg' },
        background_position: 'center center',
        _background_position: 'center center',
        padding: { unit: 'px', top: '64', right: '40', bottom: '40', left: '40' },
        _padding: { unit: 'px', top: '64', right: '40', bottom: '40', left: '40' },
    }, [
        column( { _element_width: '55' }, [
            wText( '<span style="background:rgba(61,177,102,0.18);color:#7ee2b0;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">'
                + esc( site.university ) + '</span>' ),
            wHeading( site.name, { size: 'h1', sizePx: 38, color: '#ffffff' } ),
            wText( '<p style="color:rgba(255,255,255,0.88);font-size:17px">'
                + esc( site.site_motto || site.motto || 'Building Tomorrow’s Business & Finance Leaders' ) + '</p>' ),
            wText( '<p style="color:rgba(255,255,255,0.75);margin-top:10px">'
                + esc( site.established ? 'Established ' + site.established : '' ) + ' · ' + esc( site.postal || site.location || '' ) + '</p>' ),
            wButton( 'Explore Programmes', '/programmes/', { bg: '#3db166' } ),
            wButton( 'Visit Departments', '/departments/', { style: 'outline', bg: 'transparent', fg: '#ffffff' } ),
        ] ),
        column( { _element_width: '45' }, [
            wImage( '{{child}}/assets/images/campus-art.svg' ),
        ] ),
    ] ) );

    // Stats band.
    els.push( section( {
        background_background: 'classic',
        background_color: '#ffffff',
        _background_color: '#ffffff',
        padding: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20' },
        _padding: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20' },
    }, [ column( { _element_width: '100' }, [
        column( { _element_width: '25' }, [ wCounter( 4, 'Academic Departments' ) ] ),
        column( { _element_width: '25' }, [ wCounter( 10, 'Academic Programmes' ) ] ),
        column( { _element_width: '25' }, [ wCounter( 7, 'Research Journals' ) ] ),
        column( { _element_width: '25' }, [ wCounter( 3, 'Annual Research Symposia' ) ] ),
    ] ) ] ) );

    // Current-status notice.
    els.push( notice( site.noteCurrent || 'All content is verified against faculty documentation.' ) );

    // Vision & Mission.
    els.push( sSectionHeading( 'Who we are', 'Vision & Mission' ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'vision_mission' } ) ] ) );

    // About the Faculty.
    els.push( sSectionHeading( 'The Faculty', 'About the Faculty',
        'A leading faculty in business studies and finance at Wayamba University of Sri Lanka.' ) );
    els.push( sWhite( [
        wText( '<p>The Faculty of Business Studies and Finance (FBSF) is one of the academic faculties of Wayamba University of Sri Lanka, offering undergraduate, postgraduate, diploma and external programmes across accountancy, banking and finance, business management, and insurance and valuation. The faculty is committed to excellence in teaching, research and industry engagement.</p>' ),
        wText( '<p>Established in 1999, the faculty continues to build tomorrow’s business and finance leaders through quality education and research that connects academia with industry.</p>' ),
        wButton( 'Read about our history', '/about/', { style: 'outline', bg: 'transparent', fg: '#192f59' } ),
    ] ) );

    // Dean's message.
    els.push( sSectionHeading( 'Leadership', "Dean's Message" ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'dean_message' } ) ] ) );

    // Departments.
    els.push( sSectionHeading( 'Four academic departments', 'Departments of the Faculty' ) );
    els.push( sWhite( [ wCustom( 'fbsf-department-cards', { 'fbsf_department-cards_limit': '4' } ) ] ) );

    // Programmes.
    els.push( sSectionHeading( 'Degrees, diplomas & external programmes', 'Academic Programmes' ) );
    els.push( sWhite( [ wCustom( 'fbsf-programme-cards', { 'fbsf_programme-cards_limit': '6' } ) ] ) );
    els.push( sWhite( [ wButton( 'View all programmes', '/programmes/', { style: 'outline', bg: 'transparent', fg: '#192f59' } ) ] ) );

    // Research.
    els.push( sSectionHeading( 'Research that connects academia & industry', 'Research & Publications' ) );
    els.push( sWhite( [ wCustom( 'fbsf-journal-cards', { 'fbsf_journal-cards_limit': '4' } ) ] ) );
    els.push( sWhite( [ wButton( 'Explore publications', '/publications/', { style: 'outline', bg: 'transparent', fg: '#192f59' } ) ] ) );

    // Announcements.
    els.push( sSectionHeading( 'Latest news & announcements', 'Announcements' ) );
    els.push( sWhite( [ wCustom( 'fbsf-announcements', { 'fbsf_announcements_limit': '6' } ) ] ) );
    els.push( notice( 'All deadlines and events listed are historical and retained for reference.', 'archived' ) );

    // Quick links.
    els.push( sSectionHeading( 'Find what you need', 'Quick Access' ) );
    els.push( sWhite( [ wCustom( 'fbsf-quick-links' ) ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildAbout() {
    const els = [];
    els.push( pageHero( 'About the Faculty',
        'History, vision, mission and the leadership of the Faculty of Business Studies and Finance.', 'About' ) );

    els.push( sSectionHeading( 'Since 1999', 'History & Establishment' ) );
    els.push( sWhite( [
        wText( '<p>The Faculty of Business Studies and Finance was established in 1999 as an academic faculty of Wayamba University of Sri Lanka. It was established by the Government Notification in the Extraordinary Gazette No. 1093/8 of Tuesday, 17 August 1999, and commenced operations on 01 October 1999.</p>' ),
        wText( '<p>The faculty offers a range of undergraduate, postgraduate, diploma and external programmes across four academic departments: Accountancy, Banking & Finance, Business Management, and Insurance & Valuation.</p>' ),
    ] ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'history' } ) ] ) );

    els.push( sSectionHeading( 'Our direction', 'Vision & Mission' ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'vision_mission' } ) ] ) );

    els.push( sSectionHeading( 'The faculty at a glance', 'Faculty Overview' ) );
    els.push( sAlt( [
        column( { _element_width: '25' }, [ wCounter( 4, 'Departments' ) ] ),
        column( { _element_width: '25' }, [ wCounter( 10, 'Programmes' ) ] ),
        column( { _element_width: '25' }, [ wCounter( 7, 'Journals' ) ] ),
        column( { _element_width: '25' }, [ wCounter( 3, 'Symposia' ) ] ),
    ] ) );
    els.push( sWhite( [ wCustom( 'fbsf-department-cards', { 'fbsf_department-cards_limit': '4' } ) ] ) );

    els.push( sSectionHeading( 'Leadership', "Dean's Message" ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'dean_message' } ) ] ) );

    els.push( sSectionHeading( 'Administration', 'Academic & Administrative Structure' ) );
    els.push( sWhite( [
        wText( '<p>The Faculty Quality Assurance Cell (FQAC) coordinates quality assurance activities for the faculty in liaison with the Centre for Quality Assurance (CQA) of the university, working with the Quality Assurance Units of the four academic departments.</p>' ),
        wText( '<p>The faculty operates a number of standing committees that oversee curriculum, research, teaching and learning, and student–staff liaison.</p>' ),
    ] ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'committees' } ) ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildDepartments() {
    const els = [];
    els.push( pageHero( 'Departments of the Faculty',
        'Four academic departments offering undergraduate, postgraduate, diploma and external programmes.', 'Departments' ) );

    els.push( sSectionHeading( 'Our departments', 'Explore the Faculty' ) );
    els.push( sWhite( [ wCustom( 'fbsf-department-cards', { 'fbsf_department-cards_limit': '4' } ) ] ) );

    els.push( sSectionHeading( 'Programmes', 'Find a Programme' ) );
    els.push( sWhite( [
        wText( '<p>The faculty offers 10 academic programmes across the four departments — undergraduate degrees, diplomas, higher diplomas, advanced certificates and external programmes. Use the programme directory to explore categories, departments and course structures.</p>' ),
        wButton( 'Open the programme directory', '/programmes/' ),
    ] ) );

    els.push( sSectionHeading( 'Quality assurance', 'Departmental Quality Assurance Units' ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'qa_units' } ) ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildProgrammes() {
    const els = [];
    els.push( pageHero( 'Academic Programmes',
        'Undergraduate, postgraduate, diploma, higher diploma, advanced certificate and external programmes — filter by category, department or keyword.', 'Programmes' ) );

    els.push( sWhite( [ wCustom( 'fbsf-programme-filter', { 'fbsf_programme-filter_columns': '3' } ) ] ) );
    els.push( notice( 'All application deadlines listed are historical and retained for reference. Contact the faculty office for current intake information.', 'archived' ) );

    els.push( sSectionHeading( 'Applications', 'How to Apply' ) );
    els.push( sWhite( [
        column( { _element_width: '33' }, [
            wHeading( '1', { size: 'h3', sizePx: 24, color: '#192f59' } ),
            wText( '<p><strong>Check Requirements</strong><br>Review the entry requirements for your chosen programme in the details below each programme card.</p>' ),
        ] ),
        column( { _element_width: '33' }, [
            wHeading( '2', { size: 'h3', sizePx: 24, color: '#192f59' } ),
            wText( '<p><strong>Obtain the Application Form</strong><br>Application forms and documents can be requested from the faculty office via email.</p>' ),
        ] ),
        column( { _element_width: '33' }, [
            wHeading( '3', { size: 'h3', sizePx: 24, color: '#192f59' } ),
            wText( '<p><strong>Submit & Enquire</strong><br>Submit the completed form and contact the relevant department or faculty office for confirmation.</p>' ),
        ] ),
    ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildResearch() {
    const els = [];
    els.push( pageHero( 'Research & Publications Portal',
        'Journals, research symposia and submission guidelines for the Faculty of Business Studies and Finance.', 'Research' ) );

    els.push( sSectionHeading( 'A faculty committed to research excellence', 'Research Culture' ) );
    els.push( sWhite( [
        wText( '<p>The faculty promotes research that connects academia with industry. Faculty members publish in refereed journals, present at annual research symposia, and engage with professional bodies and industry partners.</p>' ),
        wText( '<p>Research areas include accounting, banking, finance, insurance, valuation, risk management, business management, entrepreneurship and digital transformation.</p>' ),
        wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'research_areas' } ),
    ] ) );

    els.push( sSectionHeading( 'Journals & magazines', 'Publications' ) );
    els.push( sWhite( [ wCustom( 'fbsf-journal-cards', { 'fbsf_journal-cards_limit': '7' } ) ] ) );
    els.push( sWhite( [ wButton( 'Open the publications page', '/publications/', { style: 'outline', bg: 'transparent', fg: '#192f59' } ) ] ) );

    els.push( sSectionHeading( 'Annual research symposia', 'Research Symposia' ) );
    els.push( sWhite( [ wCustom( 'fbsf-events', { 'fbsf_events_type': 'research-symposium', 'fbsf_events_limit': '3' } ) ] ) );

    els.push( sSectionHeading( 'Submissions', 'Submission Guidelines at a Glance' ) );
    els.push( sWhite( [ wCustom( 'fbsf-journal-submissions' ) ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildPublications() {
    const els = [];
    els.push( pageHero( 'Publications',
        'The faculty’s research journals and magazines — ISSNs, issues, editorial information and searchable article listings.', 'Publications' ) );

    els.push( sSectionHeading( 'Journals', 'Research Journals' ) );
    els.push( sWhite( [ wCustom( 'fbsf-journal-tabs' ) ] ) );

    els.push( sSectionHeading( 'Article index', 'Search Articles' ) );
    els.push( sWhite( [ wCustom( 'fbsf-article-search' ) ] ) );

    els.push( sSectionHeading( 'Submissions', 'Submission Information' ) );
    els.push( sWhite( [ wCustom( 'fbsf-journal-submissions' ) ] ) );
    els.push( notice( 'All submission deadlines listed are historical and retained for reference.' , 'archived' ) );

    els.push( sContactStrip() );
    return els;
}

function buildEvents() {
    const els = [];
    els.push( pageHero( 'Events & Research Symposia',
        'ARSYM, SACFIRE and SyBFin — themes, tracks, keynotes, committees and proceedings.', 'Events' ) );
    els.push( notice( 'All events and calls for papers listed on this page are historical and retained for reference.', 'archived' ) );

    els.push( sSectionHeading( 'Symposium details', 'Research Symposia' ) );
    els.push( sWhite( [ wCustom( 'fbsf-events', { 'fbsf_events_type': 'research-symposium', 'fbsf_events_limit': '3' } ) ] ) );

    els.push( sSectionHeading( 'Programme announcements', 'Archived Announcements' ) );
    els.push( sWhite( [ wCustom( 'fbsf-announcements', { 'fbsf_announcements_limit': '10' } ) ] ) );

    els.push( sSectionHeading( 'Proceedings', 'Symposium Proceedings' ) );
    els.push( sWhite( [ wCustom( 'fbsf-downloads', { 'fbsf_downloads_limit': '10' } ) ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildAuthorities() {
    const els = [];
    els.push( pageHero( 'Authorities & Administrative Information',
        'Faculty Quality Assurance Cell, departmental quality assurance units, committees and resources.', 'Authorities' ) );

    els.push( sSectionHeading( 'Quality assurance', 'Faculty Quality Assurance Cell (FQAC)' ) );
    els.push( sWhite( [
        wText( '<p>The Faculty Quality Assurance Cell (FQAC) coordinates quality assurance activities for the improvement of the overall performance of the faculty, in liaison with the Centre for Quality Assurance (CQA) of the university.</p>' ),
        wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'fqac' } ),
    ] ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'committees' } ) ] ) );

    els.push( sSectionHeading( 'Departmental units', 'Department Quality Assurance Units' ) );
    els.push( sWhite( [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'qa_units' } ) ] ) );

    els.push( sSectionHeading( 'Resources', 'Downloads' ) );
    els.push( sWhite( [ wCustom( 'fbsf-downloads', { 'fbsf_downloads_limit': '10' } ) ] ) );

    els.push( sSectionHeading( 'External', 'Useful Links' ) );
    const links = ( D.authorities && D.authorities.links ) || [];
    els.push( sWhite( [
        wIconList( links.map( ( l ) => ( { text: l.label + ' — ' + l.href, icon: 'fa fa-link' } ) ) ),
    ] ) );

    els.push( sContactStrip() );
    return els;
}

function buildContact() {
    const els = [];
    els.push( pageHero( 'Contact Us',
        'Addresses, telephone numbers, email addresses and an enquiry form for the faculty and its departments.', 'Contact' ) );

    els.push( sSectionHeading( 'Who to contact', 'Contact Information' ) );
    els.push( sWhite( [ wCustom( 'fbsf-contact-cards' ) ] ) );

    els.push( sSectionHeading( 'Location & hours', 'Visit Us' ) );
    els.push( sWhite( [
        column( { _element_width: '50' }, [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'visit_us' } ) ] ),
        column( { _element_width: '50' }, [ wCustom( 'fbsf-site-content', { 'fbsf_site-content_block': 'office_hours' } ) ] ),
    ] ) );

    els.push( sSectionHeading( 'Send us a message', 'Enquiry Form' ) );
    els.push( sWhite( [
        wText( '<p>Programme & general enquiries can be sent using the form below. Please include your name, email and the subject of your enquiry.</p>' ),
        wForm(),
    ] ) );

    els.push( sSectionHeading( 'Frequently asked questions', 'FAQ' ) );
    els.push( sWhite( [ wCustom( 'fbsf-faq' ) ] ) );

    els.push( sContactStrip() );
    return els;
}

/* ------------------------------------------------------------------
 * Header / Footer / Single templates
 * ------------------------------------------------------------------ */

function buildHeader() {
    const site = D.site;
    const email = site.email || 'bsfoffice@wyb.ac.lk';
    const tel = site.tel || '+94 37 228 4215';

    // Topbar.
    const topbar = section( {
        background_background: 'classic',
        background_color: '#192f59',
        _background_color: '#192f59',
        padding: { unit: 'px', top: '8', right: '20', bottom: '8', left: '20' },
        _padding: { unit: 'px', top: '8', right: '20', bottom: '8', left: '20' },
    }, [
        column( { _element_width: '50' }, [
            wText( '<span style="color:rgba(255,255,255,0.9)"><strong>Tel:</strong> ' + esc( tel ) + '</span>',
                { color: 'rgba(255,255,255,0.9)', sizePx: 13 } ),
        ] ),
        column( { _element_width: '50' }, [
            wText( '<span style="color:rgba(255,255,255,0.9)"><strong>Email:</strong> <a href="mailto:' + esc( email ) + '" style="color:rgba(255,255,255,0.9)">' + esc( email ) + '</a></span>',
                { color: 'rgba(255,255,255,0.9)', sizePx: 13, align: 'right' } ),
        ] ),
    ] );

    // Main header.
    const mainHeader = section( {
        background_background: 'classic',
        background_color: '#ffffff',
        _background_color: '#ffffff',
        padding: { unit: 'px', top: '14', right: '20', bottom: '14', left: '20' },
        _padding: { unit: 'px', top: '14', right: '20', bottom: '14', left: '20' },
    }, [
        column( { _element_width: '30' }, [
            wImage( '{{child}}/assets/images/logo.svg' ),
            wHeading( site.name, { size: 'h3', sizePx: 16, color: '#192f59' } ),
        ] ),
        column( { _element_width: '45' }, [
            widget( 'nav-menu', {
                menu: 0,
                alignment: 'left',
                menu_type: 'horizontal',
                _menu__color: '#192f59',
            } ),
        ] ),
        column( { _element_width: '25' }, [
            wButton( 'Search', '/search/', { style: 'outline', bg: 'transparent', fg: '#192f59', width: 'fit-content' } ),
        ] ),
    ] );

    return [ topbar, mainHeader ];
}

function buildFooter() {
    const site = D.site;
    const email = site.email || 'bsfoffice@wyb.ac.lk';
    const tel = site.tel || '+94 37 228 4215';
    const address = site.postal || site.location || 'Kuliyapitiya, Sri Lanka';
    const links = ( D.authorities && D.authorities.links ) || [];

    const quickLinks = [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about/' },
        { label: 'Departments', url: '/departments/' },
        { label: 'Programmes', url: '/programmes/' },
        { label: 'Research', url: '/research/' },
        { label: 'Publications', url: '/publications/' },
        { label: 'Events', url: '/events/' },
        { label: 'Authorities', url: '/authorities/' },
        { label: 'Contact', url: '/contact/' },
    ];

    const leftHtml = '<a href="' + quickLinks[0].url + '">' + quickLinks[0].label + '</a><br>'
        + quickLinks.slice( 1 ).map( ( l ) => '<a href="' + l.url + '">' + l.label + '</a><br>' ).join( '' );

    const usefulHtml = links.map( ( l ) => '<a href="' + l.href + '" target="_blank" rel="noopener">' + l.label + '</a><br>' ).join( '' );

    const brandHtml = '<strong style="color:#ffffff">' + esc( site.name ) + '</strong><br>'
        + '<span style="color:#ababab">' + esc( site.university || 'Wayamba University of Sri Lanka' ) + '</span><br>'
        + '<span style="color:#ababab">' + esc( address ) + '</span>';

    const contactHtml = '<strong style="color:#ffffff">Telephone</strong><br>' + esc( tel ) + '<br>'
        + '<strong style="color:#ffffff">Email</strong><br><a href="mailto:' + esc( email ) + '" style="color:#ababab">' + esc( email ) + '</a><br>'
        + '<strong style="color:#ffffff">Useful Links</strong><br>' + usefulHtml;

    const main = section( {
        background_background: 'classic',
        background_color: '#181818',
        _background_color: '#181818',
        padding: { unit: 'px', top: '44', right: '20', bottom: '24', left: '20' },
        _padding: { unit: 'px', top: '44', right: '20', bottom: '24', left: '20' },
    }, [
        column( { _element_width: '33' }, [
            wImage( '{{child}}/assets/images/logo.svg' ),
            wText( brandHtml, { color: '#ababab' } ),
        ] ),
        column( { _element_width: '33' }, [
            wHeading( 'Quick Links', { size: 'h4', sizePx: 16, color: '#ffffff' } ),
            wText( leftHtml, { color: '#ababab', sizePx: 14 } ),
        ] ),
        column( { _element_width: '33' }, [
            wText( contactHtml, { color: '#ababab', sizePx: 14 } ),
        ] ),
    ] );

    const bottom = section( {
        background_background: 'classic',
        background_color: '#181818',
        _background_color: '#181818',
        padding: { unit: 'px', top: '16', right: '20', bottom: '16', left: '20' },
        _padding: { unit: 'px', top: '16', right: '20', bottom: '16', left: '20' },
        border: { unit: 'px', top: '1', right: '0', bottom: '0', left: '0' },
        border_color: 'rgba(255,255,255,0.12)',
        _border_color: 'rgba(255,255,255,0.12)',
    }, [ column( { _element_width: '100' }, [
        wText( '<span style="color:#7a7a7a">© 2026 Faculty of Business Studies and Finance. All rights reserved.</span>',
            { color: '#7a7a7a', sizePx: 13 } ),
    ] ) ] );

    return [ main, bottom ];
}

function buildSearchResults() {
    return [
        sWhite( [
            wHeading( 'Search results', { size: 'h1', sizePx: 30 } ),
            wText( '<p>Search across the faculty website — pages, programmes, journals, articles and events.</p>' ),
        ] ),
        sWhite( [ wCustom( 'fbsf-search-results' ) ] ),
    ];
}

/* Single-page templates (dynamic content via shortcode widgets) */

function buildSingleDepartment() {
    return [
        sSectionHeading( '', 'Department Details' ),
        sWhite( [ wCustom( 'fbsf-department-single' ) ] ),
        sContactStrip(),
    ];
}

function buildSingleProgramme() {
    return [
        sSectionHeading( '', 'Programme Details' ),
        sWhite( [ wCustom( 'fbsf-programme-single' ) ] ),
        sContactStrip(),
    ];
}

function buildSingleJournal() {
    return [
        sSectionHeading( '', 'Journal Details' ),
        sWhite( [ wCustom( 'fbsf-journal-single' ) ] ),
        sWhite( [ wCustom( 'fbsf-article-search' ) ] ),
        sContactStrip(),
    ];
}

function buildSingleEvent() {
    return [
        sSectionHeading( '', 'Event Details' ),
        sWhite( [ wCustom( 'fbsf-event-single' ) ] ),
        sContactStrip(),
    ];
}

/* ------------------------------------------------------------------
 * Reusable templates
 * ------------------------------------------------------------------ */

function buildReusable() {
    const list = [];
    list.push( {
        title: 'FBSF — Department Card',
        content: [ section( {
            background_background: 'classic',
            background_color: '#ffffff',
            _background_color: '#ffffff',
            padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
            _padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
        }, [ column( { _element_width: '100' }, [ wCustom( 'fbsf-department-cards', { 'fbsf_department-cards_limit': '4' } ) ] ) ] ) ]
    } );
    list.push( {
        title: 'FBSF — Programme Card',
        content: [ section( {
            background_background: 'classic',
            background_color: '#ffffff',
            _background_color: '#ffffff',
            padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
            _padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
        }, [ column( { _element_width: '100' }, [ wCustom( 'fbsf-programme-cards', { 'fbsf_programme-cards_limit': '6' } ) ] ) ] ) ]
    } );
    list.push( {
        title: 'FBSF — Journal Card',
        content: [ section( {
            background_background: 'classic',
            background_color: '#ffffff',
            _background_color: '#ffffff',
            padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
            _padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
        }, [ column( { _element_width: '100' }, [ wCustom( 'fbsf-journal-cards' ) ] ) ] ) ]
    } );
    list.push( {
        title: 'FBSF — Event Card',
        content: [ section( {
            background_background: 'classic',
            background_color: '#ffffff',
            _background_color: '#ffffff',
            padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
            _padding: { unit: 'px', top: '20', right: '16', bottom: '20', left: '16' },
        }, [ column( { _element_width: '100' }, [ wCustom( 'fbsf-events', { 'fbsf_events_type': 'research-symposium', 'fbsf_events_limit': '3' } ) ] ) ] ) ]
    } );
    list.push( {
        title: 'FBSF — Stat Band',
        content: [ section( {
            background_background: 'classic',
            background_color: '#ffffff',
            _background_color: '#ffffff',
            padding: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20' },
            _padding: { unit: 'px', top: '32', right: '20', bottom: '32', left: '20' },
        }, [ column( { _element_width: '100' }, [
            column( { _element_width: '25' }, [ wCounter( 4, 'Departments' ) ] ),
            column( { _element_width: '25' }, [ wCounter( 10, 'Programmes' ) ] ),
            column( { _element_width: '25' }, [ wCounter( 7, 'Journals' ) ] ),
            column( { _element_width: '25' }, [ wCounter( 3, 'Symposia' ) ] ),
        ] ) ] ) ]
    } );
    list.push( {
        title: 'FBSF — Contact Strip',
        content: [ sContactStrip() ],
    } );
    return list;
}

/* ------------------------------------------------------------------
 * Import payload
 * ------------------------------------------------------------------ */

function buildOptions() {
    const site = D.site;
    const opts = {
        site_name: site.name || 'Faculty of Business Studies and Finance',
        site_short: site.shortName || 'FBSF',
        site_motto: site.site_motto || site.motto || 'Building Tomorrow’s Business & Finance Leaders',
        university: site.university || 'Wayamba University of Sri Lanka',
        established: '1999',
        address: site.postal || '60200, Kuliyapitiya, Sri Lanka',
        tel: site.tel || '+94 37 228 4215',
        email: site.email || 'bsfoffice@wyb.ac.lk',
        dean_name: site.dean || 'Professor SK Gamage',
        dean_title: 'Dean',
        dean_message: ( site.deanMessage || 'The Faculty of Business Studies and Finance is committed to building tomorrow’s business and finance leaders through quality education, research excellence and strong industry engagement. We welcome you to explore our programmes, journals and symposia.' ),
        vision: site.vision || '',
        mission: site.mission || '',
        history_intro: 'The Faculty of Business Studies and Finance was established in 1999 as an academic faculty of Wayamba University of Sri Lanka.',
        history_timeline: [
            { date: '17 August 1999', title: 'Gazette notification', text: 'Government Notification in the Extraordinary Gazette No. 1093/8 of Tuesday, 17 August 1999.' },
            { date: '01 October 1999', title: 'Faculty established', text: 'The Faculty of Business Studies and Finance commenced operations.' },
            { date: '2014', title: 'Journal renaming', text: 'The Journal of Accountancy & Finance (JAF) was renamed in 2014.' },
            { date: '2021', title: 'Journals', text: 'The faculty’s research journals and symposium publications continued from 2021.' },
        ],
        stats: [],
        quick_links: D.quick_links.map( ( q ) => ( {
            title: q.label,
            url: q.href.replace( '.html', '/' ),
            icon: 'book',
        } ) ),
        contact_groups: D.contacts.map( ( c ) => ( {
            group: c.group,
            contact: ( c.items || [] ).filter( ( i ) => i.icon === 'icon-users' ).map( ( i ) => i.value ).join( ', ' ),
            email: ( c.items || [] ).filter( ( i ) => i.icon === 'icon-mail' ).map( ( i ) => i.value ).join( ', ' ),
            phone: ( c.items || [] ).filter( ( i ) => i.icon === 'icon-phone' ).map( ( i ) => i.value ).join( ', ' ),
        } ) ),
        faqs: D.faqs.map( ( f ) => ( { question: f.q, answer: f.a } ) ),
        research_areas: [
            'Accounting', 'Banking', 'Finance', 'Insurance', 'Valuation',
            'Risk Management', 'Business Management', 'Entrepreneurship', 'Digital Transformation',
        ],
        office_hours: 'The faculty office operates from 8:30 a.m. to 4:30 p.m., Monday to Friday. Public holidays are observed.',
        fqac_structure: ( D.authorities && D.authorities.fqac && D.authorities.fqac.structure )
            ? D.authorities.fqac.structure.join( '\n' )
            : '',
        fqac_functions: ( D.authorities && D.authorities.fqac && D.authorities.fqac.ultimate )
            ? D.authorities.fqac.ultimate
            : '',
        fqac_committees: ( D.authorities && D.authorities.committees )
            ? D.authorities.committees.map( ( c ) => ( { title: c, text: '' } ) )
            : [],
    };
    return opts;
}

function buildDepartmentCPTs() {
    return D.departments.map( ( d ) => {
        const partners = ( d.industry && d.industry.items )
            ? d.industry.items.map( ( t ) => ( { name: '', detail: t } ) )
            : [];
        return {
            slug: d.slug,
            title: d.name,
            excerpt: d.tagline || '',
            content: d.intro || '',
            menu_order: 0,
            meta: {
                abbreviation: d.short || '',
                tagline: d.tagline || '',
                intro: d.intro || '',
                vision: d.vision || '',
                mission: d.mission || '',
                hod_name: d.hodName || '',
                hod_title: d.hodTitle || '',
                hod_message: d.hodMessage || '',
                research: d.research || '',
                contact: d.contact || '',
                contact_email: '',
                contact_phone: '',
                partners: partners,
            },
            terms: { fbsf_department: [ d.slug ] },
        };
    } );
}

function buildProgrammeCPTs() {
    return D.programmes.map( ( p ) => {
        const entryItems = ( p.entry || [] ).map( ( t ) => ( { text: t } ) );
        const structure = ( p.structure || [] ).map( ( sem ) => ( {
            semester: sem.semester || '',
            code: '',
            title: ( sem.courses || [] ).join( '\n' ),
            credits: '',
        } ) );
        return {
            slug: p.id,
            title: p.name,
            excerpt: p.summary || '',
            content: p.description || '',
            menu_order: 0,
            meta: {
                code: '',
                category_term: p.category,
                department_term: p.departmentSlug,
                summary: p.summary || '',
                description: p.description || '',
                duration: p.duration || '',
                credits: p.credits || '',
                slqf_level: '',
                fees: p.fees || '',
                deadline: ( p.deadline || '' ).replace( ' — concluded', '' ),
                deadline_status: 'historical',
                application_contact: p.contact || '',
                entry_requirements: ( p.entry || [] ).join( '\n' ),
                highlights: '',
                documents_note: 'Application forms and documents can be requested from the faculty office.',
                entry_items: entryItems,
                course_structure: structure,
            },
            terms: {
                fbsf_programme_category: [ p.category ],
                fbsf_department: [ p.departmentSlug ],
            },
        };
    } );
}

function buildJournalCPTs() {
    return D.publications.map( ( j ) => {
        const issues = ( j.issues || [] ).map( ( t ) => ( { year: '', detail: t } ) );
        const editorial = ( j.editorial && ! /not provided|not available/i.test( j.editorial ) )
            ? [ { role: 'Editorial Board', name: j.editorial } ]
            : [];
        const journalType = j.type || 'Journal';
        return {
            slug: j.abbr.toLowerCase(),
            title: j.name,
            excerpt: j.short || '',
            content: j.description || '',
            menu_order: 0,
            meta: {
                abbreviation: j.abbr,
                type: journalType,
                publisher: j.publisher || '',
                issn: j.issn || '',
                frequency: j.frequency || '',
                description: j.description || '',
                submission: j.submission || '',
                email: j.email || '',
                latest_issue: j.latestIssue || '',
                issues: issues,
                editorial_board: editorial,
            },
            terms: { fbsf_journal_type: [ journalType ] },
        };
    } );
}

function buildArticleCPTs() {
    const out = [];
    D.publications.forEach( ( j ) => {
        ( j.articles || [] ).forEach( ( a, i ) => {
            out.push( {
                slug: j.abbr.toLowerCase() + '-article-' + ( i + 1 ),
                title: a.title,
                excerpt: a.title,
                content: '',
                meta: {
                    journal_term: j.abbr.toLowerCase(),
                    authors: a.authors || '',
                    issue: a.issue || '',
                    description: '',
                },
            } );
        } );
    } );
    return out;
}

function buildEventCPTs() {
    const out = [];
    D.symposia.forEach( ( s ) => {
        const dates = ( s.dates || [] ).map( ( d ) => ( { label: d.label, date: d.date } ) );
        const downloads = ( s.downloads || [] ).map( ( t ) => ( { title: t, note: 'Request via the organisers' } ) );
        out.push( {
            slug: s.id,
            title: s.name,
            excerpt: s.theme || '',
            content: s.description || '',
            menu_order: 0,
            meta: {
                event_type: 'research-symposium',
                edition: s.id,
                theme: s.theme || '',
                status: s.status || 'past',
                organizer: s.organiser || '',
                keynote_name: s.keynote ? s.keynote.name : '',
                keynote_details: s.keynote ? s.keynote.details : '',
                description: s.description || '',
                submission: s.submission || '',
                contact: s.contact || '',
                tracks: ( s.tracks || [] ).map( ( t ) => ( { title: t } ) ),
                dates: dates,
                committee: ( s.committee || [] ).map( ( c ) => ( { role: c.role, name: c.name } ) ),
                downloads: downloads,
            },
            terms: { fbsf_event_type: [ 'research-symposium' ] },
        } );
    } );
    // Announcements → events of type programme-application.
    D.announcements.forEach( ( a, i ) => {
        const body = a.body || '';
        const match = body.match( /[Cc]losing date[^.]*\.?/ );
        const closing = match ? match[ 0 ] : '';
        out.push( {
            slug: 'announcement-' + ( i + 1 ),
            title: a.title,
            excerpt: closing,
            content: body,
            menu_order: 10,
            meta: {
                event_type: 'programme-application',
                edition: '',
                theme: '',
                status: 'past',
                organizer: 'Faculty of Business Studies and Finance',
                keynote_name: '',
                keynote_details: '',
                description: body,
                submission: '',
                contact: '',
                tracks: [],
                dates: closing ? [ { label: 'Closing date', date: closing } ] : [],
                committee: [],
                downloads: [],
            },
            terms: { fbsf_event_type: [ 'programme-application' ] },
        } );
    } );
    return out;
}

function buildDownloadCPTs() {
    const out = [];
    const auth = D.authorities || {};
    ( auth.downloads || [] ).forEach( ( d ) => {
        out.push( {
            slug: 'download-' + d.file.replace( /\.pdf$/i, '' ).replace( /[^a-z0-9]+/gi, '-' ),
            title: d.label,
            excerpt: d.label,
            content: '',
            meta: {
                file: d.file,
                category: 'Student-Resources',
                description: 'Request this document from the faculty office.',
            },
        } );
    } );
    // Symposium proceedings.
    D.symposia.forEach( ( s ) => {
        ( s.downloads || [] ).forEach( ( t ) => {
            const file = s.id + '-' + t.replace( /[^a-z0-9]+/gi, '-' ) + '.pdf';
            out.push( {
                slug: 'download-' + file.replace( /\.pdf$/i, '' ).replace( /[^a-z0-9]+/gi, '-' ),
                title: t,
                excerpt: s.name,
                content: '',
                meta: {
                    file: file,
                    category: 'Proceedings',
                    description: 'Request this document from the organisers.',
                },
            } );
        } );
    } );
    return out;
}

function buildMenu() {
    return {
        name: 'FBSF Primary',
        items: [
            { title: 'Home', type: 'page', page: 'home' },
            { title: 'About', type: 'page', page: 'about' },
            {
                title: 'Departments', type: 'page', page: 'departments', children: [
                    { title: 'Department of Accountancy', type: 'page', page: 'department-of-accountancy' },
                    { title: 'Department of Banking & Finance', type: 'page', page: 'department-of-banking-finance' },
                    { title: 'Department of Business Management', type: 'page', page: 'department-of-business-management' },
                    { title: 'Department of Insurance & Valuation', type: 'page', page: 'department-of-insurance-valuation' },
                    { title: 'All departments', type: 'page', page: 'departments' },
                ],
            },
            { title: 'Programmes', type: 'page', page: 'programmes' },
            {
                title: 'Research', type: 'page', page: 'research', children: [
                    { title: 'Research Portal', type: 'page', page: 'research' },
                    { title: 'Publications', type: 'page', page: 'publications' },
                    { title: 'Events & Symposia', type: 'page', page: 'events' },
                ],
            },
            { title: 'Events', type: 'page', page: 'events' },
            { title: 'Authorities', type: 'page', page: 'authorities' },
            { title: 'Contact', type: 'page', page: 'contact' },
        ],
    };
}

/* ------------------------------------------------------------------
 * Output
 * ------------------------------------------------------------------ */

function pageJson( title, elements ) {
    return {
        content: elements,
        page_settings: [],
        version: '0.4',
        title: title,
    };
}

function writeJson( file, obj ) {
    fs.mkdirSync( path.dirname( file ), { recursive: true } );
    fs.writeFileSync( file, JSON.stringify( obj, null, 2 ) );
    console.log( 'written:', file.replace( ROOT + '/', '' ) );
}

// Pages.
const pages = {
    home: { title: 'Home', build: buildHome },
    about: { title: 'About the Faculty', build: buildAbout },
    departments: { title: 'Departments', build: buildDepartments },
    programmes: { title: 'Academic Programmes', build: buildProgrammes },
    research: { title: 'Research & Publications', build: buildResearch },
    publications: { title: 'Publications', build: buildPublications },
    events: { title: 'Events & Research Symposia', build: buildEvents },
    authorities: { title: 'Authorities & Administrative Information', build: buildAuthorities },
    contact: { title: 'Contact Us', build: buildContact },
};

const importPages = [];
Object.keys( pages ).forEach( ( key ) => {
    const json = pageJson( pages[ key ].title, pages[ key ].build() );
    writeJson( path.join( PAGES_DIR, key + '.json' ), json );
    importPages.push( {
        slug: key,
        title: pages[ key ].title,
        elementor: json,
    } );
} );

// Templates.
const headerJson = pageJson( 'FBSF Header', buildHeader() );
writeJson( path.join( TPL_DIR, 'header.json' ), headerJson );

const footerJson = pageJson( 'FBSF Footer', buildFooter() );
writeJson( path.join( TPL_DIR, 'footer.json' ), footerJson );

const searchJson = pageJson( 'FBSF Search Results', buildSearchResults() );
writeJson( path.join( TPL_DIR, 'search-results.json' ), searchJson );

const singles = [
    [ 'single-department', 'FBSF Single Department', buildSingleDepartment() ],
    [ 'single-programme', 'FBSF Single Programme', buildSingleProgramme() ],
    [ 'single-journal', 'FBSF Single Journal', buildSingleJournal() ],
    [ 'single-event', 'FBSF Single Event', buildSingleEvent() ],
];
singles.forEach( ( [ file, title, els ] ) => {
    writeJson( path.join( TPL_DIR, file + '.json' ), pageJson( title, els ) );
} );

// Reusable templates.
const reusable = buildReusable();
reusable.forEach( ( r, i ) => {
    const json = pageJson( r.title, r.content );
    writeJson( path.join( TPL_DIR, 'reusable-' + ( i + 1 ) + '.json' ), json );
} );

// Import file.
const importData = {
    options: buildOptions(),
    taxonomies: {
        fbsf_programme_category: [ 'Undergraduate', 'Postgraduate', 'Diploma', 'Higher Diploma', 'Advanced Certificate', 'External' ],
        fbsf_department: [ 'Accountancy', 'Banking & Finance', 'Business Management', 'Insurance & Valuation' ],
        fbsf_journal_type: D.publications.map( ( j ) => j.type ),
        fbsf_event_type: [ 'Research Symposium', 'Conference', 'Programme Application', 'Journal Call' ],
        fbsf_publication_type: [ 'Journal', 'Magazine', 'Proceedings' ],
    },
    departments: buildDepartmentCPTs(),
    programmes: buildProgrammeCPTs(),
    journals: buildJournalCPTs(),
    articles: buildArticleCPTs(),
    events: buildEventCPTs(),
    downloads: buildDownloadCPTs(),
    pages: importPages,
    templates: {
        header: { title: 'FBSF Header', content: headerJson.content },
        footer: { title: 'FBSF Footer', content: footerJson.content },
        'search-results': { title: 'FBSF Search Results', content: searchJson.content },
    },
    singles: Object.fromEntries( singles.map( ( [ file, title, els ] ) => [
        file.replace( 'single-', '' ), { title, content: els },
    ] ) ),
    reusable: reusable.map( ( r ) => ( { title: r.title, content: r.content } ) ),
    front_page: 'home',
    menu: buildMenu(),
};

writeJson( path.join( ROOT, 'migration', 'fbsf-wp-import.json' ), importData );

console.log( '\nDone. Summary:');
console.log( '  pages:', importPages.length,
    '| departments:', importData.departments.length,
    '| programmes:', importData.programmes.length,
    '| journals:', importData.journals.length,
    '| articles:', importData.articles.length,
    '| events:', importData.events.length,
    '| downloads:', importData.downloads.length,
    '| templates:', Object.keys( importData.templates ).length + 1,
    '| reusable:', importData.reusable.length );
