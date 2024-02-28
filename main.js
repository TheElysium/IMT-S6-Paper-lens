function getDivCoordinatesRelativeToScreen(divId) {
    const div = document.getElementById(divId);
    const rect = div.getBoundingClientRect();
    console.log(window.screenX, window.screenY)
    return {
        x: rect.left + window.screenX,
        y: rect.top + window.screenY
    };
}
localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));

let oldX = window.screenX,
    oldY = window.screenY;

let interval = setInterval(function(){
    if(oldX !== window.screenX || oldY !== window.screenY){
        localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));
    } else {
    }

    oldX = window.screenX;
    oldY = window.screenY;
}, 1);

window.addEventListener('resize', () => {
    localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));
});

function handleOpenLensClick(){
    window.open('scanner.html', "_blank", "popup width=400 height=400")
}

document.getElementById('open-lens').addEventListener('click', handleOpenLensClick);