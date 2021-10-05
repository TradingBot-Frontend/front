import React, { useState, useEffect } from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Grid from '@mui/material/Grid';
import BotCard from '@components/TradingBot/BotCard';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { getBotsActions } from '@redux/reducers/botReducer';
import { RootState } from '@redux/reducers';

const TradingBot = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const bots = useSelector((state: RootState) => state.bot.bots);
  const cards = [
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
    { title: '변동성 돌파 전략1', profit: '수익률 +25.4%' },
  ];

  useEffect(() => {
    dispatch(getBotsActions.request());
  }, [dispatch]);

  return (
    <>
      <ContentWrapper title="TradingBot" addButton handleOpen={handleOpen}>
        <Grid container spacing={1}>
          {/* {cards.map(({ title, profit }) => (
            <Grid key={title} item xl={3} lg={4} md={6} sm={12}>
              <BotSkeleton />
            </Grid>
          ))} */}
          {cards.map(({ title, profit }) => (
            <Grid key={title} item xl={3} lg={4} md={6} sm={12}>
              <BotCard
                title={title}
                profit={profit}
                botInfo={{}}
                width={380}
                isLoading
              />
            </Grid>
          ))}
        </Grid>
      </ContentWrapper>
      <Dialog open={open} onClose={handleClose}>
        <TradingBotAdd handleClose={handleClose} />
      </Dialog>
    </>
  );
};
export default TradingBot;
