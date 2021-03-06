import Highcharts from 'highcharts/highstock.src';

const formatDate = date =>
    Highcharts.dateFormat('%a %d %b %H:%M:%S', date);

const htmlForTickTime = (point) =>
    `<div class="date-row">${formatDate(point.x)}</div>`;

const htmlForCandleTime = (point) =>
    `<div class="date-row">${formatDate(point.x)}</div>
    <div class="date-row">${formatDate(point.x + point.series.closestPointRange)}</div>`;

const htmlForTicks = (point, pipSize) => `
    <div class="binary-chart-info-bar">
        ${htmlForTickTime(point)}
        <div class="value-row"><span>${point.series.name}</span><span>${point.y.toFixed(pipSize)}</span></div>
    </div>
`;

const htmlForCandles = (point, pipSize) => `
    <div class="binary-chart-info-bar">
        ${htmlForCandleTime(point)}
        <div class="value-row">${point.series.name}</div>
        <div class="ohlc-row"><span>Open</span><span>${point.open.toFixed(pipSize)}</span></div>
        <div class="ohlc-row"><span>High</span><span>${point.high.toFixed(pipSize)}</span></div>
        <div class="ohlc-row"><span>Low</span><span>${point.low.toFixed(pipSize)}</span></div>
        <div class="ohlc-row"><span>Close</span><span>${point.close.toFixed(pipSize)}</span></div>
    </div>
`;

export default () => ({
    mouseOut: function mouseLeave() {
        const binaryChartDiv = this.series.chart.renderTo.parentNode;
        binaryChartDiv.getElementsByClassName('binary-chart-info-container')[0].innerHTML = '';
    },
    mouseOver: function mouseOver() {
        const chart = this.series.chart;
        const binaryChartDiv = chart.renderTo.parentNode;
        const { pipSize } = chart.userOptions.binary;
        const htmlFunc = this.series.type === 'line' || this.series.type === 'area' ? htmlForTicks : htmlForCandles;
        binaryChartDiv.getElementsByClassName('binary-chart-info-container')[0].innerHTML = htmlFunc(this, pipSize);
    },
});
