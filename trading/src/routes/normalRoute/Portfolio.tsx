import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import ContentWrapper from '@components/common/ContentWrapper';
import PortfolioInfoCard  from '@containers/portfolio/PortfolioInfoCard';
import {PortfolioListCard}  from '@containers/portfolio/PortfolioListCard';
import PortfolioDonutChart  from '@containers/portfolio/PortfolioDonutChart';
import {useDispatch} from "react-redux";
import {getItemsActions} from "@redux/reducers/portfolioReducer";


interface Data {
    id: number,
    timeTag: string,
    coinName: string,
    uuid: string,
    price: number,
    quantity: number,
    isBid: boolean
}

interface stateProps {
    orderList: Data[];
}
type Sample =  [number, string, string, string, number, number, boolean];

const sample: readonly Sample[] = [
    [ 1429500318982, '2021-09-23T20:59:53', 'ADA', 'ae950ef0-51a9-4df2-a4c3-8cdfea54a4a1', 2800.0, 3.0, true ],
    [ 1429500318982, '2021-09-25T00:29:17', 'ADA', 'ae950ef0-51a9-4df2-a4c3-8cdfea54a4a1', 2900.0, 5.0, true ],
    [ 1429500318982, '2021-09-25T00:29:55', 'ADA', 'ae950ef0-51a9-4df2-a4c3-8cdfea54a4a1', 3000.0, 2.0, false ],
];

function createData(
    id: number,
    timeTag: string,
    coinName: string,
    uuid: string,
    price: number,
    quantity: number,
    isBid: boolean
): Data {
    return { id, timeTag, coinName, uuid, price, quantity, isBid };
}

const rows: Data[] = [];

sample.forEach(e => {
    rows.push(createData(...e))
})


const Portfolio = () => {
    const [states, setStates] = useState<any>({
            orderList: [],
        });

    const {orderList} = states;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItemsActions.request());
        setStates({
            ...states,
            orderList: rows,
        });
    }, []);

  return (
      <ContentWrapper title="Portfolio">
       <Container>
         <PortfolioInfoCard/>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <PortfolioDonutChart/>
          </Grid>
          <Grid item xs={6} >
            <PortfolioListCard
                rows={orderList}
            />
          </Grid>
        </Grid>
      </Container>
      </ContentWrapper>
  );
};
export default Portfolio;

