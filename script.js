d3.csv('https://cdn.glitch.com/ae0235a1-538a-483e-b9a1-c0773a2dc129%2Fwealth-health-2014.csv?v=1602435508884', d3.autotype)
  .then(data=>{
  data=data;
  console.log(data);
  
  const margin = {top:20, left:20, bottom:20, right:20};
  const width = 650- margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  console.log(d3.extent(data, d=>d.Income));
  console.log(d3.extent(data, d=> d.LifeExpectancy));
  
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, (d)=>{return d.Income;}))
    .range(d3.extent(data, (d)=>{ return d.LifeExpectancy;}));
  
  
  
 svg.selectAll('.income')
  .data(data)
  .enter()
  .append('circle')
  .attr('fill', 'orange')
  .attr('class','income')
  .attr('stroke', 'darkorange')
  .attr('r',5)
  .attr('cx', d=> xScale(d.Income))
  .attr('cy', d=> xScale(d.LifeExpectancy));
  
})