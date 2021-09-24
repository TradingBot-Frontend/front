import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ApexChart from 'react-apexcharts';
import sb from '../../assets/images/sb.png';

interface BotCardProps {
  title: string;
  profit: string;
}

export default function BotCard({ title, profit }: BotCardProps): JSX.Element {
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
      //   stroke: {
      //     curve: 'straight',
      //   },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shadeIntensity: 1,
      //     opacityFrom: 0.7,
      //     opacityTo: 0.9,
      //     stops: [0, 90, 100],
      //   },
      // },
      //   xaxis: {
      //     categories: [
      //       '01 Jan',
      //       '02 Jan',
      //       '03 Jan',
      //       '04 Jan',
      //       '05 Jan',
      //       '06 Jan',
      //       '07 Jan',
      //     ],
      //   },
    },
  });
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack spacing={1}>
          <Stack spacing={2} direction="row">
            <img src={sb} alt="coin" width="70" height="70" />
            <Stack spacing={2}>
              <Typography>{title}</Typography>
              <Typography>{profit}</Typography>
            </Stack>
            <Typography variant="h2" gutterBottom>
              On
            </Typography>
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
