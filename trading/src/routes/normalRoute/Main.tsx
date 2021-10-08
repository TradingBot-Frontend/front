import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
import { Container, Grid, Paper } from '@material-ui/core';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import { makeStyles } from '@material-ui/core/styles';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/index';
import { getBotsActions } from '../../redux/reducers/botReducer';
import BotCard from '../../components/TradingBot/BotCard';

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 10rem;
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    margin: 0.5rem 0.5rem 0rem 0rem;
  }
`;
const useStyles = makeStyles(() => ({
  topContainer: {
    margin: '2rem 0rem 0rem 0rem',
    height: '10rem',
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
  },
  bottomContainer: {
    margin: '2.3rem 0rem 0rem 0rem',
    height: '35%',
  },
  coinContainer: {
    height: '30rem',
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    // margin: '0rem 0rem 0rem 0rem',
  },
  chartContainer: {
    height: '30rem',
    // paddingTop: '1rem',
    // display: 'flex',
    // justifyContent: 'center',
    // margin: '0rem 0rem 0rem 0rem',
  },
}));

const MainCards = () => {
  const dispatch = useDispatch();
  const bots = useSelector((state: RootState) => state.bot.bots);
  const isLoading = useSelector((state: RootState) => state.bot.isLoading);
  useEffect(() => {
    dispatch(getBotsActions.request());
  }, [dispatch]);
  const botContainer = [];

  for (let i = 0; i < bots.length && i < 4; i += 1) {
    const bot = bots[i];
    botContainer.push(
      <Grid key={bot.id} item xl={3} lg={4} md={6} sm={12}>
        <BotCard botInfo={bot} width={300} isLoading={isLoading} />
      </Grid>,
    );
  }

  return <>{botContainer}</>;
};

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={classes.topContainer}>
        <MainCards />
      </Grid>
      <Grid container spacing={1} className={classes.bottomContainer}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.coinContainer}>
            <DsbCoinList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.chartContainer}>
            <PortfolioDonutChart />
          </Paper>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <PrivateSetting handleClose={handleClose} />
      </Modal>
    </Container>
  );
};
export default Main;
