var dataUrl = 'https://raw.githubusercontent.com/MQ-software-carpentry/D3-visualising-data/gh-pages/code/nations.json';
d3.json(dataUrl)
  .then(function (nations) {

    var chart = d3.select('#chart');
    var svg = chart.append('svg');

    var g = svg.append('g');
    var margin = { top: 20, left: 80, bottom: 50, right: 20 };
    var width = 960;
    var height = 350;
    var g_width = width - margin.left - margin.right;
    var g_height = height - margin.top - margin.bottom;

    svg.attr('width', width);
    svg.attr('height', height);

    g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xScale = d3.scaleLog()
                   .domain([250, 1e5])
                   .range([0, g_width]);
    var xAxis = d3.axisBottom(xScale)
                  .ticks(10, ',.0f');
    g.append('g')
     .attr('class', 'x axis')
     .attr('transform', 'translate(0,' + g_height + ')')
     .call(xAxis);

    var yScale = d3.scaleLinear()
                   .domain([0, 120])
                   .range([g_height, 0])
    var yAxis = d3.axisLeft(yScale);
    g.append('g')
     .attr('class', 'y axis')
     .call(yAxis);

    g.append('text')
      .attr('class', 'label')
      .text('Income per capita (dollars)')
      .attr('x', g_width / 2)
      .attr('y', height - 40);

    g.append('text')
      .attr('class', 'label')
      .attr('transform', 'translate(-40,' + (g_height / 2) + ') rotate(-90)')
      .text('Life Expentancy (years)')
      .attr('x', 0)
      .attr('y', 0);

    var rScale = d3.scaleSqrt()
                   .domain([0, 5e8])
                   .range([0, 40]);

    var circles = g.selectAll('.circle')
                   .data(nations, function (d) { return d.name; });

    console.log(nations);

    circles.enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', function (d) { return xScale(d.income[d.income.length-1]) })
      .attr('cy', function (d) { return yScale(d.lifeExpectancy[d.lifeExpectancy.length-1]) })
      .attr('r', function (d) { return rScale(d.population[d.population.length-1]) });

  })
  .catch( function (err) {
    console.error(err);
  });
