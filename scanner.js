let toXray = document.querySelector('#skeleton');
const appContainer = document.getElementById('app');

let isPopup = false;
if (window.opener && window.opener !== window) {
    isPopup = true;
}

let oldX = window.screenX,
    oldY = window.screenY;
setInterval(function () {
    if (oldX !== window.screenX || oldY !== window.screenY) {
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
    toXray.style.top = `${coordinates.y + (isPopup ? 12 : 0)}px`;

    appContainer.style.setProperty('--x', `${-window.screenX}px`);
    appContainer.style.setProperty('--y', `${-window.screenY}px`);
}

function handleSelectorClick(selector) {
    toXray.style.visibility = 'hidden';
    toXray = document.querySelector(selector);
    toXray.style.visibility = 'visible';
    updateScan();
}

function init() {
    console.log(window.screenX, window.screenY)
    updateScan();
}

window.addEventListener('resize', () => {
    updateScan();
});

window.addEventListener('storage', (event) => {
    if (event.key === 'coordinates') {
        updateScan();
    }
});
document.querySelector('#skeletonSelector').addEventListener('click', () => handleSelectorClick('#skeleton'));
document.querySelector('#organsSelector').addEventListener('click', () => handleSelectorClick('#organs'));

window.addEventListener('load', () => {
    init()
})