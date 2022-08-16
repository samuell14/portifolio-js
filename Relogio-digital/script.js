let relDigital = document.querySelector('.digital');
let pontSeg = document.querySelector('.p_s');
let pontMin = document.querySelector('.p_m');
let pontHor = document.querySelector('.p_h');

function updateClock () {

    let now = new Date ();
    let hr = now.getHours();
    let min = now.getMinutes();
    let seg = now.getSeconds();

    relDigital.innerHTML = `${fixZero(hr)}:${fixZero(min)}:${fixZero(seg)}`;

    let PontS = (360 / 60) * seg - 90;
    let PontM = (360 / 60) * min - 90;
    let PontH = (360 / 12) * hr - 90;

    pontSeg.style.transform = `rotate(${PontS}deg)`;
    pontMin.style.transform = `rotate(${PontM}deg)`;
    pontHor.style.transform = `rotate(${PontH}deg)`;

}

setInterval(updateClock, 1000);
updateClock();

function fixZero(time) {

if (time < 10)  {
    return '0'+time
} else {
    return time
}

}
