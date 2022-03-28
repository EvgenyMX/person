document.addEventListener("DOMContentLoaded", function(event) {
    // Форма
    let form_person = document.querySelector("form");
    // Кнопка добавления поля ввода фио
    let btn_input_person = document.querySelector('.add_input_person');

    // Область фотографии
    let area = document.querySelector('.area');
    // размер элемента и его позиции от области
    let divRect = area.getBoundingClientRect();
    // Область над фото для клика
    let area_click = document.querySelector('.area_click');



    // Генерируем и вставляем новые поля для определения людей на фото
    // *+ кнопка добавления обводки человека на фото
    btn_input_person.addEventListener("click", e => {
        //получаем все поля(input)
        let person_inputs = form_person.querySelectorAll(".person_input_list input");
        //определяем численность полей в форме
        let count_inputs = person_inputs.length;
        // Верста обводки с подписью
        // *все поля обязательны и изначально доступны только для чтения
        let input = `<span class="data_person_input" data-person="p${count_inputs+1}">
                        <input id="p${count_inputs+1}" type="text" name="person" required readonly="readonly" class='data_person'>
                        <button type="button" class="add_person_area" data-area="a${count_inputs+1}" data-person="p${count_inputs+1}">
                            +
                        </button>
                    </span>`;
        //Добавляем в область над фото
        btn_input_person.insertAdjacentHTML("beforebegin", input);
    });

    //Делаем активный инпут и определяем с каким инпутом работаем в области по id
    form_person.addEventListener('click', form => {

        if ( form.target.classList.contains('add_person_area') || form.target.closest('.add_person_area') ) {
            let btn = form.target.closest('.add_person_area');


            if ( btn.classList.contains('edit') ) {
                clear_active();
                area_click.dataset.person = '';
            } else {
                let input = form_person.querySelector(`input#${btn.dataset.person}`);
                clear_active();
                if ( input.dataset.location && input.dataset.location != '') {
                    input.style.cssText = 'cursor: text';
                    input.removeAttribute('readonly');
                    input.classList.add('add_square');
                }
                btn.classList.add('edit');
                area_click.dataset.person = btn.dataset.person;
                area_click.style.cssText = 'cursor: cell';
            }
        }
        // if ( !input ) return;
        // if ( ! area_click.querySelector(`[data-person="${input.id}"] span`) ) return;
        // let span = area_click.querySelector(`[data-person="${input.id}"] span`);

        if ( form.target.classList.contains('add_square') ) {
            let input = form.target;
            let person_id = input.id;
            let square_text = document.querySelector(`.area_person[data-person=${person_id}] span`);

            input.addEventListener('input', e => {
                if ( square_text ) {
                    square_text.textContent = e.target.value;
                }
            });


        }


        // console.log(span);
        // input.addEventListener('input', e => {
            // console.log();
            // console.log('input', e.target.value);
            // let span = area_click.querySelector(`[data-person="${e.target.id}"] span`);
            // console.log('span',span);
            // if ( span ) {
                // span.textContent = e.target.value;
            // }
        // });



        // if ( form.target.classList.contains('data_person') && form.target.classList.contains('add_square') ) {
        //     let input = form.target;
        //     console.log(input);
        // if ( !input ) return;


            // if ( area_click.querySelector('area_person') )


        // }


    });
    function clear_active() {
        let btn_add_square = form_person.querySelectorAll('.add_person_area');
        let input_name_square = form_person.querySelectorAll('.add_square');
        btn_add_square.forEach( btns => {
            btns.classList.remove('edit');
        });
        input_name_square.forEach( inp => {
            inp.setAttribute('readonly','readonly');
            inp.classList.remove('add_square');
            inp.style.cssText = 'cursor: not-allowed';
        });
        area_click.style.cssText = 'cursor: default';
    }
    // По клику по области над фото, генерируем обводку
    // клик по фото
    area_click.addEventListener("click", e => {
        let relX = e.pageX - divRect.left - 45;
        let relY = e.pageY - divRect.top - 25;
        let location = `top: ${relY}px; left: ${relX}px`;
        let data_location = JSON.stringify({'y': relY, 'x':relX});

        let id_person = e.currentTarget.dataset.person;
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


    let inputs_p = document.querySelectorAll(".person_input_list input");
    // ввод имени персонажа
    inputs_p.forEach( inp => {
        inp.addEventListener('input', e => {
            let span = document.querySelector(`.area_person[data-person="${e.target.id}"] span`);
            if ( span ) {
                span.textContent = e.target.value;
            }
        });
    });



    // let input = document.querySelector(`.input#${e.target.id}`);
    // if ( !input.dataset.location || input.dataset.location == '' ) return;
    // input.style.cssText = 'cursor: text';
    // form_person.querySelector(`input#${btn.dataset.person}`).removeAttribute('readonly');

  // Массив всех полей ввода





    window.addEventListener('resize', function(){
        divRect = area.getBoundingClientRect();
    });



    $('form').on('submit', e => {
        e.preventDefault();
        let data_form = $('form').serializeArray() ;
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