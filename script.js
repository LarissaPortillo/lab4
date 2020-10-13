d3.csv('https://cdn.glitch.com/ae0235a1-538a-483e-b9a1-c0773a2dc129%2Fwealth-health-2014.csv?v=1602435508884', d3.autoType)
  .then(data=>{
  
  data=data.sort((a,b)=> b.Population - a.Population);
  console.log(data);
  
  const margin = {top:30, left:30, bottom:30, right:30};
  const width = 650- margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  console.log(d3.extent (data, d=>d.Income));
  console.log(d3.extent(data, d=> d.LifeExpectancy));
  console.log(d3.extent(data, d=> d.Population));
  
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, (d)=>{return d.Income;}))
    .range([0,width])
    .clamp(true);
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, (d)=>{return d.LifeExpectancy;}))
    .range([height,0])
    .clamp(true);


  const size = d3.scaleLinear()
    .domain(d3.extent(data, (d)=>{return d.Population;}))
    .range([4,20]);

  const xAxis = d3.axisBottom()
    .ticks(5,"s")
    .scale(xScale);
    
  const yAxis = d3.axisLeft()
	  .scale(yScale);

  //const pos = d3.pointer(event, window);
  //console.log("pos",pos);


  const regions=["Sub-Saharan Africa","South Asia","East Asia & Pacific", "America","Middle East & North Africa", "Europe & Central Asia"];
    let colorScale=d3.scaleOrdinal()
      .domain(regions)
      .range(['#CA73FA','#FA809D','#66BDFA','#D8FA4D','#5AFA72','#FA8041']);



  svg.selectAll('.income')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d  => xScale(d.Income))
      .attr('cy', d => yScale(d.LifeExpectancy))
      .attr('r', d => size(d.Population))
      .attr('fill', d => colorScale(d.Region))
      .attr('class','income') 
      .attr('opacity', .70)
      .attr('stroke', 'black');

  svg.selectAll('.legend')
      .data([1,2,3,4,5,6])
      .enter()
      .append('rect')
      .attr('x', 300 )
      .attr('y', d=> 225 + d*22 )
      .attr('height', 20)
      .attr('width', 20)
      .attr('fill', d=> colorScale(d));

  svg.selectAll('text')
      .data([1,2,3,4,5,6])
      .enter()
      .append('text')
      .attr("class", "le")
      .attr('class','leg')
      .attr('x', 325 )
      .attr('y', d=> 240 + d *22 )
      .text((d)=>{
          if (d==2){
              return "South Asia";
          }
          if(d==3){
              return "East Asia & Pacific";
          }
          if(d==4){
              return "America";
          }
          if(d==5){
              return "Middle East & North Africa";
          }
          if (d==1){
              return "Sub-Saharan Africa";
          }
          if(d==6){
              return "Europe & Central Asia";
          }
      })
      .attr('font-family','sans-serif');


  svg.append('text')
    .attr("class","inc")
    .attr('x', 500)
    .attr('y', 433)
    .attr('text-anchor','start')
    .attr('font-family','sans-serif')
    .attr('font-size',15)
    .text("Income");

  svg.append('text')
    .attr("class","LE")
    .attr('x', 15)
    .attr('y', 11)
    .attr('text-anchor','start')
    .attr('writing-mode','vertical-lr')
    .attr('font-family','sans-serif')
    .attr('font-size',15)
    .text("Life Expectancy");

  svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
    
  svg.append("g")
	.attr("class", "axis y-axis")
	.call(yAxis);
  })