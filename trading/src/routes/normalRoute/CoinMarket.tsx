import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ReactVirtualizedTable from '@components/common/ReactVirtualizedTable';

const CoinMarket = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ReactVirtualizedTable />
        </Grid>
        <Grid item xs={6}>
          <div>코인 마켓</div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CoinMarket;
