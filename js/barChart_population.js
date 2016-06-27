//Defining the D3 margin
var margin={ top:20, right:10, bottom: 100, left:40},
    width=700 - margin.right-margin.left,
    height=500- margin.top-margin.bottom;
  //  console.log('D3 Margin width :'+ margin);  //650
    //console.log('D3 Margin width :'+ width);  //650
    //console.log('D3 Margin height :' +height);  //380

  //define svg

  var svg_population= d3.select('#population2013')
          .append('svg')
          .attr({
          "width": width + margin.right + margin.left, //700
          "height": height + margin.top + margin.bottom //500
          })
          .append('g')
              .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');

  //Scale and Axis
  var xScale=d3.scale.ordinal().rangeRoundBands([0,width], 0.1);
  var yScale=d3.scale.linear().range([height, 0]);

  //define axis
  var xAxis=d3.svg.axis()
      .scale(xScale)
      .orient("bottom");
  var yAxis=d3.svg.axis()
      .scale(yScale)
      .orient("left");

//Getting JSON data

      d3.json("../json/Populationbycountry.json", function(error, data){
          if(error) console.log("Error");
          data.forEach(function(d){
              d.population2013=+ d.population2013;
              d.country=d.country;
              console.log(d.popultion2013);
          });
          data.sort(function(a,b){
          return b.population2013- a.population2013;
          });

// specify the domains of x and y scales
        xScale.domain(data.map(function(d){
            return d.country;
        }));
        yScale.domain([0, d3.max(data, function(d){
            return d.population2013;
        })]);

//draw the bars

        svg_population.selectAll('rect')
            .data(data)
        .enter()
            .append('rect')
            .attr("height", 0)  // From height to 0
            .attr("y", height)  // from down to x-axis
            .transition().duration(1000) // dispay one bar time
            .delay(function(d,i){
                return i*20;          // delay bw displaying one bar to another
            })
            .attr({
                'x': function(d){
                return xScale(d.country);
                },
                'y': function(d){
                return yScale(d.population2013);
              },
                "width": xScale.rangeBand(),
                "height": function(d){
                return height-yScale(d.population2013);
              }
            });
        // append x axis and y axis
        svg_population.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + height + ")")   //Inverts the graph
            .call(xAxis)
            .selectAll('text')   // Gathering all the text for x-axis
            .attr("transform", "rotate(-40)")   // rotating the text
            .attr("dx","-1.0em") //position of text appears
            //.attr("dy", "-0;.25em")   //*********************************************************************************************
            .style("text-anchor","end")
            .style("font-size", "10px");

        svg_population.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("font-size", "10px");
        });
