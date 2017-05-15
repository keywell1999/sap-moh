import XYAxisChart from 'nju/chart/XYAxisChart';
import AreaSeries from 'nju/chart/series/AreaSeries';
import LineSeries from 'nju/chart/series/LineSeries';

export default class CounterChart extends XYAxisChart {
  metadata = {
    properties: {
      padding: { type: 'object', defaultValue: { left: 20, right: 20, top: 0, bottom: 20 } },
      rtCount: { type: 'object' },
      predictCount: { type: 'object' }
    }
  }

  init() {
    super.init();
    this.addStyleClass('moh-counter-chart');
    const now = new Date();
    const from = new Date(now.getYear(), now.getMonth(), now.getDate());
    const to = new Date(now.getYear(), now.getMonth(), now.getDate() + 1);
    this.domainX = [from, to];
    this.domainY = [0, 80000];
  }

  initChart() {
    super.initChart();
    this._initRtSeries();
    this._initAreaSeries();
    this._initPredictSeries();
  }

  _initAxisX() {
    const hourFormat = d3.time.format("%-H");
    super._initAxisX({
      scaleType: d3.time.scale(),
      ticks: 8,
      domain: this.domainX,
      tickFormat: (date, i) => {
        return 3 * i;
      }
    });
  }

  _initAxisY() {
    super._initAxisY({
      domain: this.domainY,
      ticks: 3,
      tickFormat: (num) => {
        if (num === 0) {
          return '';
        }
        return num;
      }
    });
  }

  _initPredictSeries() {
    this.predictSeries = new LineSeries({
      dashed: true,
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'count'
    });
    this.addSeries(this.predictSeries);
  }

  _initRtSeries() {
    this.rtSeries = new LineSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      yPath: 'count'
    });
    this.addSeries(this.rtSeries);
  }

  _initAreaSeries() {
    this.areaSeries = new AreaSeries({
      scaleX: d3.time.scale().domain(this.domainX),
      scaleY: d3.scale.linear().domain(this.domainY),
      xPath: 'date',
      y1Path: 'count',
      fillColor: 'steelBlue',
      opacity: 0.8
    });
    this.addSeries(this.areaSeries);
  }

  setRtCount(value) {
    this.setProperty('rtCount', value);
    if (value) {
      const from = this.domainX[0];
      const transformed = value.map((item, i) => ({
        date: new Date(from.getTime() + i * 60 * 1000),
        count: item
      }));
      this.rtSeries.setData(transformed);
      this.areaSeries.setData(transformed);
    }
    this.redraw();
  }

  setPredictCount(value) {
    this.setProperty('predictCount', value);
    if (value) {
      const from = this.domainX[0];
      const transformed = value.map((item, i) => ({
        date: new Date(from.getTime() + i * 60 * 1000),
        count: item
      }));
      this.predictSeries.setData(transformed);
    }
    this.redraw();
  }

  redraw() {
    super.redraw();
    this.axisY.setInnerTickSize(-this.contentFrame.width);
  }
}
