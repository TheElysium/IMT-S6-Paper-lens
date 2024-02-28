const scan = document.querySelector('.scan');
let toXray = document.querySelector('#skeleton');
let { x: toXrayX, y: toXrayY } = toXray.getBoundingClientRect();
const size = 50;
let isMouseDown = false;

function updateScan() {
    const [computedY, , , computedX] = toXray.style.clipPath
        .split('(')[1]
        .split(')')[0]
        .split(' ')
        .map(position => Number(position.replace('px', '').trim()));

    const clipPathX = computedX + size;
    const clipPathY = computedY + size;

    scan.style.setProperty('--x', `${toXrayX + clipPathX - size}px`);
    scan.style.setProperty('--y', `${toXrayY + clipPathY - size}px`);
}

scan.addEventListener('mousedown', () => isMouseDown = true);
scan.addEventListener('mouseup', () => isMouseDown = false);

scan.addEventListener('mousemove', event => {
    if (!isMouseDown) return;
    const { clientX, clientY } = event;

    toXray.style.clipPath = `inset(${clientY - toXrayY - size}px ${400 - (clientX - toXrayX) - size}px ${584 - (clientY - toXrayY) - size}px ${clientX - toXrayX - size}px round 10px)`;

    scan.style.setProperty('--x', `${clientX - size}px`);
    scan.style.setProperty('--y', `${clientY - size}px`);
});

window.addEventListener('resize', () => {
    ({ x: toXrayX, y: toXrayY } = toXray.getBoundingClientRect());
    updateScan();
});

function handleSelectorClick(selector) {
    const clipPathValue = toXray.style.clipPath;
    toXray.style.visibility = 'hidden';
    toXray = document.querySelector(selector);
    toXray.style.visibility = 'visible';
    toXray.style.clipPath = clipPathValue;
}

document.querySelector('#skeletonSelector').addEventListener('click', () => handleSelectorClick('#skeleton'));
document.querySelector('#organsSelector').addEventListener('click', () => handleSelectorClick('#organs'));

function init() {
    toXray.style.clipPath = 'inset(155px 119px 330px 182px round 15px)';
    updateScan();
}

init();