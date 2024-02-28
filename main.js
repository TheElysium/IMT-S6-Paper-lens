let oldX = window.screenX,
    oldY = window.screenY;
setInterval(function () {
    if (oldX !== window.screenX || oldY !== window.screenY) {
        localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));
    } else {
    }
    oldX = window.screenX;
    oldY = window.screenY;
}, 10);

function getDivCoordinatesRelativeToScreen(divId) {
    const div = document.getElementById(divId);
    const rect = div.getBoundingClientRect();
    console.log(window.screenX, window.screenY)
    return {
        x: rect.left + window.screenX,
        y: rect.top + window.screenY
    };
}

function handleOpenLensClick() {
    console.log("button clicked")
    window.open('./scanner.html', "_blank", "popup width=400 height=400")
}
window.addEventListener('resize', () => {
    localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));
});

document.getElementById('open-lens').addEventListener('click', handleOpenLensClick);

localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));