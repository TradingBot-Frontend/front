import React, { useState, useEffect } from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import TradingBotAdd from '@containers/TradingBot/TradingAddContainer';
import Grid from '@mui/material/Grid';
import BotCard from '@components/TradingBot/BotCard';
import Dialog from '@mui/material/Dialog';
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

  return (
    <>
      <ContentWrapper title="TradingBot" addButton handleOpen={handleOpen}>
        <Grid container spacing={1}>
          {bots.length > 0
            ? bots.map((bot: Bot) => (
                <Grid key={bot.id} item xl={3} lg={4} md={6} sm={12}>
                  <BotCard botInfo={bot} width={380} isLoading={isLoading} />
                </Grid>
              ))
            : null}
        </Grid>
      </ContentWrapper>
      <Dialog open={open} onClose={handleClose}>
        <TradingBotAdd handleClose={handleClose} />
      </Dialog>
    </>
  );
};
export default TradingBot;
