import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Divider } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSettingContainer';
import styled from 'styled-components';
// import { Container, Grid } from '@material-ui/core';

import { MybotBoard } from '@containers/Dashboard/MybotBoard';
import DsbCoinList from '@containers/Dashboard/DsbCoinListContainer';
import ContentWrapper from '@components/common/ContentWrapper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import BotCarousel from '../../containers/Dashboard/BotCarousel';

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

// const PSButton = styled(Button)`
//   display: flex;
//   flex-direction: row-reverse;
//   margin: 0.5rem 0.5rem 0rem 0rem;
// `;

interface PSButtonProps {
  onClick: () => void;
}

function PSButton({ onClick }: PSButtonProps) {
  return (
    <Box
      component="div"
      sx={{ display: 'flex', width: '100%', flexDirection: 'row-reverse' }}
    >
      <Button
        style={{ background: '#3072eb', color: 'white' }}
        onClick={onClick}
      >
        private setting
      </Button>
    </Box>
  );
}

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('클릭!');
  };
  return (
    <BotCarousel />
    // <ContentWrapper title="Dashboard">
    //   <Stack spacing={1}>
    //     <PSButton onClick={handleOpen} />
    //     <BotCarousel />
    //   </Stack>
    // </ContentWrapper>
  );
};
export default Main;
