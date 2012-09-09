/**
 * Demonstrates how use Ext.chart.series.Pie
 */
Ext.define('Kitchensink.view.PieChart3D', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.SpaceFillingChart', 'Ext.chart.series.Pie3D', 'Ext.chart.interactions.RotatePie3D'],
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
                        handler: function () {
                            Ext.ComponentQuery.query('spaceFilling')[0].setAnimate({
                                duration: 500,
                                easing: 'easeInOut'
                            });
                            Ext.getStore('Pie').generateData(10);
                        }
                    }
                ]
            },
            {
                xclass: 'Ext.chart.SpaceFillingChart',
                store: 'Pie',
                colors: ["#43ffff", "#5bbbbb", "#538888", "#5da64e", "#e3e32e", "#878746", "#d5821d", "#d04646", "#6e4273", "#3e8aa8"],
                background: 'white',
                
                interactions: 'rotatePie3d',
                
                animate: {
                    duration: 1500,
                    easing: 'easeIn'
                },
                
                series: [
                    {
                        type: 'pie3d',
                        field: 'g1',
                        donut: 30,
                        distortion: 0.7,
                        style: {
                            stroke: "white"
                        }
                    }
                ]
            }
        ]
    },
    initialize: function () {
        this.callParent();
        Ext.getStore('Pie').generateData(10);
    }
});
