import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentWrapper from '@components/common/ContentWrapper';
import BotCard from '@components/TradingBot/BotCard';
import Grid from '@mui/material/Grid';

const TradingBot = (): JSX.Element => {
  return (
    <ContentWrapper title="TradingBot" addButton={<>add</>}>
      <Grid container spacing={2}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <BotCard />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};
export default TradingBot;
