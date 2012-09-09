/**
 * Demonstrates how use Ext.chart.LineChart
 */
Ext.define('Kitchensink.view.CategoryAxis', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.series.Scatter', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Category', 'Ext.chart.theme.LabelStyle'],
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
                interactions: [
                    'panzoom'
                ],
                innerPadding: {
                    left: 10,
                    top: 0,
                    right: 10,
                    bottom: 0
                },
                series: [
                    {
                        type: 'scatter',
                        xField: 'name',
                        yField: 'g1',
                        background: {
                            fill: 'white'
                        },
                        marker: {
                            type: 'path',
                            path: [
                                ['M' , 0, 1],
                                ['L', 1, 0],
                                ['L', 0, -1],
                                ['L', -1, 0],
                                ['Z']
                            ],
                            scale: 5,
                            fill: 'rgba(143,203,203,0.90)',
                            miterLimit: 1,
                            lineCap: 'butt',
                            lineWidth: 1
                        }
                    },
                    {
                        type: 'line',
                        xField: 'name',
                        yField: 'g2',
                        style: {
                            stroke: 'black',
                            fill: '#4572A7'
                        },
                        marker: {
                            type: 'circle',
                            radius: 5,
                            fill: 'rgba(203,143,203,0.90)',
                            miterLimit: 1,
                            lineCap: 'butt',
                            lineWidth: 1
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4'],
                        minimum: 0,
                        maximum: 1000,
                        visibleRange: [0, 0.5],
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        visibleRange: [0, 0.5],
                        fields: 'name'
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