d3.csv('https://cdn.glitch.com/ae0235a1-538a-483e-b9a1-c0773a2dc129%2Fwealth-health-2014.csv?v=1602435508884', d3.autotype)
  .then(data=>{
  data=data;
  console.log(data);
  
  
  const width = 400;
  const height = 300;
  
  const svg = d3.select('.chart').append('svg')
    .attr('width',width)
    .attr('height', height);
  
  const xScale = d3
    .scaleLinear()
    .domain(...)
    .range(...);
  
})