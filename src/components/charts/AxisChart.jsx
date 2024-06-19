



import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { Typography } from '@mui/material';
import { AnalyticsFeatchData } from '../../dataApi/Data';
import { useEffect, useState } from 'react';



// const dataset = [
//   { min: 0,  month: 'Jan' },
//   { min: 3,  month: 'Feb' },
//   { min: 4, month: 'Mar' },
//   { min: 0, month: 'Apr' },
//   { min: 1,  month: 'May' },
 
// ];

const series = [
  { type: 'line', dataKey: 'count', color: '#577399' },
];

// Filter out data points with min value of 0
// const filteredDataset = dataset.filter(data => data.min !== 0);

// const series = [
//   { type: 'line', dataKey: `min`, color: '#577399' },
// ];

const AxisChart = () => {
  const [chart,setChart] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const dashBordData = await AnalyticsFeatchData();
        // console.log("data:-",dashBordData.data.totalCompany)
        setChart(dashBordData.data.totalCompany);
        // console.log("raju:-",chart);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  },[])

  useEffect(()=>{
    // console.log("raju2:->",chart)
  },[chart])

  return (
    
    <Stack sx={{ width: '100%' }}>
    {/* {chart.map((item,index)=>(
      <>
      <h1 key={index}>{item.month}</h1>
      <h1 key={index}>{item.year}</h1>
      <h1 key={index}>{item.count}</h1>
      </>
    ))} */}
      
      <Box sx={{ width: '100%' }}>
        <Typography variant='h5' sx={{fontWeight:600}}>
          Total company
        </Typography>
        <ResponsiveChartContainer
          series={series}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'month',
              label: 'Month',
            },
          ]}
          // dataset={filteredDataset}
          dataset={chart}
          height={400}
        >
          <ChartsGrid horizontal />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis />
          <ChartsYAxis domain={[0, 4.5]} />
          <ChartsTooltip />
        </ResponsiveChartContainer>
      </Box>
    </Stack>
  );
}

export default AxisChart;







