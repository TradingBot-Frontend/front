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

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    margin: 0.5rem 0.5rem 0rem 0rem;
  }
`;
const useStyles = makeStyles(() => ({
  topContainer: {
    margin: '2rem 0rem 0rem 0rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid',
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
const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <>
      <Container style={{ border: '1px solid', height: '100%', width: '100%' }}>
        <Container style={{ height: '30%' }}>
          <Grid container xs={12} className={classes.topContainer}>
            <Grid key="변동성 돌파 전략1" item xl={3} lg={4} md={6} sm={12}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                botInfo={{}}
                width={380}
                isLoading
              />
            </Grid>
          </Grid>
        </Container>
        <Container style={{ height: '50%' }}>
          <Grid container xs={12} spacing={2} className={classes.topContainer}>
            <Grid item xs={12} sm={6} style={{ height: '100%' }}>
              <Paper className={classes.coinContainer}>
                <DsbCoinList />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} style={{ height: '100%' }}>
              <Paper className={classes.chartContainer}>
                <PortfolioDonutChart />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* <Grid container xs={12} className={classes.topContainer}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid key="변동성 돌파 전략1" item xl={3} lg={4} md={6} sm={12}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                botInfo={{}}
                width={380}
                isLoading
              />
            </Grid>
            <Grid key="변동성 돌파 전략1" item xl={3} lg={4} md={6} sm={12}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                botInfo={{}}
                width={380}
                isLoading
              />
            </Grid>
            <Grid key="변동성 돌파 전략1" item xl={3} lg={4} md={6} sm={12}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                botInfo={{}}
                width={380}
                isLoading
              />
            </Grid>
          </Box>
        </Grid> */}
        {/* <Grid container spacing={1} className={classes.bottomContainer}>
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
        </Grid> */}
      </Container>
      <Modal open={open} onClose={handleClose}>
        <PrivateSetting handleClose={handleClose} />
      </Modal>
    </>
  );
};
export default Main;
