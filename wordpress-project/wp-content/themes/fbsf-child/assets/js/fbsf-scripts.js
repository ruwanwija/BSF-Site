/**
 * FBSF child theme — front-end interactions.
 *
 * Ported from the original static site's js/filters.js, js/main.js and
 * js/navigation.js. Handles:
 *   - programme category/department/text filtering
 *   - journal tab switching
 *   - article search
 *   - download "request document" notice modal
 *   - back-to-top button
 *   - homepage announcement highlight
 */
( function () {
    'use strict';

    /* ------------------------------------------------------------------
     * Programme filter
     * ------------------------------------------------------------------ */
    function initProgrammeFilter() {
        var filter = document.querySelector( '[data-fbsf-filter="programme"]' );
        if ( ! filter ) {
            return;
        }
        var cards = Array.prototype.slice.call( filter.querySelectorAll( '.fbsf-prog-card' ) );
        var pills = Array.prototype.slice.call( filter.querySelectorAll( '[data-fbsf-cat]' ) );
        var deptSelect = filter.querySelector( '.fbsf-filter-select' );
        var searchInput = filter.querySelector( '.fbsf-filter-search' );
        var countEl = filter.querySelector( '[data-fbsf-count]' );
        var emptyEl = filter.querySelector( '.fbsf-filter-empty' );

        function apply() {
            var activeCat = pills.filter( function ( p ) { return p.classList.contains( 'is-active' ); } )[ 0 ]
                ? pills.filter( function ( p ) { return p.classList.contains( 'is-active' ); } )[ 0 ].getAttribute( 'data-fbsf-cat' )
                : 'all';
            var dept = deptSelect ? deptSelect.value : 'all';
            var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
            var visible = 0;

            cards.forEach( function ( card ) {
                var cat = card.getAttribute( 'data-fbsf-cat' ) || '';
                var deptCard = card.getAttribute( 'data-fbsf-dept' ) || '';
                var text = card.textContent.toLowerCase();
                var catOk = ( 'all' === activeCat || cat === activeCat );
                var deptOk = ( 'all' === dept || deptCard === dept );
                var qOk = ! q || text.indexOf( q ) !== -1;
                var show = catOk && deptOk && qOk;
                card.style.display = show ? '' : 'none';
                if ( show ) {
                    visible++;
                }
            } );

            if ( countEl ) {
                countEl.textContent = visible + ' programme' + ( visible === 1 ? '' : 's' );
            }
            if ( emptyEl ) {
                emptyEl.style.display = visible === 0 ? '' : 'none';
            }
        }

        pills.forEach( function ( pill ) {
            pill.addEventListener( 'click', function () {
                pills.forEach( function ( p ) { p.classList.remove( 'is-active' ); } );
                pill.classList.add( 'is-active' );
                apply();
            } );
        } );
        if ( deptSelect ) {
            deptSelect.addEventListener( 'change', apply );
        }
        if ( searchInput ) {
            searchInput.addEventListener( 'input', apply );
        }
        apply();
    }

    /* ------------------------------------------------------------------
     * Journal tabs
     * ------------------------------------------------------------------ */
    function initJournalTabs() {
        var tabs = document.querySelectorAll( '[data-fbsf-journal-tabs]' );
        tabs.forEach( function ( wrap ) {
            var tablist = wrap.querySelectorAll( '[data-fbsf-jtab]' );
            var panels = wrap.querySelectorAll( '[data-fbsf-jpanel]' );
            tablist.forEach( function ( tab ) {
                tab.addEventListener( 'click', function () {
                    var target = tab.getAttribute( 'data-fbsf-jtab' );
                    tablist.forEach( function ( t ) { t.classList.remove( 'is-active' ); } );
                    panels.forEach( function ( p ) { p.hidden = true; p.classList.remove( 'is-active' ); } );
                    tab.classList.add( 'is-active' );
                    var panel = wrap.querySelector( '[data-fbsf-jpanel="' + target + '"]' );
                    if ( panel ) {
                        panel.hidden = false;
                        panel.classList.add( 'is-active' );
                    }
                } );
            } );
        } );
    }

    /* ------------------------------------------------------------------
     * Article search
     * ------------------------------------------------------------------ */
    function initArticleSearch() {
        var wrap = document.querySelector( '[data-fbsf-article-search]' );
        if ( ! wrap ) {
            return;
        }
        var input = wrap.querySelector( '.fbsf-article-search-input' );
        var items = Array.prototype.slice.call( wrap.querySelectorAll( '.fbsf-article-item' ) );
        var countEl = wrap.querySelector( '[data-fbsf-article-count]' );
        var emptyEl = wrap.querySelector( '.fbsf-filter-empty' );

        function apply() {
            var q = input ? input.value.trim().toLowerCase() : '';
            var visible = 0;
            items.forEach( function ( item ) {
                var data;
                try {
                    data = JSON.parse( item.getAttribute( 'data-fbsf-article-text' ) || '{}' );
                } catch ( e ) {
                    data = {};
                }
                var hay = [ data.title || '', data.authors || '', data.desc || '' ].join( ' ' );
                var show = ! q || hay.indexOf( q ) !== -1;
                item.style.display = show ? '' : 'none';
                if ( show ) {
                    visible++;
                }
            } );
            if ( countEl ) {
                countEl.textContent = visible + ' article' + ( visible === 1 ? '' : 's' );
            }
            if ( emptyEl ) {
                emptyEl.style.display = visible === 0 ? '' : 'none';
            }
        }

        if ( input ) {
            input.addEventListener( 'input', apply );
        }
        apply();
    }

    /* ------------------------------------------------------------------
     * Download notice modal
     * ------------------------------------------------------------------ */
    function initDownloadNotice() {
        var host = null;

        function ensureHost() {
            if ( host && document.body.contains( host ) ) {
                return host;
            }
            host = document.createElement( 'div' );
            host.className = 'fbsf-notice-modal';
            host.innerHTML =
                '<div class="fbsf-notice-modal-box">'
                + '<h3></h3>'
                + '<p></p>'
                + '<button type="button" class="fbsf-btn fbsf-btn--primary fbsf-notice-ok"></button>'
                + '<button type="button" class="fbsf-notice-modal-close">Close</button>'
                + '</div>';
            document.body.appendChild( host );
            host.querySelector( '.fbsf-notice-ok' ).addEventListener( 'click', close );
            host.querySelector( '.fbsf-notice-modal-close' ).addEventListener( 'click', close );
            host.addEventListener( 'click', function ( e ) {
                if ( e.target === host ) {
                    close();
                }
            } );
            return host;
        }

        function close() {
            if ( host ) {
                host.classList.remove( 'is-open' );
            }
        }

        function open( file ) {
            var modal = ensureHost();
            modal.querySelector( 'h3' ).textContent = 'Request this document';
            modal.querySelector( 'p' ).textContent =
                'To obtain "' + file + '", please contact the faculty office at '
                + ( window.FBSF_DATA && window.FBSF_DATA.site ? window.FBSF_DATA.site.email : 'the faculty office' )
                + '. Documents are provided on request.';
            modal.querySelector( '.fbsf-notice-ok' ).textContent = 'Email the office';
            modal.querySelector( '.fbsf-notice-ok' ).setAttribute( 'href', 'mailto:' + ( window.FBSF_DATA && window.FBSF_DATA.site ? window.FBSF_DATA.site.email : '' ) );
            modal.classList.add( 'is-open' );
        }

        document.addEventListener( 'click', function ( e ) {
            var btn = e.target.closest( '.js-fbsf-download-notice' );
            if ( ! btn ) {
                return;
            }
            e.preventDefault();
            open( btn.getAttribute( 'data-fbsf-file' ) || 'document' );
        } );
    }

    /* ------------------------------------------------------------------
     * Back to top
     * ------------------------------------------------------------------ */
    function initBackToTop() {
        var btn = document.querySelector( '.fbsf-back-to-top' );
        if ( ! btn ) {
            return;
        }
        function onScroll() {
            if ( window.scrollY > 600 ) {
                btn.classList.add( 'is-visible' );
            } else {
                btn.classList.remove( 'is-visible' );
            }
        }
        window.addEventListener( 'scroll', onScroll, { passive: true } );
        btn.addEventListener( 'click', function () {
            window.scrollTo( { top: 0, behavior: 'smooth' } );
        } );
        onScroll();
    }

    /* ------------------------------------------------------------------
     * FAQ accordion highlight (optional polish)
     * ------------------------------------------------------------------ */
    function initFaq() {
        var faqs = document.querySelectorAll( '.fbsf-faq-item summary' );
        faqs.forEach( function ( summary ) {
            summary.addEventListener( 'click', function () {
                var item = summary.closest( '.fbsf-faq-item' );
                if ( item && item.open ) {
                    item.style.boxShadow = '0 8px 24px rgba(22,34,64,0.12)';
                } else {
                    item.style.boxShadow = '';
                }
            } );
        } );
    }

    /* ------------------------------------------------------------------
     * Initialise
     * ------------------------------------------------------------------ */
    function init() {
        initProgrammeFilter();
        initJournalTabs();
        initArticleSearch();
        initDownloadNotice();
        initBackToTop();
        initFaq();
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }
} )();
