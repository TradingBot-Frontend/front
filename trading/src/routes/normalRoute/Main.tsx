import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
import { Container, Grid, Paper, useMediaQuery } from '@material-ui/core';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import { makeStyles } from '@material-ui/core/styles';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { RootState } from '../../redux/reducers/index';
import { getBotsActions } from '../../redux/reducers/botReducer';
import BotCard from '../../components/TradingBot/BotCard';

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    margin: 0.5rem 0.5rem 0rem 0rem;
  }
`;
const useStyles = makeStyles((theme) => ({
  topContainer: {
    margin: '2rem 0rem 0rem 0rem',
    height: '10rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  emptyTopContainer: {
    margin: '2rem 0rem 0rem 0rem',
    height: '10rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bottomContainer: {
    margin: '2.3rem 0rem 0rem 0rem',
    height: '35%',
  },
  coinContainer: {
    height: '90%',
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: '0rem 0rem 0rem 0rem',
  },
  chartContainer: {
    height: '90%',
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
  const theme = useTheme();
  // const showFirstCard = useMediaQuery(theme.breakpoints.up('sm'));
  const showSecondCard = useMediaQuery(theme.breakpoints.up('sm'));
  const showThirdCard = useMediaQuery(theme.breakpoints.up('md'));
  const showFourthCard = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => {
    dispatch(getBotsActions.request());
  }, [dispatch]);
  const botContainer = [];

  for (let i = 0; i < bots.length && i < 4; i += 1) {
    const bot = bots[i];
    let show = null;
    if (i === 0) show = true;
    if (i === 1) show = showSecondCard;
    if (i === 2) show = showThirdCard;
    if (i === 3) show = showFourthCard;
    botContainer.push(
      <>
        {show && (
          <Box key={bot.id} sx={{ marginRight: '2rem' }}>
            <BotCard botInfo={bot} width={360} isLoading={isLoading} />
          </Box>
        )}
      </>,
    );
  }
  const noData = (
    <Typography variant="h4" align="center">
      트레이딩봇을 추가해주세요!
    </Typography>
  );
  const isBotContainerEmtpy = botContainer.length === 0;
  const classes = useStyles();
  return (
    <Box
      className={
        isBotContainerEmtpy ? classes.emptyTopContainer : classes.topContainer
      }
    >
      {isBotContainerEmtpy ? noData : botContainer}
    </Box>
  );
};

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <MainCards />
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
