require('less/toast.less');

let Toast = (() => {
    class _Toast {
        constructor(msg, time = 1000) {
            this.msg = msg;
            this.dispearTime = time;
            this.createToast();
            this.showToast();
        }
        createToast () {
            let tpl = `<span class="toast">${this.msg}</span>`;
            this.$toast = $(tpl);
            $('body').append(this.$toast);
        }
        showToast () {
            this.$toast.fadeIn(() => {
                setTimeout(() => {
                    this.$toast.fadeOut();
                }, this.dispearTime);
            });
        }
    }

    return {
        init: (msg, time) => {
            new _Toast(msg, time);
        }
    }
})();

window.Toast = Toast;
module.exports = Toast;
