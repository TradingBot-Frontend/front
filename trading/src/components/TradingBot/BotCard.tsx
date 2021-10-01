import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ApexChart from 'react-apexcharts';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import bit from '../../assets/images/bitcoin-icon.png';

interface BotCardProps {
  title: string;
  profit: string;
  // botIfno: Bot;
  botInfo?: any;
  width?: number;
  isLoading: boolean;
}

export default function BotCard({
  title,
  profit,
  botInfo,
  width = 380,
  isLoading = false,
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
      grid: {
        yaxis: {
          lines: {
            show: false, // 배경 가로선
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card sx={{ width, cursor: 'pointer' }} onClick={handleOpen}>
        <CardContent>
          <Stack spacing={1}>
            <Stack spacing={2} direction="row">
              {isLoading ? (
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              ) : (
                <img src={bit} alt="coin" width="70" height="70" />
              )}
              <Stack spacing={2}>
                {isLoading ? (
                  <Skeleton width="100%">
                    <Typography>
                      &nasp;&nasp;&nasp;&nasp;&nasp;&nasp;
                    </Typography>
                  </Skeleton>
                ) : (
                  <>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                      {title}
                    </Typography>
                    <Typography>{profit}</Typography>
                  </>
                )}
              </Stack>
              {isLoading ? null : (
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
              )}
            </Stack>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: '57%' }} />
              </Skeleton>
            ) : (
              <ApexChart
                options={chart.options}
                series={chart.series}
                type="area"
                height={150}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <TradingBotAdd botInfo={botInfo} handleClose={handleClose} />
      </Modal>
    </>
  );
}
