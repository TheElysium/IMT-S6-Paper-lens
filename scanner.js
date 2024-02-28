const scan = document.querySelector('.scan');
let toXray = document.querySelector('#skeleton');
let { x: toXrayX, y: toXrayY } = toXray.getBoundingClientRect();
const size = 50;
let isMouseDown = false;
const appContainer = document.getElementById('app');

var oldX = window.screenX,
    oldY = window.screenY;

var interval = setInterval(function(){
    if(oldX != window.screenX || oldY != window.screenY){
        console.log('moved!');
        updateScan();
    } else {
        console.log('not moved!');
    }

    oldX = window.screenX;
    oldY = window.screenY;
}, 1);

function updateScan() {

    appContainer.style.setProperty('--x', `${-window.screenX}px`);
    appContainer.style.setProperty('--y', `${-window.screenY}px`);
/*    appContainer.style.setProperty('--x', `0px`);
    appContainer.style.setProperty('--y', `0px`);*/
}
window.addEventListener('resize', () => {
    updateScan();
});

function handleSelectorClick(selector) {
    toXray.style.visibility = 'hidden';
    toXray = document.querySelector(selector);
    toXray.style.visibility = 'visible';
}

/*
document.querySelector('#skeletonSelector').addEventListener('click', () => handleSelectorClick('#skeleton'));
document.querySelector('#organsSelector').addEventListener('click', () => handleSelectorClick('#organs'));
*/

function init() {
    const coordinates = JSON.parse(localStorage.getItem('coordinates'));

    document.body.style.width = `${window.screen.width}px`;
    document.body.style.height = `${window.screen.height}px`;
    const skeleton = document.getElementById('skeleton');
    console.log(coordinates);
    skeleton.style.left = `${coordinates.x}px`;
    skeleton.style.top = `${coordinates.y}px`;

    updateScan();
}

window.addEventListener('load', () => {init()})