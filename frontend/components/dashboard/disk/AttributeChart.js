import React from 'react';
import PropTypes from 'prop-types';

import { timeFormat as d3TimeFormat } from 'd3-time-format';
import {
  timeSecond as d3TimeSe,
  timeMinute as d3TimeMi,
  timeHour as d3TimeHo,
  timeDay as d3TimeDa,
  timeMonth as d3TimeMo,
  timeWeek as d3TimeWe,
  timeYear as d3TimeYe,
} from 'd3-time';
import { scaleTime as d3ScaleTime, scaleLinear as d3ScaleLinear } from 'd3-scale';
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis';
import { area as d3Area, curveStepAfter as d3CurveStepAfter } from 'd3-shape';
import { brushX as d3BrushX } from 'd3-brush';
import { zoom as d3Zoom, zoomIdentity as d3ZoomIdentity } from 'd3-zoom';
import { select as d3Select, event as d3Event } from 'd3-selection';
import { extent as d3Extent, max as d3Max } from 'd3-array';

const timeFormats = {
  ms: d3TimeFormat('.%L'),
  s: d3TimeFormat(':%S'),
  m: d3TimeFormat('%H:%M'),
  h: d3TimeFormat('%H:%M'),
  da: d3TimeFormat('%a %-d/%-m'),
  we: d3TimeFormat('%a %-d/%-m'),
  mo: d3TimeFormat('%B'),
  ye: d3TimeFormat('%Y'),
};

const selectTimeFormat = (date) => {
  if (d3TimeSe(date) < date) {
    return timeFormats.ms(date);
  } else if (d3TimeMi(date) < date) {
    return timeFormats.s(date);
  } else if (d3TimeHo(date) < date) {
    return timeFormats.m(date);
  } else if (d3TimeDa(date)) {
    return timeFormats.h(date);
  } else if (d3TimeMo(date)) {
    return (d3TimeWe(date) < date ? timeFormats.da : timeFormats.we)(date);
  } else if (d3TimeYe(date) < date) {
    return timeFormats.mo(date);
  }

  return timeFormats.ye(date);
};

class AttributeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chartBaseLoaded: false, width: 300 };

    this.chart = {};

    this.loadD3 = this.loadD3.bind(this);
    this.updateD3 = this.updateD3.bind(this);
    this.interpretBrush = this.interpretBrush.bind(this);
    this.interpretZoom = this.interpretZoom.bind(this);
  }

  componentWillMount() {
    this.loadD3();
  }

  componentDidUpdate() {
    this.updateD3();
  }

  componentWillUnmount() {
    this.chart.brush.on('brush end', null);
    this.chart.zoom.on('zoom', null);
  }

  loadD3() {
    this.chart.main = {
      height: 170,
      margins: {
        top: 20,
        right: 20,
        bottom: 110,
        left: 40,
      },
    };

    this.chart.control = {
      height: 40,
      margins: {
        top: 230,
        right: 20,
        bottom: 30,
        left: 40,
      },
    };

    this.chart.svgHeight = this.chart.main.height + this.chart.main.margins.top + this.chart.main.margins.bottom;

    // Scales
    this.chart.main.x = d3ScaleTime();
    this.chart.main.y = d3ScaleLinear();
    this.chart.control.x = d3ScaleTime();
    this.chart.control.y = d3ScaleLinear();

    // Axises
    this.chart.main.xAxis = d3AxisBottom(this.chart.main.x);
    this.chart.control.xAxis = d3AxisBottom(this.chart.control.x);
    this.chart.yAxis = d3AxisLeft(this.chart.main.y);

    // Paths
    this.chart.main.area = d3Area()
      .x((p) => { return this.chart.main.x(p.time); })
      .y1((p) => { return this.chart.main.y(p.value); })
      .y0(this.chart.main.height)
      .curve(d3CurveStepAfter);
    this.chart.control.area = d3Area()
      .x((p) => { return this.chart.control.x(p.time); })
      .y1((p) => { return this.chart.control.y(p.value); })
      .y0(this.chart.control.height)
      .curve(d3CurveStepAfter);

    // Brush and zoom
    this.chart.brush = d3BrushX()
      .on('brush end', this.interpretBrush);

    this.chart.zoom = d3Zoom()
      .scaleExtent([1, Infinity])
      .on('zoom', this.interpretZoom);

    this.setState(() => { return { chartBaseLoaded: true }; });
  }

  updateD3() {
    if (this.props.data[0] !== 0 && this.state.chartBaseLoaded === true) {
      const chart = this.chart;

      d3Select(this.mxAxis).call(chart.main.xAxis);
      d3Select(this.myAxis).call(chart.yAxis);
      d3Select(this.cxAxis).call(chart.control.xAxis);
      d3Select(this.mZoom).call(chart.zoom);
      d3Select(this.cBrush)
        .call(chart.brush)
        .call(chart.brush.move, chart.main.x.range());

      const width = this.svgParent.clientWidth;
      if (this.state.width !== width) {
        this.setState(() => { return { width: this.svgParent.clientWidth }; });
      }
    }
  }

  interpretBrush(t) {
    const chart = this.chart;

    let s;
    if (t) {
      s = t;
    } else {
      if (d3Event.sourceEvent === null || d3Event.sourceEvent.type === 'zoom') {
        return;
      }
      s = d3Event.selection || chart.control.x.range();
    }

    chart.main.x.domain(s.map(chart.control.x.invert, chart.control.x));

    d3Select(this.mArea).attr('d', chart.main.area(this.props.data));
    d3Select(this.mxAxis).call(chart.main.xAxis);
    d3Select(this.mZoom).call(
      chart.zoom.transform,
      d3ZoomIdentity
        .scale(this.state.width / (s[1] - s[0]))
        .translate(-s[0], 0)
    );
  }

  interpretZoom() {
    if (d3Event.sourceEvent && d3Event.sourceEvent.type === 'brush') {
      return;
    }

    const t = d3Event.transform;
    const chart = this.chart;

    chart.main.x.domain(t.rescaleX(chart.control.x).domain());

    d3Select(this.mArea).attr('d', chart.main.area(this.props.data));
    d3Select(this.mxAxis).call(chart.main.xAxis);
    d3Select(this.cBrush).call(
      chart.brush.move,
      chart.main.x.range().map(t.invertX, t)
    );
  }

  render() {
    if (this.props.data[0] === 0 || this.state.chartBaseLoaded === false) {
      return (<p>Loading...</p>);
    }

    const chart = this.chart;
    const data = this.props.data;

    const svgWidth = this.state.width;
    const width = svgWidth - chart.main.margins.left - chart.main.margins.right;

    const xRange = d3Extent(data, (p) => { return p.time; });
    const yRange = [0, d3Max(data, (p) => { return p.value; }) * 1.05];

    chart.main.x.domain(xRange);
    chart.main.y.domain(yRange);
    chart.control.x.domain(xRange);
    chart.control.y.domain(yRange);

    chart.main.x.range([0, width]);
    chart.main.y.range([chart.main.height, 0]);
    chart.control.x.range([0, width]);
    chart.control.y.range([chart.control.height, 0]);

    chart.main.xAxis
      .tickFormat(selectTimeFormat)
      .ticks(Math.floor(width / 150))
      .scale(chart.main.x);
    chart.control.xAxis
      .tickFormat(selectTimeFormat)
      .ticks(Math.floor(width / 150))
      .scale(chart.control.x);
    chart.yAxis
      .scale(chart.main.y);

    chart.zoom
      .translateExtent([[0, 0], [width, chart.main.height]])
      .extent([[0, 0], [width, chart.main.height]]);
    chart.brush
      .extent([[0, 0], [width, chart.control.height]]);

    return (
      <div ref={(node) => { this.svgParent = node; }}>
        <svg width={svgWidth} height={this.chart.svgHeight}>
          <defs>
            <clipPath id="clip">
              <rect width={width} height={chart.main.height} />
            </clipPath>
          </defs>
          <g className="focus" transform={`translate(${chart.main.margins.left},${chart.main.margins.top})`}>
            <path
              ref={(node) => { this.mArea = node; }}
              className="area"
              d={chart.main.area(data)}
            />
            <g
              ref={(node) => { this.mxAxis = node; }}
              className="axis axis--x"
              transform={`translate(0,${chart.main.height})`}
            />
            <g ref={(node) => { this.myAxis = node; }} className="axis axis--y" />
          </g>
          <g
            className="context"
            transform={`translate(${chart.control.margins.left},${chart.control.margins.top})`}
          >
            <path className="area" d={chart.control.area(data)} />
            <g
              ref={(node) => { this.cxAxis = node; }}
              className="axis axis--x"
              transform={`translate(0,${chart.control.height})`}
            />
            <g ref={(node) => { this.cBrush = node; }} className="brush" />
          </g>
          <rect
            ref={(node) => { this.mZoom = node; }}
            className="zoom"
            height={chart.main.height}
            width={width}
            transform={`translate(${chart.main.margins.left},${chart.main.margins.top})`}
          />
        </svg>
      </div>
    );
  }
}

AttributeChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AttributeChart;
