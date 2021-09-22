import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box } from '@material-ui/core';
import PrivateSetting from '@containers/Dashboard/privateSetting';
import styled from 'styled-components';

const Buttons = styled(Button)`
  background-color: #231381;
`;
const CoinMarket = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('클릭!');
  };
  return (
    <>
      <div>Dashboard Main Page</div>
      <Button onClick={handleOpen}>private setting</Button>
      <Modal open={open} onClose={handleClose}>
        <>
          <PrivateSetting handleClose={handleClose} />
        </>
      </Modal>
    </>
  );
};
export default CoinMarket;
