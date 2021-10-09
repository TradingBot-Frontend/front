import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
import { Container, Grid, Paper, useMediaQuery } from '@material-ui/core';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import { makeStyles } from '@material-ui/core/styles';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';
import btc from '@assets/images/btc.png';
import bitcoin from '@assets/images/bitcoin.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { RootState } from '../../redux/reducers/index';
import { getBotsActions } from '../../redux/reducers/botReducer';
import BotCard from '../../components/TradingBot/BotCard';

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: auto;
  font-family: 'sleig';
  /* margin: 20rem 0rem 0rem 0rem; */
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    margin: 0.5rem 0.5rem 0rem 0rem;
  }
`;
const MainBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 40%;
  overflow: hidden;
  .mainTitle {
    font-size: 30px;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .text {
    position: absolute;
    color: #ffffff;
    top: 8rem;
    /* left: 30rem; */
  }
  .photo {
    width: 100%;
    height: 63rem;
  }
`;
const TradingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem 0rem 0rem;
  height: 40%;
  border: 1px solid;
  .tradingTitle {
    font-size: 30px;
    margin: 0rem 0rem 1rem 0rem;
  }
  .tradingcard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Papers = styled(Paper)`
  height: 15rem;
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 20px;
  }
  .content {
    font-size: 15px;
    color: #ccc;
  }
`;
const Buttons = styled.button`
  color: #ffffff;
  background-color: #353635;
  width: 5rem;
  height: 2rem;
  border-radius: 25px;
  margin: 0.5rem 0rem 0rem 0rem;
`;
const useStyles = makeStyles((theme) => ({
  topContainer: {
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
  const classes = useStyles();
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

  return <Box className={classes.topContainer}>{botContainer}</Box>;
};

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  return (
    <MainWapper>
      <MainBoxWrapper>
        <div className="mainTitle">
          <img src={bitcoin} alt="" className="photo" />
          <div className="text">당신의 트레이딩을 맡기세요</div>
        </div>
      </MainBoxWrapper>
      <Container style={{ height: '100%' }}>
        <TradingWrapper>
          <div className="tradingTitle">추천 트레이딩봇을 소개합니다.</div>
          <div className="tradingcard">
            <Papers>
              <img
                src={btc}
                alt=""
                style={{
                  width: '5rem',
                  height: '5rem',
                  margin: '3rem 0rem 0rem 0rem',
                }}
              />
              <div className="title">BTC</div>
              <div className="content">15%</div>
              <Buttons>ON</Buttons>
            </Papers>
            <Papers>
              <img
                src={btc}
                alt=""
                style={{
                  width: '5rem',
                  height: '5rem',
                  margin: '3rem 0rem 0rem 0rem',
                }}
              />
              <div className="title">BTC</div>
              <div className="content">15%</div>
              <Buttons>ON</Buttons>
            </Papers>
            <Papers>
              <img
                src={btc}
                alt=""
                style={{
                  width: '5rem',
                  height: '5rem',
                  margin: '3rem 0rem 0rem 0rem',
                }}
              />
              <div className="title">BTC</div>
              <div className="content">15%</div>
              <Buttons>ON</Buttons>
            </Papers>
            <Papers>
              <img
                src={btc}
                alt=""
                style={{
                  width: '5rem',
                  height: '5rem',
                  margin: '3rem 0rem 0rem 0rem',
                }}
              />
              <div className="title">BTC</div>
              <div className="content">15%</div>
              <Buttons>ON</Buttons>
            </Papers>
          </div>
        </TradingWrapper>
      </Container>
    </MainWapper>
  );
};
export default Main;
