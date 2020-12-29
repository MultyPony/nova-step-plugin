
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

});
