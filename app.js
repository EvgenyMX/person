document.addEventListener("DOMContentLoaded", function(event) {

    // const form = document.querySelector("form");

    const btn_input_person = document.querySelector('.add_input_person');
    const btn_submot = document.querySelector('.submit');

    btn_input_person.addEventListener("click", e => {
        let person_inputs = document.querySelectorAll(".person_input_list input");
        let count_inputs = person_inputs.length;
        let input = `<span>
                        <input id="p${count_inputs+1}" type="text" name="person">
                        <button class="add_person_area"
                                data-area="a${count_inputs+1}"
                                data-person="p${count_inputs+1}">
                            ш
                        </button>
                    </span>`;
        btn_input_person.insertAdjacentHTML("beforebegin", input);
    });
    // mousedown


    let area = document.querySelector('.area');
    let area_click = document.querySelector('.area_click');
    let divRect = area.getBoundingClientRect();
    console.log(divRect);

    console.log( JSON.stringify( divRect ) );


    area_click.addEventListener("click", e => {
        let relX = e.pageX - divRect.left;
        let relY = e.pageY - divRect.top;
        area_click.textContent = `
            relX: ${ relX }, absX: ${ e.pageX }
            relY: ${ relY }, absY: ${ e.pageY }
        `;

        let input = `<div class="area_person" data-person=""></div>`;

    });


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