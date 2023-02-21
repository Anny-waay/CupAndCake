(() => {
    let time = performance.timing;

    window.addEventListener('load', () => {
        const timeStamp = document.querySelector('#timestamp');
        timeStamp.innerHTML += `Время загрузки страницы: ${(time.loadEventStart - time.navigationStart) / 1000} секунд`;
    });
})();