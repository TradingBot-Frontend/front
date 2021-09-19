import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ReactVirtualizedTable from '@components/common/ReactVirtualizedTable';
import Box from '@mui/material/Box';
import { TimeLine } from '@containers/CoinMarket/TimeLineContainer';

const CoinMarket = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ width: 300, margin: '0rem 30rem 0rem 0rem' }}>
            <h1>Coin market</h1>
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
