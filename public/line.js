/*Set the height and weight of the canvas*/

var h = 600; /*Height of the canvas*/
var w = 1200; /*Width of the canvas*/
var padding = 20; /*Padding*/


// The time format
var timeFormat = d3.time.format(" %b %Y");

// Date Conversion
// Convert unix timestamp to needed date format
function getDate(d) {
    var strDate = new Date(d * 1000);  // unix timestamp
    return strDate; // Return our date format
}



function buildLine(data) {

    // The minimum and maximum date for x-axis
    var minDate = getDate(data[0].x);
    var maxDate = getDate(data[data.length - 1].x);

    // The minimum and maximum price for y-axis
    var minPrice = 0;
    var maxPrice = d3.max(data, function (d) { return d.y; });

    // Other javascript function to map the lowest value
    // Math.max.apply(Math,data.map(function(d){return d.y;}));

    console.log(maxPrice);
    //scales
    // Map the values to our svg canvas range
    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([padding + 20, w - padding]).nice();

    var yScale = d3.scale.linear()
        .domain([minPrice, maxPrice])
        .range([h - padding, 10]).nice();

    // Axis Generator
    var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(timeFormat);
    var yAxisGen = d3.svg.axis().scale(yScale).orient('left').ticks(10);

    // Create the line
    var lineFunction = d3.svg.line()
        .x(function (d) { return xScale(getDate(d.x)); })
        .y(function (d) { return yScale(d.y); })
        .interpolate('linear');

    // Create the svg element
    var svg = d3.select("body").append("svg")
        .attr({
            width: w, height: h, "id": "svg-first"
        });

    // Create the Axis

    var xAxis = svg.append('g').call(xAxisGen)
        .attr('class', 'x-axis')
        .attr('transform', 'translate( 0,' + (h - padding) + ')');

    var yAxis = svg.append('g').call(yAxisGen)
        .attr('class', 'y-axis')
        .attr('transform', 'translate(' + (padding + 20) + ', 0)');

    // Draw the LineChart

    var viz = svg.append('path')
        .attr({
            d: lineFunction(data),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none",
            "class": "path-first"
        });
}

function updateLine(data) {


    // The minimum and maximum date for x-axis
    var minDate = getDate(data[0].x);
    console.log(minDate);
    var maxDate = getDate(data[data.length - 1].x);
    console.log(maxDate);

    // The minimum and maximum price for x-axis
    var minPrice = 0;
    var maxPrice = d3.max(data, function (d) { return d.y; });

    console.log(maxPrice);
    //scales
    // Map the values to our svg canvas range
    var xScale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([padding + 20, w - padding]).nice();

    var yScale = d3.scale.linear()
        .domain([0, maxPrice])
        .range([h - padding, 10]).nice();

    // Axis Generator
    var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(timeFormat).ticks(10);
    var yAxisGen = d3.svg.axis().scale(yScale).orient('left');

    // Create the line
    var lineFunction = d3.svg.line()
        .x(function (d) { return xScale(getDate(d.x)); })
        .y(function (d) { return yScale(d.y); })
        .interpolate('linear');

    // Create the svg element
    var svg = d3.select('body').select('#svg-first');

    // Create the Axis

    var xAxis = svg.selectAll('g.x-axis').call(xAxisGen);

    var yAxis = svg.selectAll('g.y-axis').call(yAxisGen);


    // Draw the LineChart

    var viz = svg.selectAll('.path-first')
        .attr({
            d: lineFunction(data)
        });


    // now add titles to the axes
    vis.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (padding / 2) + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Value");

    vis.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (width / 2) + "," + (height - (padding / 3)) + ")")  // centre below axis
        .text("Date");
}

function createLabel(data) {
    // Add Labels
    var labels = svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .text(function (d) {
            return d.y;
        })
        .attr({
            x: function (d) { return d.x * 3 - 25; },
            y: function (d) { return h - d.y; },
            "font-size": "12px",
            "font-family": "sans-serif",
            "fill": "#666666",
            "text-anchor": "start",
            "dy": ".35em",
            "font-weight": function (d, i) {
                if (i === 0 || i === (data.length - 1)) {
                    return "bold";
                }
                else {
                    return "normal";
                }
            }
        });
}


// https://api2.blockchain.info/charts/market-price?cors=true&timespan=all&format=json&lang=en

//  Get data for ploting the chart
d3.json("http://localhost:3000/api/linechart", function (error, data) {

    // Error
    if (error) {
        console.log(error);
    }
    else {
        console.log(data);
    }
    var dataValue = data.values;
    console.log(dataValue);
    buildLine(dataValue);

    /*   // add event listener
   
       d3.select("select")
           .on('click', function (d, i) {
               //get selected option
               var sel = d3.select('#date-option').node().value;
               dataValue.splice(0, dataValue.length - sel);
   
               updateLine(dataValue);
           });
   
   
       var dateFilter = d3.select("#periodnormal");
   
       console.log(dateFilter);
   
   
       dateFilter.on('click', function (d, i) {
           //get selected option
           var sel = d3.select('.date-option').node().value;
           console.log(sel);
           dataValue.splice(0, dataValue.length - sel);
   
           updateLine(dataValue);
       });*/

});


// Filtering the data (On changing the filter)
d3.select("select")
    .on('change', function (d, i) {
        d3.json("http://localhost:3000/api/linechart", function (error, data) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(data);
            }

            var dataValue = data.values; // Data for x and y axis

            //get selected option
            var sel = d3.select('#date-option').node().value; // Value for the filter
            dataValue.splice(0, dataValue.length - sel); // filtered data

            // Redraw the chart
            updateLine(dataValue);
        });
    });










