import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import bit from '../../assets/images/bitcoin-icon.png';

interface BotCardProps {
  title: string;
  profit: string;
  width?: number;
}

export default function BotCard({
  title,
  profit,
  width = 380,
}: BotCardProps): JSX.Element {
  const [chart, setChart] = useState({
    series: [
      {
        name: 'Series 1',
        data: [45, 52, 38, 45, 19, 23, 2],
      },
    ],
    options: {
      chart: {
        id: 'tradingbot-chart',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
    },
  });
  return (
    <Card sx={{ width }}>
      <CardContent>
        <Stack spacing={1}>
          <Stack spacing={2} direction="row">
            <img src={bit} alt="coin" width="70" height="70" />
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                {title}
              </Typography>
              <Typography>{profit}</Typography>
            </Stack>
            <Box
              component="div"
              sx={{
                flex: '1',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h3" align="center">
                On
              </Typography>
            </Box>
          </Stack>
          <ApexChart
            options={chart.options}
            series={chart.series}
            type="area"
            height={150}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
