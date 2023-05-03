const socket = io(window.location.origin);

const createToaster = (answer) => {
  toastr.options.closeButton = true;
  toastr.options = {  positionClass: 'toast-absolute toast-bottom-right',
    preventDuplicates: true,  showDuration: '300',
    hideDuration: '1000',  timeOut: '50000',
    extendedTimeOut: '10000',  showEasing: 'swing',
    hideEasing: 'linear',  showMethod: 'fadeIn',
    hideMethod: 'fadeOut',  progressBar: true,
    tapToDismiss: false,  closeButton: true,
    closeHtml: '<button><i class="fa fa-times"></i></button>',  closeMethod: 'fadeOut',
    closeDuration: '300',  closeEasing: 'swing',
    newestOnTop: true,  maxOpened: 0,
    preventOpenDuplicates: true,  onclick: null,
    onShown: null,  onHidden: null,
    onCloseClick: null,
    escapeHtml: false,  target: 'body',
    toastClass: 'toast',
    containerId: 'toast-container',  debug: false,
    fadeIn: 300,  fadeOut: 1000,
    timeOutProgress: true,  rtl: false,
    onClose: null,};
  toastr.info(`Появилась акция на товар ${answer.name}, цена: ${answer.newPrice} руб.`);
};

socket.on('newSpecial', (answer) => {
  createToaster(answer);
});