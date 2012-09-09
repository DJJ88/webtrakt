/**
 * Demonstrates how use Ext.chart.LineChart
 */
Ext.define('Kitchensink.view.AreaChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.interactions.PanZoom', 'Ext.chart.series.Area', 'Ext.chart.axis.Numeric', 'Ext.chart.theme.LabelStyle'],
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
                            Ext.getStore('OrderItems').generateData(50);
                        }
                    }
                ]
            },
            {
                xtype: 'chart',
                store: 'OrderItems',
                background: 'white',
                colors: ["#43ffff", "#5bbbbb", "#538888", "#5da64e", "#e3e32e", "#878746", "#d5821d", "#d04646", "#6e4273", "#3e8aa8"],
                interactions: [
                    {
                        type: 'panzoom',
                        axes: {
                            "left": {
                                allowPan: false,
                                allowZoom: false
                            },
                            "bottom": {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'area',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        style: {
                            stroke: 'black',
                            maxBarWidth: 30
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        maximum: 5000,
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name',
                        visibleRange: [0, 0.25],
                        style: {
                            labelInSpan: false
                        }
                    }
                ]
            }
        ]
    },

    initialize: function () {
        this.callParent();
        var toolbar = Ext.ComponentQuery.query('toolbar', this)[0],
            interaction = Ext.ComponentQuery.query('interaction', this)[0];
        toolbar.add(interaction.getModeToggleButton());
    }
});