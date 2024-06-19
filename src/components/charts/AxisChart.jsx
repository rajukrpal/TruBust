



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


const series = [
  { type: 'line', dataKey: 'count', color: '#577399' },
];


const AxisChart = () => {
  const [chart,setChart] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const dashBordData = await AnalyticsFeatchData();
        setChart(dashBordData.data.totalCompany);
        
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
      
      <Box sx={{ width: '100%' }}>
        <Typography variant='h5' sx={{fontWeight:600 , paddingLeft:3}}>
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
          height={350}
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







