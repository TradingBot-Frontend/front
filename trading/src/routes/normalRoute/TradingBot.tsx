import React, { useState, useEffect } from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Grid from '@mui/material/Grid';
import BotCard from '@components/TradingBot/BotCard';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Bot, getBotsActions } from '@redux/reducers/botReducer';
import { RootState } from '@redux/reducers';

const TradingBot = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const bots = useSelector((state: RootState) => state.bot.bots);
  const isLoading = useSelector((state: RootState) => state.bot.isLoading);
  useEffect(() => {
    dispatch(getBotsActions.request());
  }, [dispatch]);

  const noData = (
    <Stack spacing={1}>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <AddCircleIcon sx={{ color: green[500], fontSize: 70 }} />
      </Box>
      <Typography variant="h4" align="center">
        트레이딩봇을 추가해주세요!
      </Typography>
    </Stack>
  );

  return (
    <>
      <ContentWrapper title="TradingBot" addButton handleOpen={handleOpen}>
        {bots.length > 0 ? (
          <Grid container spacing={1}>
            {bots.map((bot: Bot) => (
              <Grid key={bot.id} item xl={3} lg={4} md={6} sm={12}>
                <BotCard botInfo={bot} width={380} isLoading={isLoading} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {noData}
          </Box>
        )}
      </ContentWrapper>
      <Dialog open={open} onClose={handleClose}>
        <TradingBotAdd handleClose={handleClose} />
      </Dialog>
    </>
  );
};
export default TradingBot;
