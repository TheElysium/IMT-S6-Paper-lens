const scan = document.querySelector('.scan');
let toXray = document.querySelector('#skeleton');
let { x: toXrayX, y: toXrayY } = toXray.getBoundingClientRect();
const size = 50;
let isMouseDown = false;
const appContainer = document.getElementById('app');

let oldX = window.screenX,
    oldY = window.screenY;

let interval = setInterval(function(){
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
    const coordinates = JSON.parse(localStorage.getItem('coordinates'));

    document.body.style.width = `${window.screen.width}px`;
    document.body.style.height = `${window.screen.height}px`;

    console.log(coordinates);
    toXray.style.left = `${coordinates.x}px`;
    toXray.style.top = `${coordinates.y}px`;

    appContainer.style.setProperty('--x', `${-window.screenX}px`);
    appContainer.style.setProperty('--y', `${-window.screenY}px`);
/*    appContainer.style.setProperty('--x', `0px`);
    appContainer.style.setProperty('--y', `0px`);*/
}
window.addEventListener('resize', () => {
    updateScan();
});

window.addEventListener('storage', (event) => {
    if (event.key === 'coordinates') {
        updateScan();
    }
});
function handleSelectorClick(selector) {
    toXray.style.visibility = 'hidden';
    toXray = document.querySelector(selector);
    toXray.style.visibility = 'visible';
    updateScan();
}
document.querySelector('#skeletonSelector').addEventListener('click', () => handleSelectorClick('#skeleton'));
document.querySelector('#organsSelector').addEventListener('click', () => handleSelectorClick('#organs'));

function init() {
    console.log(window.screenX, window.screenY)
    updateScan();
}

window.addEventListener('load', () => {init()})