import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactVirtualizedTable } from '@components/common/ReactVirtualizedTable';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { coinListActions } from '@redux/reducers/coinReducer';
import { CommonInputContainer } from '@containers/common/InputContainer';

interface Data {
  name: string;
  currentPrice: string;
  rateOfChange: string;
  money: string;
  id: number;
}
type Sample = [string, string, string, string];

const sample: readonly Sample[] = [
  ['비트코인', '55,000,000', '+2.5%', '151.445'],
  ['이클', '55,000,000', '+2.5%', '151.445'],
  ['도지코인', '55,000,000', '+2.5%', '151.445'],
  ['비트토렌트', '55,000,000', '+2.5%', '151.445'],
  ['페이코인', '55,000,000', '+2.5%', '151.445'],
];

function createData(
  id: number,
  name: string,
  currentPrice: string,
  rateOfChange: string,
  money: string,
): Data {
  return { id, name, currentPrice, rateOfChange, money };
}

const rows: Data[] = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}
const DsbCoinListWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
`;

const DsbCoinList = () => {
  const [states, setStates] = useState<any>({
    coinContent: [],
    filterCoinContent: [],
    keyword: '',
  });
  const { coinContent, filterCoinContent, keyword } = states;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(coinListActions.request('asc'));
    setStates({
      ...states,
      coinContent: rows,
      filterCoinContent: rows,
    });
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStates({
      ...states,
      keyword: e.target.value,
    });
  };
  const handleKeyPress = () => {
    if (keyword) {
      setStates({
        ...states,
        filterCoinContent: coinContent.filter((data: Data) => {
          return data.name.includes(keyword);
        }),
      });
    } else {
      setStates({
        ...states,
        filterCoinContent: coinContent,
      });
    }
  };
  return (
    // <Container sx={{ display: 'flex', justifyContent: 'center' }}>
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={8}>
        <Box sx={{ minWidth: 300, margin: '0rem 15rem 0rem 0rem' }}>
          <h1>Coin market</h1>
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            margin: '0rem 0rem 1rem 0rem',
          }}
        >
          <CommonInputContainer
            placeholder="search"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </Box>
        <ReactVirtualizedTable rows={filterCoinContent} tableHeight={600} />
      </Grid>
    </Grid>
    // </Container>
  );
};
export default DsbCoinList;
