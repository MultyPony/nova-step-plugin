jQuery(function($){
    let curDate = new Date();
    let blockedDates = [];

    getBlockedDates();

    let btnRes = document.querySelector('.reserve-btn');

    $('.date-input').datepicker({  
        onRenderCell: function (date, cellType) {
            // if (cellType == 'day' && isBlockedDate(date)) {
            //     console.log("blocked date: " + dateToString(date));
            //     return {
            //         disabled: true
            //     }
            // }
            
            if (cellType == 'day' && dateToString(curDate) === dateToString(date)) {
                return {
                    disabled: false
                }
            }

            if (cellType == 'day' && window.blockedTimeAndDates[dateToString(date)] != undefined) {
                return {
                    html: date.getDate() + '<span class="dp-note"></span>'
                }
            }
        },

        onSelect: function onSelect(fd, date) {
            let titleDate = document.querySelector('.checked-date');
            let list = document.querySelector('.time-list');
            
            titleDate.textContent = fd;
            list.innerHTML = "";

            if (date && window.blockedTimeAndDates[dateToString(date)] != undefined) {
                renderList(dateToString(date), list);
                btnRes.removeAttribute('hidden');
            }
            else {
                btnRes.setAttribute('hidden', 'hidden');
                // Нет брони
            }
        }
    });

    btnRes.addEventListener('click', (evt) => {
        evt.preventDefault();
        let titleDate = document.querySelector('.checked-date').textContent;
        let list = document.querySelector('.time-list');

        let checkboxList = document.getElementsByName('time-reserve');
        for( i = 0; i < checkboxList.length; i++ ) {
            if(checkboxList[i].checked) {
                let index = window.blockedTimeAndDates[titleDate].indexOf(checkboxList[i].value);
                window.blockedTimeAndDates[titleDate].splice(index, 1);
                // console.log('checked: ' + checkboxList[i].value);
            }
        }
        if (window.blockedTimeAndDates[titleDate].length == 0) {
            delete window.blockedTimeAndDates[titleDate];
        }
        renderList(titleDate, list);
        updateDates();
    });

    function renderList(date, list) {
        list.innerHTML = "";
        if (window.blockedTimeAndDates[date] == undefined) {
            btnRes.setAttribute('hidden', 'hidden');
            return;
        }
        let timeArr = window.blockedTimeAndDates[date].sort();
        let item;

        for (let i = 0; i < timeArr.length; i++) {
            item = document.createElement("li");
            item.innerHTML = `<label><input type="checkbox" name="time-reserve" value="${timeArr[i]}">${timeArr[i]}</label>`;
            list.appendChild(item);
        }
    }

    function updateDates() {
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action : 'update_dates',
                dates: window.blockedTimeAndDates,
            },
            success: function (response) {
                console.log('AJAX response : ', response);
            }
        });
    }
    

    function getBlockedDates() {
        for(let b in window.blockedTimeAndDates) {
            if (window.blockedTimeAndDates[b].length === 13) {
                blockedDates.push(b);
            }
        }
    }

    function isBlockedDate(date){
        let dStr = dateToString(date);

        for(let i = 0; i < blockedDates.length; i++) {
            if (dStr === blockedDates[i]) {
                console.log("return true!");
                return true;
            }
        }
    }

    function dateToString(date) {
        let day = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate();
        let month = date.getMonth().toString().length == 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let year = date.getFullYear();
        return (day + '.' + month + '.' + year);
    }

    function getBlockedDates() {
        for(let b in window.blockedTimeAndDates) {
            if (window.blockedTimeAndDates[b].length === 13) {
                blockedDates.push(b);
            }
        }
    }


    
});