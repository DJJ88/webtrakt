Ext.define("Kitchensink.store.StockPrice", {
    alias: 'store.StockPrice',
    requires: ['Kitchensink.model.OHLC'],
    extend: 'Ext.data.Store',
    config: {
        model: 'Kitchensink.model.OHLC',
        data: []
    },
    generateData: (function () {
        var seed = 1.3;

        // Controllable random.
        function random() {
            seed *= 7.3;
            seed -= Math.floor(seed);
            return seed * 2 - 1;
        }

        return function (count) {
            var data = [], i = 0, record = {
                time: new Date('Jan 1 2010'),
                open: 1000,
                high: 1100,
                low: 900,
                close: 1000
            };
            for (i = 0; i < count; i++) {
                var ohlc = [random() * 30, random() * 30, random() * 30, random() * 30];
                ohlc.sort(function (a, b) {return a - b;});
                record = {
                    time: record.time + 3600000,
                    open: record.close + ohlc[1],
                    high: record.close + ohlc[3],
                    low: record.close + ohlc[0],
                    close: record.close + ohlc[2]
                };
                data.push(record);
            }
            this.setData(data);
        };
    })(),
    constructor: function () {
        this.callParent(arguments);
        this.generateData(1000);
        return this;
    }
});