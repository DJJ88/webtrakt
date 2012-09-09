(function () {

    var seed = .5, count = 0;

    function random() {
        seed *= 15.1;
        seed -= Math.floor(seed);
        return seed;
    }

    function smoothenPart(y0, y1, y2, y3) {
        if (y0 === undefined) {
            if (y3 === undefined) {
                return [y1, (y1 * 2 + y2) / 3, (y1 + y2 * 2) / 3, y2];
            } else {
                return [y1, 13 * y1 / 18 + y2 / 3 - y3 / 18, 5 * y1 / 18 + 5 * y2 / 6 - y3 / 9, y2];
            }
        } else if (y3 === undefined) {
            return [y1, -y0 / 9 + 5 * y1 / 6 + 5 * y2 / 18, -y0 / 18 + y1 / 3 + 13 * y2 / 18, y2];
        } else {
            return [y1, -y0 / 9 + 5 * y1 / 6 + y2 / 3 - y3 / 18, -y0 / 18 + y1 / 3 + 5 * y2 / 6 - y3 / 9, y2];
        }
    }

    function smoothenList(points) {
        if (points.length < 3) {
            return points;
        }
        var result = [], beziers = [], x, y, bezier;
        result.push(['M', points[0], points[1]]);
        for (var i = 0; i < points.length - 2;) {
            x = smoothenPart(points[i - 2], points[i], points[i + 2], points[i + 4]);
            i++;
            y = smoothenPart(points[i - 2], points[i], points[i + 2], points[i + 4]);
            i++;
            result.push(['C', x[1], y[1], x[2], y[2], x[3], y[3]]);
        }
        result.isBSegs = true;
        return result;
    }

    var sprite, list = [], old1 = [0, 0], old2 = [0, 0];
    /**
     * Demonstrates smoothening and cubic bezier Curve rendering
     */
    Ext.define('Kitchensink.view.FreeDraw', {
        extend: 'Ext.Panel',
        requires: ['Kitchensink.view.FreeDrawComponent'],
        lastEvent: 0,
        config: {
            cls: 'card1',
            layout: 'fit',
            items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',
                    items: [
                        {
                            text: 'Clear',
                            handler: function () {
                                var draw = Ext.getCmp('free-paint'),
                                    surface = draw.getSurface();
                                surface.getItems().clear();
                                surface.renderFrame();
                                draw.getSurface('overlay').getItems().clear();
                                draw.getSurface('overlay').renderFrame();
                            }
                        }
                    ]
                },
                {
                    xclass: 'Kitchensink.view.FreeDrawComponent',
                    id: 'free-paint'
                }
            ]
        }
    });
})();


