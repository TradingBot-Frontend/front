import React, { useState } from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import Modal from '@mui/material/Modal';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Grid from '@mui/material/Grid';
import BotCard from '@components/TradingBot/BotCard';

const TradingBot = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <ContentWrapper
        title="TradingBot"
        addButton={<>add</>}
        handleOpen={handleOpen}
      >
        <Grid container spacing={2}>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
          <Grid item lg={4} md={6} sm={12}>
            <BotCard title="변동성 돌파 전략1" profit="수익률 +25.4%" />
          </Grid>
        </Grid>
      </ContentWrapper>
      <Modal open={open} onClose={handleClose}>
        <TradingBotAdd handleClose={handleClose} />
      </Modal>
    </>
  );
};
export default TradingBot;
