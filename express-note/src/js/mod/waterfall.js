let Waterfall = (() => {
    class _Waterfall {
        constructor($ct) {
            this.$ct = $ct;
            this.$item = this.$ct.children();
            this.render();
            this.bindEvent();
        }
        render() {
            let itemWidth = this.$item.outerWidth(true);
            let columns = parseInt($(window).width() / itemWidth);
            let colSumHeights = new Array(columns).fill(0);

            this.$item.each(() => {
                let minSumHeight = Math.min.apply(null, colSumHeights);
                let idx = colSumHeights.indexOf(minSumHeight);

                $(this).css({
                    left: itemWidth * idx,
                    top: minSumHeight
                });
                colSumHeights[idx] += $(this).outerWidth(true);
            });
        }
        bindEvent() {
            $(window).resize(() => {
                this.render();
            });
        }

        return {
            init: $ct => {
                new _Waterfall($ct);
            }
        }
    }
})()

window.Waterfall = Waterfall;
module.exports = Waterfall;
