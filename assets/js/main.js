document.addEventListener("DOMContentLoaded", function() {

    // Тип уборки
    let wrap = document.querySelector(".clean-type-wrap");
    wrap.addEventListener("click", function(evt) {
        let ch = Array.from(wrap.children);
        ch.forEach(element => {
            if(element.nodeName == 'LABEL' && element != evt.target.parentNode) {
                element.classList.remove('clean-type-label__checked');
            } else if (element.nodeName == 'LABEL' && element.nodeName == evt.target.parentNode.nodeName) {
                evt.target.parentNode.classList.add('clean-type-label__checked');
            }
        });
    });


    function getCheckedValue( groupName ) {
        let radios = document.getElementsByName( groupName );
        for( i = 0; i < radios.length; i++ ) {
            if( radios[i].checked ) {
                return radios[i].value;
            }
        }
        return null;
    }

    let streetInput =  document.querySelector(".ns_address");
    let houseInput =  document.querySelector(".ns_house");
    let apartmentInput =  document.querySelector(".ns_apartment");
    let entranceInput =  document.querySelector(".entrance-input");
    let floorInput =  document.querySelector(".floor-input");
    let dateInput =  document.querySelector(".date-input");
    let timeInput =  document.querySelector(".ns_time__input");
    let mainHeading = document.querySelector(".ns_main-heading");
    
    let firstStep = document.querySelector(".first-step");
    let secondStep = document.querySelector(".second-step");
    let thirdStep = document.querySelector(".third-step");
    

    let nameInput = document.querySelector('.ns_name');
    let telInput = document.querySelector('.ns_tel');
    let form = document.querySelector('.main-form');

    let nextBtn = document.querySelector(".next-btn");
    nextBtn.addEventListener("click", function(evt) {
        // ВСЕ АЛЕРТЫ ЗАМЕНИТЬ НА ТУЛТИПЫ 
        if(nextBtn.classList.contains ('end')) {
            if(nameInput.value === "") {
                alert("Вы не ввели своё имя.");
                return;
            }
            if(telInput.value === "") {
                alert("Вы не ввели свой телефон.");
                return;
            }
            form.submit();

        } else if(nextBtn.classList.contains ('dop-uslugi')) {
            nextBtn.classList.remove('dop-uslugi');
            nextBtn.classList.add('end');
            nextBtn.innerHTML = 'Заказать';

            mainHeading.innerHTML = 'Расскажите о себе';
            secondStep.classList.add('hidden');
            thirdStep.classList.remove('hidden');
        } else {
            if(getCheckedValue('clean-type') === null) {
                alert("Вы не выбрали тип уборки.");
                return;
            }
            if(streetInput.value === "") {
                alert("Вы не ввели улицу.");
                return;
            }
            if(houseInput.value === "") {
                alert("Вы не ввели номер дома.");
                return;
            }
            if(apartmentInput.value === "") {
                alert("Вы не ввели номер квартиры.");
                return;
            }
            if(entranceInput.value === "") {
                alert("Вы не ввели номер подъезда.");
                return;
            }
            if(floorInput.value === "") {
                alert("Вы не ввели этаж.");
                return;
            }
            if(dateInput.value === "") {
                alert("Вы не ввели дату.");
                return;
            }
            if(timeInput.value === "") {
                alert("Вы не ввели время.");
                return;
            }
            // На этом этапе все проверки 1-го шага пройдены можно переходить к следующему шагу
    
            mainHeading.innerHTML = 'Дополнительные услуги';
            firstStep.classList.add('hidden');
            secondStep.classList.remove('hidden');
    
            nextBtn.classList.add('dop-uslugi');
        }      
    });

});