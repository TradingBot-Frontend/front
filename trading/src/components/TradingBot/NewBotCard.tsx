import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import { Bot } from '@redux/reducers/botReducer';
import icons from '@assets/images';
import Box from '@mui/material/Box';

interface NewBotCardProps {
  botInfo: Bot;
  // width?: number;
  isLoading: boolean;
}

export default function NewBotCard({
  botInfo,
  // width = 380,
  isLoading = false,
}: NewBotCardProps) {
  const [icon, setIcon] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const flexCenter = { display: 'flex', justifyContent: 'center' };
  useEffect(() => {
    setIcon(icons[botInfo.coinName]);
  }, []);
  return (
    <Card sx={{ cursor: 'pointer', width: '14rem' }} onClick={handleOpen}>
      <CardContent>
        <Stack spacing={1} sx={{}}>
          <Box sx={flexCenter}>
            {isLoading ? (
              <Skeleton variant="circular" width={70} height={70}>
                <Avatar />
              </Skeleton>
            ) : (
              <img src={icon} alt="coin" width="70" height="70" />
            )}
          </Box>
          <Box sx={flexCenter}>
            {isLoading ? (
              <Skeleton width="100%">
                <Typography>##########################</Typography>
              </Skeleton>
            ) : (
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                {botInfo.botName}
              </Typography>
            )}
          </Box>
          <Box sx={flexCenter}>
            {isLoading ? (
              <Skeleton width="100%">
                <Typography>##########################</Typography>
              </Skeleton>
            ) : (
              <Typography>수익률 {`${botInfo?.profit || 0}%`}</Typography>
            )}
          </Box>
          <Box sx={flexCenter}>
            {isLoading ? (
              <Skeleton width="100%">
                <Typography>##########################</Typography>
              </Skeleton>
            ) : (
              <Typography>{botInfo.isActive ? 'ON' : 'OFF'}</Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <TradingBotAdd botInfo={botInfo} handleClose={handleClose} />
      </Dialog>
    </Card>
  );
}
