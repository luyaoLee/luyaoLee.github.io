var less = require('less/toast.less');
var $ = require('jquery');

function _Toast(msg, time) {
    this.msg = msg;
    this.dismissTime = time || 1000;
    this.createToast();
    this.showToast();
}

_Toast.prototype = {
    createToast: function() {
        var tpl = '<div class="toast" style="display: none;">'+ this.msg + '</div>';
        this.$toast = $(tpl);
        $('body').append(this.$toast);
    },
    showToast: function() {
        var _this = this;
        this.$toast.fadeIn(function() {
            setTimeout(function() {
                _this.$toast.fadeOut();
            }, _this.dismissTime);
        });
    }
}

function Toast(msg, time) {
    return new _Toast(msg, time);
}

module.exports.Toast = Toast;
