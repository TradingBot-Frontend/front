import React from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import BotCard from '@components/TradingBot/BotCard';
import Grid from '@mui/material/Grid';

const TradingBot = (): JSX.Element => {
  return (
    <ContentWrapper title="TradingBot" addButton={<>add</>}>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};
export default TradingBot;
