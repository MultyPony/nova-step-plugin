const OPENING_HOUR = 9;
const CLOSING_HOUR = 21;

document.addEventListener("DOMContentLoaded", function() {
    // Тип уборки

    function getChecked(groupName) {
        let radios = document.getElementsByName( groupName );
        for( i = 0; i < radios.length; i++ ) {
            if( radios[i].checked ) {
                return radios[i];
            }
        }
        return null;
    }

    getChecked('clean-type').parentNode.classList.add('clean-type-label__checked');

    document.getElementById('Footer').remove();


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
    
    let t_time = tippy('.ns_time', {
        content: 'Выберите время между 9:00 и 21:00',
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

    let t_mobileInputDisplay = tippy('#sqm-dup-mobile', {
        content: 'Введите положительное число',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_mobileInputDisplay[0].disable();
    let t_orderInputDisplay = tippy('#sqm-dup', {
        content: 'Введите положительное число',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_orderInputDisplay[0].disable();


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
    let totalPriceInput = document.getElementById('total-price');
    const sqPrice = sqMetersInput.dataset.sqPrice;
    let orderPrice = document.querySelector('.order-price');
    let orderPriceBottom = document.querySelector('.order-bottom .order-price');
    let sumOfAddServices = 0;
    let totalPrice = sqPrice * sqMetersInput.value + +getCheckedPrice('clean-type'); // sqPrice * k + t + S;

    orderPrice.textContent = totalPrice + ' ₽';
    orderPriceBottom.textContent = totalPrice + ' ₽';
    totalPriceInput.value = +totalPrice;

    function recalculateTotal() {
        totalPrice = sqPrice * sqMetersInput.value + +getCheckedPrice('clean-type') + +sumOfAddServices;
        totalPriceInput.value = +totalPrice;
        orderPrice.textContent = totalPrice + ' ₽';
        orderPriceBottom.textContent = totalPrice + ' ₽';
    }

    // Тип уборки

    

    let wrap = document.querySelector(".clean-type-wrap");
    wrap.addEventListener("click", function(evt) {
        let ch = Array.from(wrap.children);
        ch.forEach(element => {
            if(element.nodeName == 'LABEL' && !evt.target.classList.contains('clean-type-wrap') && element != evt.target.parentNode) {
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
    let nextBtnBottom = document.querySelector(".order-bottom .next-btn");
    let prevBtn = document.querySelector(".order-wrap .prev-btn");
    let prevBtnBottom = document.querySelector(".order-bottom .prev-btn");
    let numWrap = document.querySelector('.num-wrap');
    let activeStep = 0;


    let curDate = new Date();

    function dateToString(date) {
        let day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();
        let month = date.getMonth().toString().length == 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let year = date.getFullYear();
        return (day + '.' + month + '.' + year);
    }


    // let blockedTimeAndDates = {
    //     '28.02.2021': [
    //         '9:00',
    //         '10:00',
    //         '11:00',
    //         '12:00',
    //         '13:00',
    //         '14:00',
    //         '15:00',
    //         '16:00',
    //         '17:00',
    //         '18:00',
    //         '19:00',
    //         '20:00',
    //         '21:00',        
    //     ],
    //     '27.02.2021': [
    //         '9:00',
    //         '10:00',
    //         '11:00',
    //         '12:00',
    //         '13:00',
    //         '14:00',
    //         '15:00',
    //         '16:00',
    //         '17:00',
    //         '18:00',
    //         '19:00',
    //         '20:00',
    //         '21:00',        
    //     ],
    //     '21.02.2021': [
    //         '9:00',
    //         '17:00',
    //         '18:00',
    //         '19:00',
    //         '21:00',        
    //     ],
    // };
    let blockedDates = [];
    let currentDate;

    function checkDates() {
        jQuery(function($){
            $.ajax({
                type: "GET",
                url: window.ajaxURL,
                data: {
                    action : 'check_dates'
                },
                success: function (response) {
                    console.log('AJAX response : ', response);
                }
            });
        });
    }

    function getBlockedDates() {
        for(let b in window.blockedTimeAndDates) {
            if (window.blockedTimeAndDates[b].length === 13) {
                blockedDates.push(b);
            }
        }
    }

    getBlockedDates()

    $('.date-input').datepicker({
        onShow: function(inst, animationCompleted) {
            if(!animationCompleted)
                checkDates();
        },
        onHide: function(inst, animationCompleted) {
            if(animationCompleted) {
                let year = inst.el.value.substring(6,10);
                let month = inst.el.value.substring(3,5);
                let day = inst.el.value.substring(0,2);
                
                if (day == '' || month == '' || year == '')
                    dateStr = '';
                else
                    dateStr = day + '.' + month + '.' + year;
                dateAndTime = dateStr + ' ' + timeStr;
                orderDate.textContent = dateAndTime;
            }
        },
        onSelect: function(formattedDate, date, inst) {
            let year = inst.el.value.substring(6,10);
            let month = inst.el.value.substring(3,5);
            let day = inst.el.value.substring(0,2);
            
            if (day == '' || month == '' || year == '')
                dateStr = '';
            else
                dateStr = day + '.' + month + '.' + year;
            dateAndTime = dateStr + ' ' + timeStr;
            orderDate.textContent = dateAndTime;
            if (dateStr !== '') {
                currentDate = dateStr;
                window.slim.enable();
                window.slim.set();
            }
            
        },
        onRenderCell: function (date, cellType) {
            if ((cellType == 'day' && date.getTime() < curDate.getTime()) || (cellType == 'day' && isBlockedDate(date))) {
                console.log("blocked date: " + dateToString(date));
                return {
                    disabled: true
                }
            }
            
            if (cellType == 'day' && dateToString(curDate) === dateToString(date)) {
                return {
                    disabled: false
                }
            }
        }
    }
    );

    function isBlockedDate(date){
        let dStr = dateToString(date);

        for(let i = 0; i < blockedDates.length; i++) {
            if (dStr === blockedDates[i]) {
                console.log("return true!");
                return true;
            }
        }
    }

    nextBtn.addEventListener("click", nextButtonClick);
    nextBtnBottom.addEventListener("click", nextButtonClick);
    prevBtn.addEventListener("click", prevButtonClick);
    prevBtnBottom.addEventListener("click", prevButtonClick);

    function nextButtonClick(evt) {
        if(evt.target.classList.contains ('end')) {
            if(nameInput.value === "") {
                t_name[0].enable();
                t_name[0].show();
                return;
            }
            if(telInput.value === "" || telInput.value.length < 16) {
                t_tel[0].enable();
                t_tel[0].show();
                return;
            }
            form.submit();

        } else if(evt.target.classList.contains ('dop-uslugi')) {
            changeActiveStep(3);
            changeActiveNum(3);
        } else {
            if(getCheckedValue('clean-type') === null) {
                alert("Вы не выбрали тип уборки.");
                return;
            }
            if(streetInput.value === "") {
                t_address[0].enable();
                t_address[0].show();
                return;
            }
            if(houseInput.value === "") {
                t_house[0].enable();
                t_house[0].show();
                return;
            }
            if(apartmentInput.value === "") {
                t_apartment[0].enable();
                t_apartment[0].show();
                return;
            }
            if(entranceInput.value === "") {
                t_entrance[0].enable();
                t_entrance[0].show();
                return;
            }
            if(floorInput.value === "") {
                t_floor[0].enable();
                t_floor[0].show();
                return;
            }
            if(dateInput.value === "") {
                t_date[0].enable();
                t_date[0].show();
                return;
            }
            if(timeInput.value === "" || timeInput.value == 'undefined') {
                t_time[0].enable();
                t_time[0].show();
                return;
            }    
            changeActiveStep(2);
            changeActiveNum(2);
        }      
    }

    function changeActiveStep(aStep) {
        aStep -= 1;
        switch(aStep) {
            case 0:
                mainHeading.innerHTML = 'Заказать уборку в три шага';
                firstStep.classList.remove('hidden');
                secondStep.classList.add('hidden');
                thirdStep.classList.add('hidden');
                
                prevBtn.classList.add('hidden');
                prevBtnBottom.classList.add('hidden');
                prevBtn.classList.remove('dop-uslugi');
                prevBtnBottom.classList.remove('dop-uslugi');
                prevBtn.classList.remove('end');
                prevBtnBottom.classList.remove('end');
                
                nextBtn.classList.remove('dop-uslugi');
                nextBtnBottom.classList.remove('dop-uslugi');
                nextBtn.classList.remove('end');
                nextBtnBottom.classList.remove('end');
                nextBtn.innerHTML = 'Далее';
                nextBtnBottom.innerHTML = 'Далее';
                activeStep = 0;
                break;
            case 1:
                mainHeading.innerHTML = 'Дополнительные услуги';
                firstStep.classList.add('hidden');
                secondStep.classList.remove('hidden');
                thirdStep.classList.add('hidden');
                
                prevBtn.classList.remove('hidden');
                prevBtnBottom.classList.remove('hidden');
                prevBtn.classList.add('dop-uslugi');
                prevBtnBottom.classList.add('dop-uslugi');
                prevBtn.classList.remove('end');
                prevBtnBottom.classList.remove('end');
                
                nextBtn.classList.add('dop-uslugi');
                nextBtnBottom.classList.add('dop-uslugi');
                nextBtn.classList.remove('end');
                nextBtnBottom.classList.remove('end');
                nextBtn.innerHTML = 'Далее';
                nextBtnBottom.innerHTML = 'Далее';
                activeStep = 1;
                break;
            case 2:
                mainHeading.innerHTML = 'Расскажите о себе';
                firstStep.classList.add('hidden');
                secondStep.classList.add('hidden');
                thirdStep.classList.remove('hidden');
                
                prevBtn.classList.remove('hidden');
                prevBtnBottom.classList.remove('hidden');
                prevBtn.classList.remove('dop-uslugi');
                prevBtnBottom.classList.remove('dop-uslugi');
                prevBtn.classList.add('end');
                prevBtnBottom.classList.add('end');
                
                nextBtn.classList.remove('dop-uslugi');
                nextBtnBottom.classList.remove('dop-uslugi');
                nextBtn.classList.add('end');
                nextBtnBottom.classList.add('end');
                nextBtn.innerHTML = 'Заказать';
                nextBtnBottom.innerHTML = 'Заказать';
                activeStep = 2;
                break;
        }
    }

    function changeActiveNum(activeNum) {
        let numList = numWrap.querySelectorAll('.num-wrap__item');
        
        activeNum -= 1;
        numList[activeNum].classList.add('num-wrap__item_active');
        numList[activeNum].classList.remove('num-wrap__item_done');
        switch(activeNum) {
            case 0:
                numList[1].classList.remove('num-wrap__item_active');
                numList[2].classList.remove('num-wrap__item_active');
                numList[1].classList.remove('num-wrap__item_done');
                numList[2].classList.remove('num-wrap__item_done');
                break;
            case 1:
                numList[0].classList.remove('num-wrap__item_active');
                numList[2].classList.remove('num-wrap__item_active');
                numList[2].classList.remove('num-wrap__item_done');
                numList[0].classList.add('num-wrap__item_done');
                break;
            case 2:
                numList[0].classList.remove('num-wrap__item_active');
                numList[1].classList.remove('num-wrap__item_active');
                numList[0].classList.add('num-wrap__item_done');
                numList[1].classList.add('num-wrap__item_done'); 
                break;
        }
    }

    numWrap.addEventListener('click', (evt) => {
        if(!evt.target.classList.contains('num-wrap__item') && !evt.target.parentNode.classList.contains('num-wrap__item'))
            return;

        let number = evt.target.classList.contains('num-wrap__item') ? evt.target.children[0].textContent : evt.target.textContent;
        if(number < (+activeStep + 1)) {
            changeActiveNum(number);
            changeActiveStep(number);
        }
    });

    function prevButtonClick(evt) {
        if (evt.target.classList.contains('end')) {
            evt.target.classList.remove('end');
            evt.target.classList.add('dop-uslugi');

            nextBtn.classList.remove('end');
            nextBtn.classList.add('dop-uslugi');
            nextBtnBottom.classList.remove('end');
            nextBtnBottom.classList.add('dop-uslugi');

            thirdStep.classList.add('hidden');
            secondStep.classList.remove('hidden');
            mainHeading.innerHTML = 'Дополнительные услуги';
            nextBtn.innerHTML = 'Далее';
            nextBtnBottom.innerHTML = 'Далее';
            
            changeActiveNum(2);
        } else if(evt.target.classList.contains('dop-uslugi')) {
            evt.target.classList.remove('dop-uslugi');
            nextBtn.classList.remove('dop-uslugi');
            nextBtnBottom.classList.remove('dop-uslugi');
            evt.target.classList.add('hidden');
            mainHeading.innerHTML = 'Заказать уборку в три шага';
            firstStep.classList.remove('hidden');
            secondStep.classList.add('hidden');
            
            changeActiveNum(1);
        }
    }






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
                sumOfAddServices -= +checkBox.dataset.servicePrice;
            }
            else {
                checkBox.checked = true;
                var li = document.createElement("li");
                li.setAttribute('class', 'order-service-item');
                li.setAttribute('data-index', checkBox.value);
                li.appendChild(document.createTextNode(closestItem.querySelector('.service-name').textContent));
                orderServiceList.appendChild(li);
                sumOfAddServices += +checkBox.dataset.servicePrice;
            }
            recalculateTotal()
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
    let sqDupMobile = document.getElementById('sqm-dup-mobile');
    let sqDupWrapMobile = document.querySelector('.input-num-mobile');

    sqMetersInput.addEventListener('change', ()=> {
        sqDup.value = sqMetersInput.value;
        sqDupMobile.value = sqMetersInput.value;
    });

    sqDup.addEventListener('change', sqChange);
    sqDupMobile.addEventListener('change', sqChange);

    function sqChange(evt) {
        if(evt.target.value <= 0) {
            evt.target.value = 1;

            updateOriginSq(evt.target.value);
            if (evt.target.id === 'sqm-dup-mobile') {
                t_mobileInputDisplay[0].enable();
                t_mobileInputDisplay[0].show();
            } else if (evt.target.id === 'sqm-dup') {
                t_orderInputDisplay[0].enable();
                t_orderInputDisplay[0].show();
            }
        }
        else {
            updateOriginSq(evt.target.value);
        }
    }


    sqDup.addEventListener('focusout', recalculateTotal);
    sqDup.addEventListener('input', recalculateTotal);
    sqDupMobile.addEventListener('focusout', recalculateTotal);
    sqDupMobile.addEventListener('input', recalculateTotal);
    
    sqDupWrap.addEventListener('click', sqClick);
    sqDupWrapMobile.addEventListener('click', sqClick);
   
    function sqClick(evt) {
        let sqD;
        if(evt.target.classList.contains('input-num-mobile') || evt.target.classList.contains('input-num')) {
            sqD = evt.target.querySelector('.input-num__display');
        } else {
            sqD = evt.target.parentNode.querySelector('.input-num__display');
        }

        if(evt.target.classList.contains('input-num__button_min')) {
            if(sqD.value <= 1) return;
            sqD.value = +sqD.value - 1;

            updateOriginSq(sqD.value);
        }
        else if(evt.target.classList.contains('input-num__button_plus')) {
            sqD.value = +sqD.value + 1;

            updateOriginSq(sqD.value);
        }
        recalculateTotal();
    }

    function updateOriginSq(newValue) {
        let event = new Event('change');    // Вынести в ф-цию
        sqMetersInput.value = newValue;  // Вынести в ф-цию
        sqMetersInput.dispatchEvent(event); // Вынести в ф-цию    
    }

    // SIDEBAR

    // Тип уборки 
    let typeOrder = document.querySelector('.order-type');
    let cleanTypeList = document.getElementsByName('clean-type');

    cleanTypeList.forEach(el => {
        el.addEventListener('change', function(evt) {
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
        streetStr = evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });
    streetInput.addEventListener('focusout', function(evt) {
        streetStr = evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });


    houseInput.addEventListener('change', function(evt) {
        houseStr = evt.target.value == '' ? '' : ', ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });
    houseInput.addEventListener('mouseleave', function(evt) {
        houseStr = evt.target.value == '' ? '' : ', ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });


    apartmentInput.addEventListener('change', function(evt) {
        apartmentStr = evt.target.value == '' ? '' : ', кв. ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });
    apartmentInput.addEventListener('mouseleave', function(evt) {
        apartmentStr = evt.target.value == '' ? '' : ', кв. ' + evt.target.value;
        addressResult = streetStr + houseStr + apartmentStr;
        orderAddr.textContent = addressResult; 
    });
    
    // Дата и время

    let orderDate = document.querySelector('.order-date');
    let dateStr = '';
    let timeStr = '';
    let dateAndTime = '';

    timeInput.addEventListener('change', function(evt){
        timeStr = evt.target.value;
        if(timeStr.substring(0, 2) > CLOSING_HOUR || timeStr.substring(0, 2) < OPENING_HOUR) {
            t_time[0].enable();
            t_time[0].show();
            evt.target.value = '';
            return;
        }
        if (timeStr == 'undefined') { 
            timeStr = '';
        }
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });

    timeInput.addEventListener('input', function(evt){
        timeStr = evt.target.value;
        if(timeStr.substring(0, 2) > CLOSING_HOUR || timeStr.substring(0, 2) < OPENING_HOUR) {
            t_time[0].enable();
            t_time[0].show();
            evt.target.value = '';
            return;
        }
        if (timeStr == 'undefined') { 
            timeStr = '';
        }
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });
    
    // Выбираем целевой элемент
    let target = document.querySelector('.ss-content');

    // Конфигурация observer (за какими изменениями наблюдать)
    const config = {
        attributes: true,
        attributeOldValue: true,
    };

    const ssList = document.querySelector('.ss-list').children;

    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if(!mutation.oldValue.includes('ss-open')) {
                    if (window.blockedTimeAndDates[currentDate] !== undefined) {
                        for (let i=0, child; child = ssList[i]; i++) {
                            for (let j = 0; j < window.blockedTimeAndDates[currentDate].length; j++) {
                                if (child.innerHTML === window.blockedTimeAndDates[currentDate][j])
                                    child.classList.add('ss-disabled');
                            }
                        }
                    }
                } else {
                    for (let i=0, child; child = ssList[i]; i++) {
                        if (!child.classList.contains('ss-option-selected'))
                            child.classList.remove('ss-disabled');
                    }
                }
            }
        }
    };

    // Создаем экземпляр наблюдателя с указанной функцией обратного вызова
    const observer = new MutationObserver(callback);

    // Начинаем наблюдение за настроенными изменениями целевого элемента
    observer.observe(target, config);

    



    


});
