document.addEventListener("DOMContentLoaded", function(event) {
    const btn_input_person = document.querySelector('.add_input_person');
    let inputs_p = document.querySelectorAll(".person_input_list input");
    // добавляем поля для персон

    btn_input_person.addEventListener("click", e => {
        let person_inputs = document.querySelectorAll(".person_input_list input");
        let count_inputs = person_inputs.length;
        let input = `<span  class="data_person_input" data-person="p${count_inputs+1}">
                        <input id="p${count_inputs+1}" type="text" name="person" required readonly>
                        <button type="button" class="add_person_area"
                                data-area="a${count_inputs+1}"
                                data-person="p${count_inputs+1}">
                            ш
                        </button>
                    </span>`;
        btn_input_person.insertAdjacentHTML("beforebegin", input);
    });





    // Зона фотографии
    let form_persone = document.querySelector("form");
    let area = document.querySelector('.area');
    let area_click = document.querySelector('.area_click');
    let divRect = area.getBoundingClientRect();

    let all_person = area_click.querySelectorAll('.area_person');


// клик по фото
    area_click.addEventListener("click", e => {
        let relX = e.pageX - divRect.left-25;
        let relY = e.pageY - divRect.top-25;
        let location = `top: ${relY}px; left: ${relX}px`;
        let data_location = JSON.stringify({'y': relY, 'x':relX});

        let id_person = area_click.id;
        if ( !id_person ) return;
        let text_person = document.createElement('span');
        let box_person = `<div class='area_person' data-person='${id_person}' style='${location}'>
                            <span class='area_person__text'></span>
                        </div>`;

        if ( area_click.querySelector(`[data-person=${id_person}]`)  ) {
            area_click.querySelector(`[data-person=${id_person}`).style.cssText = location;
            form_persone.querySelector(`input#${id_person}]`).setAttribute('data-location', data_location)
            return;
        } else {
            form_persone.querySelector(`input#${id_person}`).setAttribute('data-location', data_location)
            area_click.innerHTML += box_person;

            form_persone.querySelector(`input#${id_person}`).style.cssText = 'cursor: text';
            form_persone.querySelector(`input#${id_person}`).removeAttribute('readonly');


        }

    });

    // let input = document.querySelector(`.input#${e.target.id}`);
    // if ( !input.dataset.location || input.dataset.location == '' ) return;
    // input.style.cssText = 'cursor: text';
    // form_persone.querySelector(`input#${btn.dataset.person}`).removeAttribute('readonly');


    // ввод имени персонажа
    inputs_p.forEach( inp => {
        inp.addEventListener('input', e => {
            let span = document.querySelector(`.area_person[data-person="${e.target.id}"] span`);
            if ( span ) {
                span.textContent = e.target.value;
            }
        });
    });

    form_persone.addEventListener('click', form => {
        if ( form.target.classList.contains('add_person_area') ) {
            let btn = form.target;
            if ( btn.classList.contains('edit') ) {
                clean_activ_btn();
                console.log(btn.dataset.person);
                area_click.id = '';
            } else {
                clean_activ_btn();
                console.log(btn.dataset.person);
                form_persone.querySelector(`input#${btn.dataset.person}`).style.cssText = 'cursor: text';
                form_persone.querySelector(`input#${btn.dataset.person}`).removeAttribute('readonly');


                btn.classList.add('edit')
                area_click.id = btn.dataset.person;
            }
        }
    });
    function clean_activ_btn() {
        let data_person_input = form_persone.querySelectorAll('.add_person_area');
        data_person_input.forEach( btns => {
            btns.classList.remove('edit');
            document.querySelector(`input#${btns.dataset.person}`).setAttribute('readonly','readonly');
            document.querySelector(`input#${btns.dataset.person}`).style.cssText = 'cursor: not-allowed';
        });
    }

    window.addEventListener('resize', function(){
        divRect = area.getBoundingClientRect();
    });



    $('form').on('submit', e => {
        e.preventDefault();
        let data_form = $('form').serializeArray() ;
        // console.log(data_form);
        $.ajax({
            url: '',
            method: 'POST',
            data: {inputs: data_form},
            success: function(data){
                alert(data);
            }
        });

    });











});