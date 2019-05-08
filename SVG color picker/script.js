let selector = document.querySelector('#selector');
let slider = document.querySelector('.slider');
let ecran = document.querySelector('#ecran');
let R = document.querySelector("#R");
let G = document.querySelector("#G");
let B = document.querySelector("#B");
selector.onmousedown = function (event) {
    event.preventDefault(); // prevent selection start (browser action)

    let shiftY = event.clientY - selector.getBoundingClientRect().top;
    // shiftY not needed, the selector moves only horizontally

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newtop = event.clientY - shiftY - slider.getBoundingClientRect().top;

        // the pointer is out of slider => lock the selector within the bounaries
        if (newtop < 0) {
            newtop = 0;
        }
        let endOfSlide = 300;
        if (newtop > endOfSlide) {
            newtop = endOfSlide;
        }

        // selector.style.top = newtop + 'px';
        console.log(newtop + 'px');
        selector.setAttribute("points", `350,${60+newtop} 360,${55+newtop} 360,${65+newtop}`);
        ecran.setAttribute("fill", `rgb(${255-newtop},0,${newtop})`);
        R.innerHTML = `R : ${255-newtop}`;
        
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

selector.ondragstart = function () {
    return false;
};