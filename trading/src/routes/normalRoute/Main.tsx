import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Divider } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
import { Container, Grid } from '@material-ui/core';
import { startLivePriceApp } from '@redux/reducers/LivePrices';
import { MybotBoard } from '@containers/Dashboard/MybotBoard';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import { useDispatch } from 'react-redux';

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
const Main = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('클릭!');
  };
  useEffect(() => {
    console.log('들어옴');
    dispatch(startLivePriceApp());
  }, []);
  return (
    <MainWapper>
      <div className="buttons">
        <Button
          style={{ background: '#3072eb', color: 'white' }}
          onClick={handleOpen}
        >
          private setting
        </Button>
      </div>
      <Container>
        <Grid item xs={6}>
          <MybotBoard />
        </Grid>
        <Divider />
        <Grid container justify="center">
          <Box>
            <DsbCoinList />
          </Box>
        </Grid>
        <Modal open={open} onClose={handleClose}>
          <PrivateSetting handleClose={handleClose} />
        </Modal>
      </Container>
    </MainWapper>
  );
};
export default Main;
