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
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { green } from '@mui/material/colors';
import NewBotCard from '@components/TradingBot/NewBotCard';
import { RootState } from '../../redux/reducers/index';
import { getBotsActions } from '../../redux/reducers/botReducer';
import BotCard from '../../components/TradingBot/BotCard';

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80rem;
  font-family: 'sleig';
  background-color: #ffffff;
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
  height: 20%;
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
    top: 5rem;
    right: 15rem;
    /* left: 10rem; */
  }
  .photo {
    width: 100%;
    height: 22rem;
  }
`;
const TradingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem 0rem 0rem;
  height: 40%;
  /* border: 1px solid; */
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
  height: 99%;
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
  height: 10%;
  border-radius: 25px;
  margin: 0.5rem 0rem 0rem 0rem;
`;
const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
  /* border: 1px solid; */
  margin: 2rem 0rem 0rem 0rem;
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
  },
  chartContainer: {
    height: '90%',
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
          <Box key={bot.id} sx={{ marginRight: '7rem' }}>
            <NewBotCard botInfo={bot} isLoading={isLoading} />
          </Box>
        )}
      </>,
    );
  }
  const noData = (
    <>
      <AddCircleIcon sx={{ color: green[500], fontSize: 40 }} />
      <Typography variant="h4" align="center">
        트레이딩봇을 추가해주세요!
      </Typography>
    </>
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
    <MainWapper>
      <MainBoxWrapper>
        <div className="mainTitle">
          <img src={bitcoin} alt="" className="photo" />
          <div className="text">당신의 트레이딩을 맡기세요</div>
        </div>
      </MainBoxWrapper>
      <Container style={{ height: '70%' }}>
        <TradingWrapper>
          <div className="tradingTitle">트레이딩봇</div>
          <MainCards />
        </TradingWrapper>
        <TableWrapper>
          <DsbCoinList />
        </TableWrapper>
      </Container>
    </MainWapper>
  );
};
export default Main;
