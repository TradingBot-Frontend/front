import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactVirtualizedTable } from '@components/common/ReactVirtualizedTable';
import { Container, Grid, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { coinListActions } from '@redux/reducers/coinReducer';
import { CommonInputContainer } from '@containers/common/InputContainer';
import { useCallback } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import { RootState } from '@redux/reducers';
import { coinDataUtils } from '@utils/utils';
import EnhancedTable from '@components/common/CoinTable';
import { fetchCoinActions, startInit } from '@redux/reducers/websocketReducer';

export const DsbContWrapper = styled.div``;

const DsbCoinList = () => {
  const dispatch = useDispatch();
  const coinValue = useSelector((state: RootState) => state.coin);
  const [coinData, setCoinData] = useState(coinValue);
  useEffect(() => {
    dispatch(fetchCoinActions.request());
    dispatch(startInit());
  }, []);
  useEffect(() => {
    if (coinValue?.coinList.length) {
      setCoinData(coinDataUtils.convertData(coinValue));
    }
  }, [coinValue?.coinList]);
  return <EnhancedTable coindata={coinData.length ? coinData : []} />;
};
export default DsbCoinList;
