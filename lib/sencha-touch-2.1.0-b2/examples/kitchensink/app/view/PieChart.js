/**
 * Demonstrates how use Ext.chart.series.Pie
 */
Ext.define('Kitchensink.view.PieChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 'Ext.chart.interactions.Rotate'],
    config: {
        cls: 'card1',
        layout: 'fit',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconCls: 'refresh',
                        iconMask: true,
                        text: '&nbsp;Refresh',
                        handler: function (a, b, c, d, e) {
                            Ext.ComponentQuery.query('polar')[0].setAnimate({
                                duration: 500,
                                easing: 'easeInOut'
                            });
                            Ext.getStore('Pie').generateData(10);
                        }
                    }
                ]
            },
            {
                xtype: 'polar',
                store: 'Pie',
                colors: ['rgb(220,255,255)', 'rgb(199,232,232)', 'rgb(169,203,203)', 'rgb(185,219,178)', 'rgb(245,245,181)',
                         'rgb(203,203,155)', 'rgb(241,202,154)', 'rgb(239,192,192)', 'rgb(186,143,191)', 'rgb(162,204,221)'],
                background: 'white',
                interactions: 'rotate',
                animate: {
                    duration: 1500,
                    easing: 'easeIn'
                },
                series: [
                    {
                        type: 'pie',
                        field: 'g1',
//                        lengthField: 'value',
                        donut: 30,
                        style: {
                            stroke: 'white',
                            miterLimit: 10,
                            lineCap: 'miter',
                            lineWidth: 2
                        }
                    }
                ],
                axes: [
                ]
            }
        ]
    },
    initialize: function () {
        this.callParent();
        Ext.getStore('Pie').generateData(10);
    }
});
