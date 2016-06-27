//Defining the D3 margin
var margin={ top:20, right:10, bottom: 100, left:40},
    width=700 - margin.right-margin.left,
    height=500- margin.top-margin.bottom;
  //  console.log('D3 Margin width :'+ margin);  //650
  //  console.log('D3 Margin width :'+ width);  //650
  //  console.log('D3 Margin height :' +height);  //380

/* ----------------------------------------------------- PP Graph------------------------------------------------------------------------------ */
//Define D3 margin
var svg_pp=d3.select('#ppower2013')
        .append('svg')
        .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
        })
        .append('g')
            .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');
//Scale and Axis
var xScale=d3.scale.ordinal().rangeRoundBands([0,width], 0.2,0.2);
var yScale=d3.scale.linear().range([height, 0]);
//define axis
var xAxis=d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
var yAxis=d3.svg.axis()
    .scale(yScale)
    .orient("left");
d3.json("../json/PurchasingPowerbycountry.json", function(error, data){
    if(error){
    console.log("Error");
    }
    data.forEach(function(d){
        d.PurchasingPower2013=+ d.PurchasingPower2013;
        d.country=d.country;
        console.log(d.PurchasingPower2013);
    });
    data.sort(function(a,b){
    return b.PurchasingPower2013- a.PurchasingPower2013;
    });
// specify the domains of x and y scales
xScale.domain(data.map(function(d){
    return d.country;
}));
yScale.domain([0, d3.max(data, function(d){
    return d.PurchasingPower2013;
})]);
//draw the bars
svg_pp.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay(function(d,i){
        return i*200;
    })
    .attr({
        'x': function(d){
        return xScale(d.country);
        },
        'y': function(d){
        return yScale(d.PurchasingPower2013);
        },
        "width": xScale.rangeBand(),
        "height": function(d){
        return height-yScale(d.PurchasingPower2013);
        }
    });
// append x axis and y axis
svg_pp.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .selectAll('text')
    .attr("transform", "rotate(-40)")
    .attr("dx","-1.0em")
    //.attr("dy", "-0;.25em")
    .style("text-anchor","end")
    .style("font-size", "10px");
svg_pp.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .style("font-size", "10px");
});
