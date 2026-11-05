/**
 * FBSF repeater meta box UI.
 *
 * Generic vanilla-JS repeater: reads its schema from the container's
 * data-fbsf-repeater attribute, renders row editors and serialises rows to
 * the hidden field as JSON. Used by CPT meta boxes and the options page.
 */
( function () {
    'use strict';

    function getRows( hidden ) {
        try {
            var rows = JSON.parse( hidden.value || '[]' );
            return Array.isArray( rows ) ? rows : [];
        } catch ( e ) {
            return [];
        }
    }

    function renderRow( schema, row, index, hidden, rowsHost ) {
        var rowEl = document.createElement( 'div' );
        rowEl.className = 'fbsf-repeater-row';

        schema.forEach( function ( field ) {
            var label = document.createElement( 'label' );
            label.className = 'fbsf-repeater-field';
            label.appendChild( document.createTextNode( field.label ) );

            var input;
            if ( field.type === 'textarea' ) {
                input = document.createElement( 'textarea' );
                input.rows = 3;
            } else {
                input = document.createElement( 'input' );
                input.type = field.type || 'text';
            }
            input.className = 'regular-text';
            input.placeholder = field.placeholder || '';
            input.value = row[ field.key ] || '';

            input.addEventListener( 'input', function () {
                row[ field.key ] = input.value;
                hidden.value = JSON.stringify( getRows( hidden ) );
            } );

            label.appendChild( input );
            rowEl.appendChild( label );
        } );

        var remove = document.createElement( 'button' );
        remove.type = 'button';
        remove.className = 'button button-small fbsf-repeater-remove';
        remove.textContent = 'Remove';
        remove.addEventListener( 'click', function () {
            var rows = getRows( hidden );
            rows.splice( index, 1 );
            hidden.value = JSON.stringify( rows );
            render();
        } );
        rowEl.appendChild( remove );
        rowsHost.appendChild( rowEl );
    }

    function initBox( box ) {
        var schema;
        try {
            schema = JSON.parse( box.getAttribute( 'data-fbsf-repeater' ) );
        } catch ( e ) {
            return;
        }
        var hidden = box.querySelector( 'input[type=hidden]' );
        var rowsHost = box.querySelector( '.fbsf-repeater-rows' );
        if ( ! hidden || ! rowsHost ) {
            return;
        }
        var addBtn = box.querySelector( '.fbsf-repeater-add' );

        function render() {
            var rows = getRows( hidden );
            rowsHost.innerHTML = '';
            rows.forEach( function ( row, i ) {
                renderRow( schema, row, i, hidden, rowsHost );
            } );
        }

        if ( addBtn ) {
            addBtn.addEventListener( 'click', function () {
                var rows = getRows( hidden );
                var emptyRow = {};
                schema.forEach( function ( f ) {
                    emptyRow[ f.key ] = '';
                } );
                rows.push( emptyRow );
                hidden.value = JSON.stringify( rows );
                render();
            } );
        }
        render();
    }

    document.addEventListener( 'DOMContentLoaded', function () {
        document.querySelectorAll( '[data-fbsf-repeater]' ).forEach( initBox );
    } );
} )();
