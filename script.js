d3.csv('https://cdn.glitch.com/ae0235a1-538a-483e-b9a1-c0773a2dc129%2Fwealth-health-2014.csv?v=1602435508884', d3.autotype)
  .then(data=>{
  data=data;
  console.log(data);
  
  const width = 400;
  const height = 300;
  
  const svg = d3.select('.chart').append('svg')
    .attr('width',width)
    .attr('height', height);
  
  console.log(d3.extent(data, d=>d.Income));
  console.log(d3.extent(data, d=> d.LifeExpectancy));
  
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d=>d.Income))
    .range(d3.extent(data, d=> d.LifeExpectancy));
  
 svg.selectAll('.income')
  .data(data)
  .enter()
  .append('circle')
  .attr('fill', 'orange')
  .attr('class','income')
  .attr('r',5)
  .attr('cx', d=> xScale())
  
})