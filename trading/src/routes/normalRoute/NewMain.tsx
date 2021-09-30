import React from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BotCard from '@components/TradingBot/BotCard';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';

export default function NewMain() {
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

  return (
    <ContentWrapper title="Dashboard" overflow="hidden">
      <>
        <Box sx={{ overflow: 'auto', maxWidth: 800 }}>
          <Grid container spacing={1}>
            {cards.map(({ title, profit }) => (
              <Grid key={title} item lg={6} md={3}>
                <BotCard title={title} profit={profit} width={380} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container>
            <DsbCoinList />
          </Grid>
        </Box>
      </>
    </ContentWrapper>
  );
}
