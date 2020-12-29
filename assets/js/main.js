document.addEventListener("DOMContentLoaded", function() {

    IMask(document.querySelector('.ns_tel'), {
        mask: '+{7}(000)000-00-00'
    });

    let t_address = tippy('.ns_address', {
        content: 'Введите название улицы',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_address[0].disable();

    let t_house = tippy('.ns_house', {
        content: 'Введите номер дома',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_house[0].disable();

    let t_apartment = tippy('.ns_apartment', {
        content: 'Введите номер квартиры',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_apartment[0].disable();

    let t_entrance = tippy('.entrance-input', {
        content: 'Введите номер подъезда',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_entrance[0].disable();

    let t_floor = tippy('.floor-input', {
        content: 'Введите этаж',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_floor[0].disable();

    let t_date = tippy('.date-input', {
        content: 'Выберите дату',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_date[0].disable();
    
    let t_time = tippy('.ns_time__input', {
        content: 'Выберите время',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_time[0].disable();

    let t_name = tippy('.ns_name', {
        content: 'Введите свое имя',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_name[0].disable();
    
    
    let t_tel = tippy('.ns_tel', {
        content: 'Введите свой номер телефона',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_tel[0].disable();

    let t_inputDisplay = tippy('.input-num__display', {
        content: 'Введите положительное число',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_inputDisplay[0].disable();


    // Цена
    function getCheckedPrice( groupName ) {
        let radios = document.getElementsByName( groupName );
        for( i = 0; i < radios.length; i++ ) {
            if( radios[i].checked ) {
                return radios[i].dataset.price;
            }
        }
        return null;
    }
    let sqMetersInput = document.getElementById('square-meters');
    const sqPrice = sqMetersInput.dataset.sqPrice;
    let orderPrice = document.querySelector('.order-price');
    let totalPrice = sqPrice * sqMetersInput.value + +getCheckedPrice('clean-type'); // sqPrice * k + t + S;

    orderPrice.textContent = totalPrice + ' ₽';

    function recalculateTotal() {
        // ДОБАВИТЬ ДОП. УСЛУГИ
        totalPrice = sqPrice * sqMetersInput.value + +getCheckedPrice('clean-type');
        orderPrice.textContent = totalPrice + ' ₽';
    }

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
            recalculateTotal();
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
                t_name[0].enable();
                t_name[0].show();
                // alert("Вы не ввели своё имя.");
                return;
            }
            if(telInput.value === "") {
                t_tel[0].enable();
                t_tel[0].show();
                // alert("Вы не ввели свой телефон.");
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
                t_address[0].enable();
                t_address[0].show();
                // alert("Вы не ввели улицу.");
                return;
            }
            if(houseInput.value === "") {
                t_house[0].enable();
                t_house[0].show();
                // alert("Вы не ввели номер дома.");
                return;
            }
            if(apartmentInput.value === "") {
                t_apartment[0].enable();
                t_apartment[0].show();
                // alert("Вы не ввели номер квартиры.");
                return;
            }
            if(entranceInput.value === "") {
                t_entrance[0].enable();
                t_entrance[0].show();
                // alert("Вы не ввели номер подъезда.");
                return;
            }
            if(floorInput.value === "") {
                t_floor[0].enable();
                t_floor[0].show();
                // alert("Вы не ввели этаж.");
                return;
            }
            if(dateInput.value === "") {
                t_date[0].enable();
                t_date[0].show();
                // alert("Вы не ввели дату.");
                return;
            }
            if(timeInput.value === "") {
                t_time[0].enable();
                t_time[0].show();
                // alert("Вы не ввели время.");
                return;
            }
            // На этом этапе все проверки 1-го шага пройдены можно переходить к следующему шагу
    
            mainHeading.innerHTML = 'Дополнительные услуги';
            firstStep.classList.add('hidden');
            secondStep.classList.remove('hidden');
    
            nextBtn.classList.add('dop-uslugi');
        }      
    });

    // Доп услуги
    let orderServiceList = document.querySelector('.order-service');
    let list = document.querySelector(".service-list");

    list.addEventListener("click", function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        let closestItem = evt.target.closest(".service-item")

        if(closestItem !== null) {
            closestItem.classList.toggle('service-item__checked');
            let checkBox = closestItem.querySelector('.service-checkbox');
            if(checkBox.checked) {
                checkBox.checked = false;
                var li = orderServiceList.querySelector(`[data-index="${checkBox.value}"]`);
                if(null != li)
                    orderServiceList.removeChild(li);
            }
            else {
                checkBox.checked = true;
                // orderServiceList.appendChild(document.createElement("li").textContent = closestItem.querySelector('.service-name').textContent);
                var li = document.createElement("li");
                li.setAttribute('class', 'order-service-item');
                li.setAttribute('data-index', checkBox.value);
                li.appendChild(document.createTextNode(closestItem.querySelector('.service-name').textContent));
                orderServiceList.appendChild(li);
                // orderServiceList.textContent = closestItem.querySelector('.service-name').textContent
                
            }
            console.log('checkbox ' + checkBox.checked);
        }
        
    });

    function getCheckedValueCheckbox( groupName ) {
        let radios = document.getElementsByName( groupName );
        for( i = 0; i < radios.length; i++ ) {
            if( radios[i].checked ) {
                return radios[i].value;
            }
        }
        return null;
    }


    // Кв метры

    let sqDup = document.getElementById('sqm-dup');
    let sqDupWrap = document.querySelector('.input-num');

    sqDup.addEventListener('change', function() {
        if(sqDup.value <= 0) {
            sqDup.value = 1;
            sqMetersInput.value = sqDup.value;
            t_inputDisplay[0].enable();
            t_inputDisplay[0].show();
        }
        else {
            sqMetersInput.value = sqDup.value;
        }
        console.log('MAIN_VALUE-1: ' + sqDup.value);
    });
    sqDup.addEventListener('focusout', recalculateTotal);
    sqDup.addEventListener('input', recalculateTotal);

    sqDupWrap.addEventListener('click', function(evt) {
        if(evt.target.id === 'square-min-btn') {
            if(sqDup.value <= 1) return;
            sqDup.value = +sqDup.value - 1;
            sqMetersInput.value = sqDup.value;
        }
        else if (evt.target.id === 'square-plus-btn') {
            sqDup.value = +sqDup.value + 1;
            sqMetersInput.value = sqDup.value;
        }
        recalculateTotal();
        console.log('MAIN_VALUE-2: ' + sqDup.value);
    });
    

    // SIDEBAR

    // Тип уборки 
    let typeOrder = document.querySelector('.order-type');
    let cleanTypeList = document.getElementsByName('clean-type');

    cleanTypeList.forEach(el => {
        el.addEventListener('change', function(evt) {
            // console.log(evt.target);
            // evt.target.parentNode.querySelector('.clean-title').textContent
            // console.log(evt.target.parentNode.querySelector('.clean-title').textContent);
            
            if (evt.target.checked) {
                typeOrder.textContent = evt.target.parentNode.querySelector('.clean-title').textContent;
            }
        })
    });

    // Адрес

    let orderAddr = document.querySelector('.order-address');
    
    let streetStr = '';
    let houseStr = '';
    let apartmentStr = '';
    let addressResult = '';

    streetInput.addEventListener('change', function(evt) {
        // console.log(evt.target.value);
        streetStr = evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
        // if(evt.target.value != "")
    });
    streetInput.addEventListener('focusout', function(evt) {
        streetStr = evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });


    houseInput.addEventListener('change', function(evt) {
        // console.log(evt.target.value);
        houseStr = evt.target.value == '' ? '' : ', ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
        // if(evt.target.value != "")
    });
    houseInput.addEventListener('mouseleave', function(evt) {
        houseStr = evt.target.value == '' ? '' : ', ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });


    apartmentInput.addEventListener('change', function(evt) {
        // console.log(evt.target.value);
        apartmentStr = evt.target.value == '' ? '' : ', кв. ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
        // if(evt.target.value != "")
    });
    apartmentInput.addEventListener('mouseleave', function(evt) {
        apartmentStr = evt.target.value == '' ? '' : ', кв. ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });
    
    // Дата и время

    // let dateInput =  document.querySelector(".date-input");
    let orderDate = document.querySelector('.order-date');
    let dateStr = '';
    let timeStr = '';
    let dateAndTime = '';

    dateInput.addEventListener('change', function(evt){
        let date = new Date(evt.target.value);
        
        dateStr = date.getDate();
        dateStr += '.' + date.getMonth();
        dateStr += '.' + date.getFullYear();
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });
    timeInput.addEventListener('change', function(evt){
        timeStr = evt.target.value;
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });
    timeInput.addEventListener('input', function(evt){
        timeStr = evt.target.value;
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });

    




    


});
