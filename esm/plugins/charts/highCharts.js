export async function barCharts(op) {
    // Dynamic import all Highcharts modules
    const [HighchartsModule, DataModuleModule, ExportingModule, OfflineExportingModule, AccessibilityModule] = await Promise.all([import('highcharts'), import('highcharts/modules/data'), import('highcharts/modules/exporting'), import('highcharts/modules/offline-exporting'), import('highcharts/modules/accessibility')]);
    const Highcharts = HighchartsModule;
    DataModuleModule(Highcharts);
    ExportingModule(Highcharts);
    OfflineExportingModule(Highcharts);
    AccessibilityModule(Highcharts);
    const { element, type = 'column', title = '', subtitle = '', xAxisTitle = '', xAxisType = 'category', yAxisTitle = '', series = [], drilldown = {} } = op;
    Highcharts.chart(element, {
        chart: {
            type,
        },
        title: {
            text: title,
        },
        subtitle: {
            text: subtitle,
        },
        accessibility: {
            announceNewData: {
                enabled: true,
            },
        },
        xAxis: {
            title: {
                text: xAxisTitle,
            },
            type: xAxisType,
        },
        yAxis: {
            title: {
                text: yAxisTitle,
            },
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}',
                },
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: ' + '<b>{point.y:.0f}</b> of total<br/>',
        },
        series,
        drilldown: {
            breadcrumbs: {
                position: {
                    align: 'right',
                },
            },
            ...drilldown,
        },
        exporting: {
            fallbackToExportServer: false,
            enabled: true,
        },
    });
}
//# sourceMappingURL=highCharts.js.map