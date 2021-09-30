import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import ContentWrapper from '@components/common/ContentWrapper';
import PortfolioInfoCard  from '@containers/portfolio/PortfolioInfoCard';
import PortfolioListCard  from '@containers/portfolio/PortfolioListCard';
import PortfolioDonutChart  from '@containers/portfolio/PortfolioDonutChart';


const Portfolio = () => {
    const [states, setStates] = useState<any>();

  return (
      <ContentWrapper title="Portfolio">
       <Container>
         <PortfolioInfoCard/>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <PortfolioDonutChart/>
          </Grid>
          <Grid item xs={6} >
            <PortfolioListCard />
          </Grid>
        </Grid>
      </Container>
      </ContentWrapper>
  );
};
export default Portfolio;

