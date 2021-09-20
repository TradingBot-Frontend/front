import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import ReactVirtualizedTable from '@components/common/ReactVirtualizedTable';
import Box from '@mui/material/Box';
import { TimeLine } from '@containers/CoinMarket/TimeLineContainer';
import { CommonInputContainer } from '@containers/common/InputContainer';

const CoinMarket = () => {
  const [search, setsearch] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };
  const handleKeyPress = () => {
    console.log('press key: ', search);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ width: 300, margin: '0rem 30rem 0rem 0rem' }}>
            <h1>Coin market</h1>
          </Box>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'row-reverse', margin: '0rem 0rem 1rem 0rem' }}>
            <CommonInputContainer placeholder="search" onChange={handleInputChange} onKeyPress={handleKeyPress} />
          </Box>

          <ReactVirtualizedTable />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ width: 300, margin: '0rem 30rem 0rem 0rem' }}>
            <h1>실시간 타임라인</h1>
          </Box>
          <TimeLine />
        </Grid>
      </Grid>
    </Container>
  );
};
export default CoinMarket;
