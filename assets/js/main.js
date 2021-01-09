const OPENING_HOUR = 9;
const CLOSING_HOUR = 21;

document.addEventListener("DOMContentLoaded", function() {
// window.addEventListener("load", function() {
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
        content: 'Выберите время между 9:00 и 18:00',
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
        // ДОБАВИТЬ ДОП. УСЛУГИ
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


    // dateInput.datepicker();
    let curDate = new Date();

    function dateToString(date) {
        let day = date.getDate().toString.length == 1 ? '0' + date.getDate() : date.getDate();
        let month = date.getMonth().toString.length == 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let year = date.getFullYear();
        return (day + '.' + month + '.' + year);
    }

    $('.date-input').datepicker({
        onHide: function(inst, animationCompleted) {
            if(animationCompleted) {
                console.log("YEAHHH BEATCHHH!!");
                console.log(inst.el.value);
                let year = inst.el.value.substring(6,10);
                let month = inst.el.value.substring(3,5);
                let day = inst.el.value.substring(0,2);
                console.log('DATE: ' + +year);
                
                if (day == '' || month == '' || year == '')
                    dateStr = '';
                else
                    dateStr = day + '.' + month + '.' + year;
                dateAndTime = dateStr + ' ' + timeStr;
                orderDate.textContent = dateAndTime;
            }
        },
        onSelect: function(formattedDate, date, inst) {
            console.log("YEAHHH BEATCHHH!!");
            console.log(formattedDate);
            let year = inst.el.value.substring(6,10);
            let month = inst.el.value.substring(3,5);
            let day = inst.el.value.substring(0,2);
            console.log('DATE: ' + +year);
            
            if (day == '' || month == '' || year == '')
                dateStr = '';
            else
                dateStr = day + '.' + month + '.' + year;
            dateAndTime = dateStr + ' ' + timeStr;
            orderDate.textContent = dateAndTime;
            
        },
        onRenderCell: function (date, cellType) {
            // var dateR = new Date();
            // let day = curDate.getDate().toString.length == 1 ? '0' + curDate.getDate() : curDate.getDate();
            // let month = curDate.getMonth().toString.length == 1 ? '0' + (curDate.getMonth() + 1) : curDate.getMonth() + 1;
            // let year = curDate.getFullYear();
            // let curD = day + '.' + month + '.' + year;

            // console.log(dateToString(curDate));
            if (cellType == 'day' && dateToString(curDate) === dateToString(date)) {
                return {
                    disabled: false
                }
            }
            // let cellDay = date.getTime();
            if (cellType == 'day' && date.getTime() < curDate.getTime()) {    
                return {
                    disabled: true
                }
            }
        }
    }
    );

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
            // evt.target.classList.remove('dop-uslugi');
            // evt.target.classList.add('end');
            // prevBtn.classList.remove('dop-uslugi');
            // prevBtn.classList.add('end');
            // prevBtnBottom.classList.remove('dop-uslugi');
            // prevBtnBottom.classList.add('end');
            // evt.target.innerHTML = 'Заказать';

            // mainHeading.innerHTML = 'Расскажите о себе';
            // secondStep.classList.add('hidden');
            // thirdStep.classList.remove('hidden');

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
            // mainHeading.innerHTML = 'Дополнительные услуги';
            // firstStep.classList.add('hidden');
            // secondStep.classList.remove('hidden');
            // prevBtn.classList.remove('hidden');
            // prevBtn.classList.add('dop-uslugi');
            // prevBtnBottom.classList.remove('hidden');
            // prevBtnBottom.classList.add('dop-uslugi');
            // evt.target.classList.add('dop-uslugi');

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
                // orderServiceList.appendChild(document.createElement("li").textContent = closestItem.querySelector('.service-name').textContent);
                var li = document.createElement("li");
                li.setAttribute('class', 'order-service-item');
                li.setAttribute('data-index', checkBox.value);
                li.appendChild(document.createTextNode(closestItem.querySelector('.service-name').textContent));
                orderServiceList.appendChild(li);
                sumOfAddServices += +checkBox.dataset.servicePrice;
                // orderServiceList.textContent = closestItem.querySelector('.service-name').textContent
                
            }
            recalculateTotal()
            // console.log('checkbox ' + checkBox.checked);
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

    // dateInput.addEventListener('change', function(evt){
    //     let year = evt.target.value.substring(0,4);
    //     let month = evt.target.value.substring(5,7);
    //     let day = evt.target.value.substring(8,10);
    //     console.log('DATE: ' + +year);

    //     dateStr = day + '.' + month + '.' + year;
    //     dateAndTime = dateStr + ' ' + timeStr;
    //     orderDate.textContent = dateAndTime;
    // });

    timeInput.addEventListener('change', function(evt){
        console.log(evt.target.value);
        timeStr = evt.target.value;
        if(timeStr.substring(0, 2) > CLOSING_HOUR || timeStr.substring(0, 2) < OPENING_HOUR) {
            t_time[0].enable();
            t_time[0].show();
            evt.target.value = '';
            return;
        }
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });
    timeInput.addEventListener('input', function(evt){
        console.log(evt.target.value);
        timeStr = evt.target.value;
        if(timeStr.substring(0, 2) > CLOSING_HOUR || timeStr.substring(0, 2) < OPENING_HOUR) {
            t_time[0].enable();
            t_time[0].show();
            evt.target.value = '';
            return;
        }
        dateAndTime = dateStr + ' ' + timeStr;
        orderDate.textContent = dateAndTime;
    });

    




    


});
