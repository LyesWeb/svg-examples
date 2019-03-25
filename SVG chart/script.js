let data = [12, 14,34,56];
let chart = document.querySelector('#chart');
let x = 60;
let yInt = 350;
let width = 20;
let max = Math.max(...data);
let betwen = 50;
betwen = 600/data.length;
let heights = [];
data.forEach(e => {
    // regle
    let r = document.createElementNS("http://www.w3.org/2000/svg", "text");
    r.appendChild(document.createTextNode(e+" -"));
    r.setAttribute("x", 15);
    r.setAttribute("y", yInt-(e*yInt/max) +30);
    chart.appendChild(r);

    // bar
    let b = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    b.setAttribute("x", x);
    b.setAttribute("y", yInt-(e*yInt/max) +30);
    b.setAttribute("width", width);
    b.setAttribute("height", e*yInt/max);
    b.setAttribute("fill", "#222");
    b.setAttribute("class", "br");
    chart.appendChild(b);

    // label
    let l = document.createElementNS("http://www.w3.org/2000/svg", "text");
    l.appendChild(document.createTextNode(e));
    l.setAttribute("x", x+3);
    l.setAttribute("y", 395);
    chart.appendChild(l);

    x += betwen;
});