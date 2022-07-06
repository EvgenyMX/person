document.addEventListener("DOMContentLoaded", function(event) {
    let image_zone = document.querySelector('.area_click');
    let form = document.querySelector('form');

    let btn_add_person = document.querySelector('.add_input_person');
    let btn_hide_person = document.querySelector('.add_input_person');



    btn_add_person.addEventListener('click', e => {
        add_person();
    });


    form.addEventListener('click', e => {
        let target = e.target;
        if ( target.closest('.person_hide') ) {
            let btn_hide_person = target.closest('.person_hide');
            let person_id =  btn_hide_person.dataset.person;
            console.log(person_id);
            hide_person( person_id );
        }

        if ( target.closest('.data_person') ) {
            let input = target.closest('.data_person');
            input.addEventListener('input', e => {
                marker_edit_text( input.dataset.person, e.target.value );
            });
        }
    });

    form.addEventListener('reset', e => {
        reset_form();
    });







    function lengthInputPerson() {
        let person_s = document.querySelectorAll('.data_person_input');
        return person_s.length;
    }
<<<<<<< HEAD

    function add_person() {
=======
    // По клику по области над фото, генерируем обводку
    // клик по фото
    area_click.addEventListener("click", e => {
        let divRect = area_click.getBoundingClientRect();
        let relX = 100 * (e.offsetX-25) / divRect.width;
        let relY = 100 * (e.offsetY-25 )/ divRect.height;

        let location = `top: ${relY}%; left: ${relX}%`;

        let data_location = JSON.stringify({'y': relY, 'x':relX});

        let id_person = e.target.dataset.person;
        if ( ! id_person ) return;
        let current_input = form_person.querySelector(`input#${id_person}`);
            current_input.style.cssText = 'cursor: text';
            current_input.removeAttribute('readonly');
            current_input.classList.add('add_square');

        let square = `<div class='area_person' data-person='${id_person}' style='${location}'>
                            <span class='area_person__text'></span>
                        </div>`;

        if ( area_click.querySelector(`[data-person=${id_person}]`)  ) {
            area_click.querySelector(`[data-person=${id_person}]`).style.cssText = location;
            current_input.setAttribute('data-location', data_location);
            return;
        } else {
            current_input.setAttribute('data-location', data_location);
            area_click.innerHTML += square;
        }

    });
    window.addEventListener('resize', function(){
        console.log('1');
        divRect = area_click.getBoundingClientRect();
    });
>>>>>>> a008820d0b076335015348815596ebb8aeabb921

        let all_input_preson = lengthInputPerson();
        let new_number_person = all_input_preson + 1;

        let append_pesron_input = document.querySelector('.add_input_person');

<<<<<<< HEAD
        let input_person_html = `<span class="data_person_input person--new" data-person="p${new_number_person}">
                                    <input type="text" class="data_person" data-person="p${new_number_person}" value="${new_number_person}" data-value="${new_number_person}">
                                    <button type="button" data-person="p${new_number_person}" class="person_hide">remove</button>
                                </span>`;
        let append_pesron_marker = document.querySelector('.area_click');
        let marker_person_html = `<div class="marker_person person--new"  data-person="p${new_number_person}">
                                    <span>Отец ${new_number_person}</span>
                                </div>`;

=======
    // $('form').on('submit', e => {
    //     e.preventDefault();
    //     let data_form = $('form').serializeArray() ;
    //     $.ajax({
    //         url: '',
    //         method: 'POST',
    //         data: {inputs: data_form},
    //         success: function(data){
    //             alert(data);
    //         }
    //     });

    // });
>>>>>>> a008820d0b076335015348815596ebb8aeabb921

        append_pesron_input.insertAdjacentHTML( "beforebegin", input_person_html );
        append_pesron_marker.insertAdjacentHTML( "beforeend", marker_person_html );

    }



    function marker_edit_text( person_id, text ) {

        let marker = document.querySelector(`.marker_person[data-person=${person_id}]`);
        marker.children[0].textContent = text;

    }

    function hide_person( person_id ) {

        let input_person = document.querySelector(`[data-person=${person_id}]`);

        if ( input_person) input_person.classList.add('person--hide');
    }

    function reset_form() {
        return_person();
        reset_marker_text();
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
            console.log(inp);
            let marker = document.querySelector(`.marker_person[data-person=${inp.dataset.person}]`);
            marker.children[0].textContent = inp.dataset.value;
        });
    }

    function recalculation_person() {  }



    function drag_person() {

        let markers = document.querySelectorAll('.marker_person');
        markers.forEach(marker => {
            marker.onmouseover = marker.onmouseout = drag_event;
        });
    }
    drag_person();
    function drag_event( event ) {
        let marker = event.target.closest('.marker_person');


        if (event.type == 'mouseover') {
            $( marker ).draggable({containment: image_zone});
        }
        if (event.type == 'mouseout') {
            $( marker ).draggable( "destroy" );
        }


    }


});