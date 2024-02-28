const appContainer = document.getElementById('app');
appContainer.style.setProperty('--x', `0px`);
appContainer.style.setProperty('--y', `0px`);


// Usage
function getDivCoordinatesRelativeToScreen(divId) {
    const div = document.getElementById(divId);
    const rect = div.getBoundingClientRect();
    return {
        x: rect.left + window.screenX,
        y: rect.top + window.screenY
    };
}

console.log(getDivCoordinatesRelativeToScreen('body'));
localStorage.setItem('coordinates', JSON.stringify(getDivCoordinatesRelativeToScreen('body')));

