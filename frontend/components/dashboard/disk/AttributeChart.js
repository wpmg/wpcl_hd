import d3 from 'd3';

/**
* Created by wpmg on 2017-01-23.
* Converted to node on 2017-07-16.
*/

const AttributeChartRenderer = (divObj, jsonFile) => {
  let data;
  const svg = d3.select(divObj).append('svg');
  let area;
  let area2;
  let brush;
  let zoom;
  let focus;
  let context;
  let clipPath;
  let xExtent;
  let yExtent;
  let firstLoad = true;
  let currentBrush;

  let width;
  const height = 170;
  const height2 = 40;
  const margin = { top: 20, right: 20, bottom: 110, left: 40 };
  const margin2 = { top: 230, right: 20, bottom: 30, left: 40 };

  // Initialize scales
  const x = d3.scaleTime();
  const x2 = d3.scaleTime();
  const y = d3.scaleLinear();
  const y2 = d3.scaleLinear();

  // Create axises
  const xAxis = d3.axisBottom(x);
  const xAxis2 = d3.axisBottom(x2);
  const yAxis = d3.axisLeft(y);

  let multiFormat;
  let formatMillisecond;
  let formatSecond;
  let formatMinute;
  let formatHour;
  let formatDay;
  let formatWeek;
  let formatMonth;
  let formatYear;

  // Change locale, then load data
  d3.json('node_modules/d3-time-format/locale/sv-SE.json', (error, locale) => {
    if (error) throw error;

    d3.timeFormatDefaultLocale(locale);

    formatMillisecond = d3.timeFormat('.%L');
    formatSecond = d3.timeFormat(':%S');
    formatMinute = d3.timeFormat('%H:%M');
    formatHour = d3.timeFormat('%H:%M');
    formatDay = d3.timeFormat('%a %-d/%-m');
    formatWeek = d3.timeFormat('%a %-d/%-m');
    formatMonth = d3.timeFormat('%B');
    formatYear = d3.timeFormat('%Y');

    multiFormat = (date) => {
      let format;
      if (d3.timeSecond(date) < date) {
        format = formatMillisecond(date);
      } else if (d3.timeMinute(date) < date) {
        format = formatSecond(date);
      } else if (d3.timeHour(date) < date) {
        format = formatMinute(date);
      } else if (d3.timeDay(date)) {
        format = formatHour(date);
      } else if (d3.timeMonth(date)) {
        format = (d3.timeWeek(date) < date ? formatDay : formatWeek)(date);
      } else if (d3.timeYear(date) < date) {
        format = formatMonth(date);
      } else {
        format = formatYear(date);
      }
      return format;
    };

    // Load data, then initialize chart
    $.getJSON(jsonFile, init);
  });


  // called once the data is loaded
  const init = (jsonData) => {
    data = jsonData;

    // Format data correctly
    data.forEach((dt) => {
      const d = dt;
      d.xtime = new Date(d.xtime * 1000);
      d.yvalue = +d.yvalue;
    });

    // Set domains
    xExtent = d3.extent(data, (d) => { return d.xtime; });
    yExtent = [0, d3.max(data, (d) => { return d.yvalue; }) * 1.05];
    x.domain(xExtent);
    y.domain(yExtent);
    x2.domain(xExtent);
    y2.domain(y.domain());

    // Path generator for areas
    area = d3.area()
      .x((d) => { return x(d.xtime); })
      .y0(height)
      .y1((d) => { return y(d.yvalue); })
      .curve(d3.curveStepAfter);

    area2 = d3.area()
      .x((d) => { return x2(d.xtime); })
      .y0(height2)
      .y1((d) => { return y2(d.yvalue); })
      .curve(d3.curveStepAfter);

    zoom = d3.zoom()
      .scaleExtent([1, Infinity])
      .on('zoom', zoomed);

    brush = d3.brushX()
      .on('brush end', brushed);


    // Add clipPath
    clipPath = svg.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect');

    // Add focus (main)
    focus = svg.append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    focus.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', area);

    focus.append('g')
      .attr('class', 'axis axis--x');

    focus.append('g')
      .attr('class', 'axis axis--y');

    // Add context (slider)
    context = svg.append('g')
      .attr('class', 'context')
      .attr('transform', `translate(${margin2.left},${margin2.top})`);

    context.append('path')
      .datum(data)
      .attr('class', 'area');

    context.append('g')
      .attr('class', 'axis axis--x');

    context.append('g')
      .attr('class', 'brush');

    // Add zoom-functionality
    svg.append('rect')
      .attr('class', 'zoom')
      .attr('height', height)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // render the chart
    render();
  };

  const render = () => {
    // get dimensions based on obj size
    width = $(divObj).innerWidth() - (margin.left + margin.right);

    // update x and y scales to new dimensions
    x.range([0, width]);
    x2.range([0, width]);
    y.range([height, 0]);
    y2.range([height2, 0]);

    // update svg elements to new dimensions
    svg.attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);

    // update the axis and line xAxis.ticks(d3.timeHour.every(12));
    xAxis.tickFormat(multiFormat)
      .ticks(Math.floor(width / 150));

    xAxis2.tickFormat(multiFormat)
      .ticks(Math.floor(width / 150));

    xAxis.scale(x);
    xAxis2.scale(x2);
    yAxis.scale(y);

    zoom.translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]]);

    brush.extent([[0, 0], [width, height2]]);

    // Transform
    clipPath.attr('width', width)
      .attr('height', height);

    focus.select('.axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    focus.select('.axis--y')
      .call(yAxis);

    context.select('path')
      .attr('d', area2);

    context.select('.axis--x')
      .attr('transform', `translate(0, ${height2})`)
      .call(xAxis2);

    context.select('.brush')
      .call(brush)
      .call(brush.move, x.range());

    svg.select('.zoom')
      .attr('width', width)
      .call(zoom);

    if (firstLoad === true) {
      let minDate = new Date(xExtent[1].getTime() - 3.456e8);
      minDate = xExtent[0] > minDate ? xExtent[0] : minDate;

      currentBrush = [minDate, xExtent[1]];
      firstLoad = false;
    }

    brushed(currentBrush.map(x2));
  };

  const brushed = (t) => {
    let s;

    if (t) {
      s = t;
    } else {
      if (d3.event.sourceEvent === null || d3.event.sourceEvent.type === 'zoom') return; // ignore brush-by-zoom
      s = d3.event.selection || x2.range();
    }

    currentBrush = s.map(x2.invert, x2);

    x.domain(currentBrush);
    focus.select('.area').attr('d', area);
    focus.select('.axis--x').call(xAxis);
    svg.select('.zoom').call(zoom.transform, d3.zoomIdentity
      .scale(width / (s[1] - s[0]))
      .translate(-s[0], 0));
  };

  const zoomed = () => {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return; // ignore zoom-by-brush
    const t = d3.event.transform;

    currentBrush = t.rescaleX(x2).domain();

    x.domain(currentBrush);
    focus.select('.area').attr('d', area);
    focus.select('.axis--x').call(xAxis);
    context.select('.brush').call(brush.move, x.range().map(t.invertX, t));
  };

  return { render };
};

export default AttributeChartRenderer;
