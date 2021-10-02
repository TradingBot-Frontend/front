import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactVirtualizedTable } from '@components/common/ReactVirtualizedTable';
import { Container, Grid, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { coinListActions } from '@redux/reducers/coinReducer';
import { CommonInputContainer } from '@containers/common/InputContainer';
import { useCallback } from 'react';

export const DsbContWrapper = styled.div``;
export interface Data {
  name: string;
  currentPrice: string;
  rateOfChange: string;
  money: string;
  id: string;
}
const DsbCoinList = ({ coindata }: any) => {
  const [states, setStates] = useState<any>({
    coinContent: [],
    filterCoinContent: [],
    keyword: '',
  });
  const { coinContent, filterCoinContent, keyword } = states;
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(coinListActions.request('asc'));
    setStates({
      ...states,
      coinContent: coindata,
      filterCoinContent: coindata,
    });
  }, [coindata]);
  useEffect(() => {
    console.log('coinData:', coindata);
  }, [coindata]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStates({
        ...states,
        keyword: e.target.value,
      });
    },
    [],
  );
  const handleKeyPress = useCallback(() => {
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
  }, []);
  return (
    <DsbContWrapper>
      {/* <Box sx={{ minWidth: 300, margin: '0rem 0rem 0rem 0rem' }}>
        <h1>Coin market</h1>
      </Box> */}
      {/* <Box
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
      </Box> */}
      <Typography variant="h5" component="h5">
        코인 시세
      </Typography>

      <Box component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
        <ReactVirtualizedTable
          rows={filterCoinContent}
          tableHeight={440}
          tableWidth="98%"
        />
      </Box>
    </DsbContWrapper>
  );
};
export default DsbCoinList;
