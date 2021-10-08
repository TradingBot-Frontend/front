import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import ContentWrapper from '@components/common/ContentWrapper';
import PortfolioInfoCard from '@containers/portfolio/PortfolioInfoCard';
import { PortfolioListCard } from '@containers/portfolio/PortfolioListCard';
import PortfolioDonutChart from '@containers/portfolio/PortfolioDonutChart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/reducers';
import {
  getItemsActions,
  getPortfolioActions,
} from '@redux/reducers/portfolioReducer';

// interface Data {
// }
//
//
// interface stateProps {
//     orderList: Data[];
// }
//
// // function createData(
// //
// // ): Data {
// //     return;
// // }
//
// const rows: Data[] = [];
//

const Portfolio = () => {
  const [states, setStates] = useState<any>({
    orderList: [],
  });

  const { orderList } = states;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsActions.request());
  }, []);
  const cardItems = useSelector((state: RootState) => state.portfolio.items);
  console.log(cardItems);

  return (
    <ContentWrapper title="Portfolio" padding="2rem 200px 2rem 200px">
      <Container>
        {/* <PortfolioInfoCard/> */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <PortfolioDonutChart />
          </Grid>
          <Grid item xs={4}>
            <PortfolioListCard rows={orderList} />
          </Grid>
        </Grid>
      </Container>
    </ContentWrapper>
  );
};
export default Portfolio;
