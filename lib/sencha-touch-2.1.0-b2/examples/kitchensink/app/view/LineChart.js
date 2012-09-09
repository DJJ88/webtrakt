/**
 * Demonstrates how use Ext.chart.series.Line
 */
Ext.define('Kitchensink.view.LineChart', {
    extend: 'Ext.Panel',
    requires: ['Ext.chart.Chart', 'Ext.chart.series.Line', 'Ext.chart.axis.Numeric', 'Ext.chart.axis.Time', 'Ext.chart.theme.LabelStyle'],
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
                    }
                ]
            },
            {
                xtype: 'chart',
                store: 'USD2EUR',
                background: 'white',
                interactions: [
                    {
                        type: 'panzoom',
                        zoomOnPanGesture: false
                    }
                ],
                series: [
                    {
                        type: 'line',
                        xField: 'time',
                        yField: 'value',
                        style: {
                            stroke: 'rgb(143,203,203)',
                            fill: 'rgba(143,203,203,0.3)',
                            miterLimit: 3,
                            lineCap: 'miter',
                            lineWidth: 2
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['value']
                    },
                    {
                        type: 'time',
                        dateFormat: 'Y-m-d',
                        visibleRange: [0, 0.25],
                        position: 'bottom',
                        fields: 'time'
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