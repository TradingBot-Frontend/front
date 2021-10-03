import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Divider } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
import { Container, Grid, Paper } from '@material-ui/core';
import { startInit } from '@redux/reducers/websocketReducer';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import { useDispatch, useSelector } from 'react-redux';
import BotCard from '@components/TradingBot/BotCard';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';
import { RootState } from '@redux/reducers';
import { coinDataUtils } from '@utils/utils';
import EnhancedTable from '@components/common/CoinTable';

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
const useStyles = makeStyles((theme) => ({
  topContainer: {
    margin: '2rem 0rem 0rem 0rem',
    height: '30%',
    display: 'flex',
    flexDirection: 'row',
  },
  bottomContainer: {
    margin: '3rem 0rem 0rem 0rem',
    height: '30rem',
  },
  coinContainer: {
    height: '30rem',
    paddingTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    // margin: '0rem 0rem 0rem 0rem',
  },
}));
const Main = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const coinValue = useSelector((state: RootState) => state.coin);
  const [coinData, setCoinData] = useState(coinValue);
  // const coinData = useSelector((state: RootState) => state.coin);
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('클릭!');
  };
  useEffect(() => {
    console.log('들어옴');
    dispatch(startInit());
  }, []);
  useEffect(() => {
    if (coinValue?.coinList.length) {
      setCoinData(coinDataUtils.convertData(coinValue));
    }
  }, [coinValue?.coinList]);
  return (
    <MainWapper>
      <Container style={{ border: '1px solid' }}>
        <Grid item lg={4} md={6} sm={12} className={classes.topContainer}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={12} sm={6}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <BotCard
                title="변동성 돌파 전략1"
                profit="수익률 +25.4%"
                isLoading={false}
              />
            </Grid>
          </Box>
        </Grid>
        <Grid container spacing={4} className={classes.bottomContainer}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.coinContainer}>
              <EnhancedTable coindata={coinData.length ? coinData : []} />
              {/* <DsbCoinList coindata={coinData.length ? coinData : []} /> */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.coinContainer}>
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
