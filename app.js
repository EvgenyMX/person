document.addEventListener("DOMContentLoaded", function(event) {
    let image_zone = document.querySelector('.area_click');

    let image_zone_riseze = image_zone.getBoundingClientRect();
    window.addEventListener('resize', function() {
        image_zone_riseze = image_zone.getBoundingClientRect();
    });

    let form = document.querySelector('form');

    let btn_add_person = document.querySelector('.add_input_person');

    btn_add_person.addEventListener('click', e => {
        add_person();
        action_marker();
    });
    form.addEventListener('click', e => {
        let target = e.target;
        if ( target.closest('.person_hide') ) {
            let btn_hide_person = target.closest('.person_hide');
            let person_id =  btn_hide_person.dataset.person;
            hide_person( person_id );
        }

        if ( target.closest('.data_person') ) {
            let input = target.closest('.data_person');
            input.addEventListener('input', e => {
                marker_edit_text( input.dataset.person, e.target.value );
            });
        }

        if ( target.closest('.person_reset') ) {
            let btn_reset = target.closest('.person_reset');
            let person_id = btn_reset.dataset.person;
            reset_drag_marker(person_id);
            reset_resize_marker(person_id);
        }
    });
    form.addEventListener('reset', e => {
        reset_form();
    });



    function lengthInputPerson() {
        let person_s = document.querySelectorAll('.data_person_input');
        return person_s;
    }

    function add_person() {
        let all_input_preson = lengthInputPerson();
        let new_number_person = all_input_preson.length + 1;

        let append_pesron_input = document.querySelector('.add_input_person');

        let input_person_html = `<span class="data_person_input person--new" data-person="p${new_number_person}">
                                    <input type="text" class="data_person"
                                        data-person="p${new_number_person}"
                                        data-value="${new_number_person}"
                                        value="${new_number_person}"
                                    >
                                    <button type="button"  class="person_hide"
                                        data-person="p${new_number_person}"
                                    >remove</button>
                                    <button type="button" data-person="p${new_number_person}" class="person_reset" >reset</button>
                                </span>`;

        append_pesron_input.insertAdjacentHTML( "beforebegin", input_person_html );




        let append_pesron_marker = document.querySelector('.area_click__items');
        let top_new_marer = 0;

        append_pesron_marker.querySelectorAll('.person--new').forEach( (i, idx, array) => {
            if (idx === array.length - 1){
                let offsetHeight = i.offsetHeight;
                top_new_marer = (offsetHeight + 10) * array.length;
            }
        });

        let position = `right: 0; top: ${top_new_marer}px; height: 100px; width: 100px;`;

        let marker_person_html = `<div class="marker_person person--new"
                                    data-person="p${new_number_person}"
                                    style="${position}"
                                  >
                                    <span>???????? ${new_number_person}</span>
                                </div>`;


        append_pesron_marker.insertAdjacentHTML( "beforeend", marker_person_html );
    }
    function marker_edit_text( person_id, text ) {

        let marker = document.querySelector(`.marker_person[data-person=${person_id}]`);
        marker.children[0].textContent = text;

    }

    function hide_person( person_id ) {

        let input_person = document.querySelectorAll(`[data-person=${person_id}]`);

        if ( input_person ) {
            input_person.forEach(element => {
                element.classList.add('person--hide');
            });
        }


    }

    function reset_form() {
        return_person();
        reset_marker_text();
        reset_drag_marker(0);
    }



    function return_person() {
        let person_new = document.querySelectorAll('.person--new');
        if ( person_new.length ) person_new.forEach( el => el.remove() );

        let person_hide = document.querySelectorAll('.person--hide');
        if ( person_hide.length ) person_hide.forEach( el => el.classList.remove('person--hide') );
    }
    function reset_marker_text() {
        let data_person = document.querySelectorAll('.data_person');
        data_person.forEach( inp => {
            let marker = document.querySelector(`.marker_person[data-person=${inp.dataset.person}]`);
            marker.children[0].textContent = inp.dataset.value;
        });
    }

    function action_marker() {

        let markers = document.querySelectorAll('.marker_person');
        markers.forEach(marker => {
            marker.onmouseover = marker.onmouseout = drag_event;
        });
    }
    function drag_event( event ) {
        let marker = event.target.closest('.marker_person');


        if (event.type == 'mouseover') {
            $( marker ).draggable( {
                containment: image_zone,
                // cursorAt: {left: $(this).width()/2, top: $(this).height()/2},
                start: function ( markerEvent, ui ) {
                    write_drag_position( markerEvent, ui, 'old' );
                },
                stop: function( markerEvent, ui ) {

                    write_drag_position( markerEvent, ui, 'new' );

                    $(this).detach().appendTo(image_zone);

                    $(this).draggable( "destroy" );


                },
            });
            $( marker ).resizable( {
                containment: image_zone,
                start: function ( markerEvent, ui ) {
                    write_resize_marker(markerEvent, ui, 'old');
                },
                stop: function( markerEvent, ui ) {
                    write_resize_marker(markerEvent, ui, 'new');
                },
            });
        }


    }
    function write_drag_position(marker, ui, status) {
        let left = ui.position.left;
        let top = ui.position.top;


        let markerHeight = marker.target.offsetHeight;
        let markerWidth = marker.target.offsetWidth;


        let person_id = marker.target.dataset.person;
        let data_person_input =  document.querySelector(`.data_person_input[data-person=${person_id}]`);
        let l = ( 100 * parseFloat( left / parseFloat(image_zone_riseze.width))   ) ;
        let t = ( 100 * parseFloat( top  / parseFloat(image_zone_riseze.height))  ) ;

        marker.target.style.left = l + "%";
        marker.target.style.top = t + "%";
        marker.target.style.right = 'unset';

        if ( status == 'new' ) {
            marker.target.setAttribute( "data-nleft", (l/100).toFixed(3) );
            marker.target.setAttribute( "data-ntop", (t/100).toFixed(3) );
        }
        data_person_input.setAttribute("data-marker-change", 'true');

    }
    function reset_drag_marker( person_id ) {
        let old_left, old_top;
        if ( person_id == 0 ) {
            let markers = document.querySelectorAll('.marker_person');

            markers.forEach( m => {
                old_left = m.dataset.oleft;
                old_top = m.dataset.otop;

                m.setAttribute("data-nleft", old_left );
                m.setAttribute("data-ntop", old_top );

                m.style.left = old_left*100 + "%";
                m.style.top = old_top*100 + "%";
            });

        } else {
            let marker = document.querySelector(`.marker_person[data-person=${person_id}]`);
                old_left = marker.dataset.oleft;
                old_top = marker.dataset.otop;

                marker.setAttribute("data-nleft", old_left );
                marker.setAttribute("data-ntop", old_top );

                marker.style.left = old_left*100 + "%";
                marker.style.top = old_top*100 + "%";
        }
    }
    action_marker();



    function write_resize_marker(marker, ui, status) {
        console.log(ui);
        // console.log( marker.target );

        let height = ui.size.height;
        let width = ui.size.width;


        let person_id = marker.target.dataset.person;
        let data_person_input =  document.querySelector(`.data_person_input[data-person=${person_id}]`);

        let h = ( 100 * parseFloat( height / parseFloat(image_zone_riseze.width)) ) ;
        let w = ( 100 * parseFloat( width  / parseFloat(image_zone_riseze.height)) ) ;

        console.log(h);
        console.log(w);


        marker.target.style.height =  h + "%";
        marker.target.style.width = w + "%";
        marker.target.style.right = 'unset';

        if ( status == 'new' ) {
            marker.target.setAttribute( "data-nheight", (h/100).toFixed(3) );
            marker.target.setAttribute( "data-nwidth", (w/100).toFixed(3) );
        } else {
            marker.target.setAttribute( "data-oheight", (h/100).toFixed(3) );
            marker.target.setAttribute( "data-owidth", (w/100).toFixed(3) );
        }
        data_person_input.setAttribute("data-marker-change", 'true');


    }
    function reset_resize_marker( person_id ) {

        let old_height, old_width;

        if ( person_id == 0 ) {
            let markers = document.querySelectorAll('.marker_person');

            markers.forEach( m => {
                old_height = m.dataset.oheight;
                old_width = m.dataset.owidth;

                m.setAttribute("data-nheight", old_height );
                m.setAttribute("data-nwidth", old_width );

                m.style.height = old_height*100 + "%";
                m.style.width = old_width*100 + "%";
            });

        } else {
            let marker = document.querySelector(`.marker_person[data-person=${person_id}]`);

                old_height = marker.dataset.oheight;
                old_width = marker.dataset.owidth;

                marker.setAttribute("data-nheight", old_height );
                marker.setAttribute("data-nwidth", old_width );

                marker.style.height = old_height*100 + "%";
                marker.style.width = old_width*100 + "%";
        }
    }

});