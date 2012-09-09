Ext.define("StockApp.sprite.RangeMask", {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'sprite.rangemask',
    inheritableStatics: {
        def: {
            processors: {
                visibleRange: function (range) {
                    if (!Ext.isArray(range)) {
                        return;
                    }
                    if (range.length != 4) {
                        return;
                    }
                    if (range[0] > range[1]) {
                        range = [range[1], range[0], range[2], range[3]];
                    }
                    if (range[2] > range[3]) {
                        range = [range[0], range[1], range[3], range[2]];
                    }
                    return range;
                },
                handlerOpacity: 'number'
            },
            defaults: {
                lineWidth: 1,
                strokeStyle: 'black',
                visibleRange: [0, 1, 0, 1],
                handlerOpacity: 0
            }
        }
    },

    statics: {
        handler: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA0klEQVQ4je2UQQqDMBBFf0TcRImeQVB3ev9TxOWQQyQhuNIwXRRaodpidVX6IDDMhMefLCKYGeM4srUWZ6iqCn3fC6G15nme0XUdpJQQQhwSMTNCCCAiZFmGxFqLpmkgpXxcOHIAoCgKtG0L5xwSAMjz/NS6a0e6jn4Fyd6AiEBEb+tDwm+5XJgC799vPdur1/wTvvJ7CdPNLoC6rj/WW1y2cozxKZym6bQwhHAXlmUJYwy894gxHv4Pl2WBcw7GGCilIJgZWmv23p9KqJTCMAziBjssz22NueIYAAAAAElFTkSuQmCC',
        getImage: function (waiter) {
            if (StockApp.sprite.RangeMask.image) {
                StockApp.sprite.RangeMask.image.waiting.push(waiter);
                return StockApp.sprite.RangeMask.image;
            }
            var image = new Image();
            StockApp.sprite.RangeMask.image = image;
            image.waiting = [];
            image.onload = function () {
                image.waiting.forEach(function (sprite) {
                    sprite.setDirty(true);
                });
            };
            image.src = StockApp.sprite.RangeMask.handler;
            return image;
        }
    },

    getBBox: function (isWithoutTransform) {
        this.attr.bbox.plain = {x: 0, y: 0, width: 1, height: 1};
        if (isWithoutTransform) {
            return this.attr.bbox.plain;
        }
        return this.attr.bbox.transform || (this.attr.bbox.transform = this.attr.matrix.transformBBox(this.attr.bbox.plain));
    },

    render: function (surface, ctx) {
        var me = this,
            attr = me.attr,
            image = StockApp.sprite.RangeMask.getImage(me),
            matrix = attr.matrix.elements,
            xx = matrix[0],
            yy = matrix[3],
            dx = matrix[4],
            dy = matrix[5],
            visibleRange = attr.visibleRange;
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.lineTo(xx + dx, dy);
        ctx.lineTo(xx + dx, yy + dy);
        ctx.lineTo(dx, yy + dy);
        ctx.lineTo(dx, dy);
        ctx.moveTo(visibleRange[0] * xx + dx, visibleRange[2] * yy + dy);
        ctx.lineTo(visibleRange[0] * xx + dx, visibleRange[3] * yy + dy);
        ctx.lineTo(visibleRange[1] * xx + dx, visibleRange[3] * yy + dy);
        ctx.lineTo(visibleRange[1] * xx + dx, visibleRange[2] * yy + dy);
        ctx.lineTo(visibleRange[0] * xx + dx, visibleRange[2] * yy + dy);
        ctx.fill();
        ctx.globalAlpha *= attr.handlerOpacity;
        ctx.drawImage(image, Math.round(visibleRange[0] * xx + dx) - 10, Math.round(0.5 * yy + dy) - 10);
        ctx.drawImage(image, Math.round(visibleRange[1] * xx + dx) - 10, Math.round(0.5 * yy + dy) - 10);
    }
});