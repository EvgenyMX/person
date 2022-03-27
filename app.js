document.addEventListener("DOMContentLoaded", function(event) {
    const btn_input_person = document.querySelector('.add_input_person');
    // добавляем поля для персон
    btn_input_person.addEventListener("click", e => {
        let person_inputs = document.querySelectorAll(".person_input_list input");
        let count_inputs = person_inputs.length;
        let input = `<span  class="data_person_input" data-person="p${count_inputs+1}">
                        <input id="p${count_inputs+1}" type="text" name="person" required>
                        <button type="button" class="add_person_area"
                                data-area="a${count_inputs+1}"
                                data-person="p${count_inputs+1}">
                            ш
                        </button>
                    </span>`;
        btn_input_person.insertAdjacentHTML("beforebegin", input);
    });


    // Зона фотографии
    let area = document.querySelector('.area');
    let area_click = document.querySelector('.area_click');
    let divRect = area.getBoundingClientRect();
    console.log(divRect);

    console.log( JSON.stringify( divRect ) );


        area_click.addEventListener("click", e => {
            let relX = e.pageX - divRect.left-25;
            let relY = e.pageY - divRect.top-25;
            let location = `top: ${relY}px; left: ${relX}px`;


            let id_person = area_click.id;
            if ( !id_person ) return;
            let border_person = document.createElement('div');
            border_person.classList.add('area_person'),
            border_person.setAttribute('data-pesron', id_person);


            border_person.style.cssText = location;


            if ( area_click.querySelector(`[data-pesron=${id_person}]`) ) {
                area_click.querySelector(`[data-pesron=${id_person}]`).style.cssText = location;
                console.log( area_click.querySelector(`[data-pesron=${id_person}]`) );
                return;
            } else {
                console.log(location);
                console.log(border_person);
                area_click.append(border_person);
            }
        });

    let form_persone = document.querySelector("form");

    form_persone.addEventListener('click', form => {
        if ( form.target.classList.contains('add_person_area') ) {
            let btn = form.target;
            if ( btn.classList.contains('edit') ) {
                clean_activ_btn();
                area_click.id = '';
            } else {
                clean_activ_btn();
                btn.classList.add('edit')
                area_click.id = btn.dataset.person;
            }
        }
    });
    function clean_activ_btn() {
        let data_person_input = form_persone.querySelectorAll('.add_person_area');
        data_person_input.forEach( btns => {
            btns.classList.remove('edit');
        });
    }








    // area.addEventListener('mousemove', function(e){
    //     let relX = e.pageX - divRect.left;
    //     let relY = e.pageY - divRect.top;
    //     area.textContent = `
    //         relX: ${ relX }, absX: ${ e.pageX }
    //         relY: ${ relY }, absY: ${ e.pageY }
    //     `;
    // });

    window.addEventListener('resize', function(){
        divRect = area.getBoundingClientRect();
    });



    $('form').on('submit', e => {
        e.preventDefault();
        let data_form = $('form').serializeArray() ;
        console.log(data_form);
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