
document.addEventListener("DOMContentLoaded", function() {
    // alert('DOM READY!!!');
    var $j = jQuery.noConflict();

    // $j('.ns_vidget').insertAfter('#Wrapper');
    let myVidget = document.querySelector('.ns_vidget')
    document.getElementById('Wrapper').appendChild(myVidget);


    let sliderLine = document.querySelector('.ns_line_position');
    repositionVidget();
    window.onresize = repositionVidget;
    // function(event) {
    //   alert('RESIZED');
    // };

    // let sliderTel = document.querySelector('.ns_tel_position');
    

    function getOffsetLeft( elem ) {
        var offsetLeft = 0;
        do {
        if ( !isNaN( elem.offsetLeft ) )
        {
            offsetLeft += elem.offsetLeft;
        }
        } while( elem = elem.offsetParent );
        return offsetLeft;
    }

    function getOffsetTop( elem ) {
        var offsetTop = 0;
        do {
        if ( !isNaN( elem.offsetTop ) )
        {
            offsetTop += elem.offsetTop;
        }
        } while( elem = elem.offsetParent );
        return offsetTop;
    }

    function repositionVidget() {
        let telLeftOffset = getOffsetLeft(sliderLine);
        let telTopOffset = getOffsetTop(sliderLine);

        myVidget.style.top = (+telTopOffset + 10) + 'px';
        if (document.documentElement.clientWidth >= 320 && document.documentElement.clientWidth <= 479) {
            myVidget.style.left = 0 + 'px';
        } else {
            myVidget.style.left = telLeftOffset + 'px';
        }
    }

    IMask(document.querySelector('.ns_tel-input'), {
        mask: '+{7}(000)000-00-00'
    });

    let t_tel = tippy('.ns_tel-input', {
        content: 'Введите свой номер телефона',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    });
    t_tel[0].disable();

    let telInput = document.querySelector('.ns_tel-input');
    let form = document.querySelector('.ns_vidget_form');
    let submitBtn = document.querySelector('.ns_submit-btn');
    
    submitBtn.addEventListener('click', () => {
        if(window.getComputedStyle(telInput.parentNode, null).display != 'none' && telInput.value.length < 16) {
            t_tel[0].enable();
            t_tel[0].show();
            return;
        }
        form.submit();
    });

    


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
            
        });
    }); 



    // Кв метры

    let sqDup = document.getElementById('sqm-dup');
    let sqDupWrap = document.querySelector('.ns_input-num');

    sqDup.addEventListener('change', sqChange);

    function sqChange(evt) {
        if(evt.target.value <= 0) {
            evt.target.value = 1;
        }
    }

    sqDupWrap.addEventListener('click', sqClick);
   
    function sqClick(evt) {
        if(evt.target.classList.contains('ns_sq-btn-min')) {
            if(sqDup.value <= 1) return;
            sqDup.value = +sqDup.value - 1;
        }
        else if(evt.target.classList.contains('ns_sq-btn-plus')) {
            sqDup.value = +sqDup.value + 1;
        }
    }

});
