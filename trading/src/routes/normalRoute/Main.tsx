import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
import { Container, Grid, Paper } from '@material-ui/core';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import BotCard from '@components/TradingBot/BotCard';
import { makeStyles } from '@material-ui/core/styles';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';

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
    height: '30%',
    display: 'flex',
    flexDirection: 'row',

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
const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <MainWapper>
      <Container>
        <Grid container xs={12} className={classes.topContainer}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }} />
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
      </Container>
      <Modal open={open} onClose={handleClose}>
        <PrivateSetting handleClose={handleClose} />
      </Modal>
    </MainWapper>
  );
};
export default Main;
