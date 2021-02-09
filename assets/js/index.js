"use strict";

let repositionCounter = 0;

function getOffsets(elem) {
    let offsets = [0, 0];

    do {
        if (!isNaN(elem.offsetLeft)) {
            offsets[0] += elem.offsetLeft;
        }
        if (!isNaN(elem.offsetTop)) {
            offsets[1] += elem.offsetTop;
        }
    } while( elem = elem.offsetParent);
    return offsets;
}

function repositionVidget() {
    let elem = document.querySelector('.ns_vidget');
    let offsets = getOffsets(document.querySelector('.ns_line_position'));

    elem.style.top = (+offsets[1] + 10) + 'px';
    if (document.documentElement.clientWidth >= 320 && document.documentElement.clientWidth <= 479) {
        elem.style.left = 0 + 'px';
    } else {
        elem.style.left = offsets[0] + 'px';
    }
    console.log('Vidget-reposition #' + ++repositionCounter);
}

function sqChange(evt) {
    if(evt.target.value <= 0) {
        evt.target.value = 1;
    }
}

function sqClick(evt) {
    let eTarget = evt.target;
    let sqDup = document.getElementById('sqm-dup');

    if(eTarget.classList.contains('ns_sq-btn-min')) {
        if(sqDup.value <= 1) return;
        sqDup.value = +sqDup.value - 1;
    }
    else if(eTarget.classList.contains('ns_sq-btn-plus')) {
        sqDup.value = +sqDup.value + 1;
    }
}

function init() {
    // window.onresize = repositionVidget;
    // window.onmousemove = repositionVidget;
    

    // document.getElementById('Wrapper').appendChild(document.querySelector('.ns_vidget'));

    // repositionVidget();

    let telInput = document.querySelector('.ns_tel-input');
    IMask(telInput, {
        mask: '+{7}(000)000-00-00'
    });

    let telephoneTip = tippy('.ns_tel-input', {
        content: 'Введите свой номер телефона',
        placement: 'bottom',
        theme: 'tomato',
        trigger: 'manual',
    })[0];
    telephoneTip.disable();

    let form = document.querySelector('.ns_vidget_form');
    let submitBtn = form.querySelector('.ns_submit-btn');

    submitBtn.addEventListener('click', () => {
        if(window.getComputedStyle(telInput.parentNode, null).display != 'none' && telInput.value.length < 16) {
            telephoneTip.enable();
            telephoneTip.show();
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
    sqDupWrap.addEventListener('click', sqClick);   


    
}

document.addEventListener("DOMContentLoaded", init);

window.addEventListener("load", ()=> {
    let parent = document.querySelector('.ns_line_position').parentElement;
    parent.appendChild(document.querySelector('.ns_vidget'));
    parent.style.display = 'flex';
    parent.style.flexDirection = 'column';
});
