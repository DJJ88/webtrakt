/**
 * Demonstrates how use Ext.chart.ColumnChartStacked
 */
Ext.define('Kitchensink.view.ColumnChartStacked', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.interactions.PanZoom',
        'Ext.chart.series.Column', 'Ext.chart.axis.Numeric',
        'Ext.chart.theme.LabelStyle', 'Ext.chart.axis.Category'],
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
                innerPadding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                },
                colors: ['rgb(220,255,255)', 'rgb(199,232,232)', 'rgb(169,203,203)', 'rgb(185,219,178)', 'rgb(245,245,181)',
                         'rgb(203,203,155)', 'rgb(241,202,154)', 'rgb(239,192,192)', 'rgb(186,143,191)', 'rgb(162,204,221)'],
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
                        type: 'column',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5'],
                        style: {
                            stroke: 'rgb(40,40,40)',
                            maxBarWidth: 30
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5'],
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
                        visibleRange: [0, 0.5],
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