(() => {
    let time = performance.timing;

    window.addEventListener('load', () => {
        const timeStamp = document.querySelector('#timestamp');
        timeStamp.innerHTML += ` + ${(time.loadEventStart - time.navigationStart)} ms (server)`;
    });
})();