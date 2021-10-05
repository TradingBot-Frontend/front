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

export const DsbContWrapper = styled.div``;

const DsbCoinList = () => {
  const dispatch = useDispatch();
  const coinValue = useSelector((state: RootState) => state.coin);
  const [coinData, setCoinData] = useState(coinValue);
  useEffect(() => {
    if (coinValue?.coinList.length) {
      setCoinData(coinDataUtils.convertData(coinValue));
    }
  }, [coinValue?.coinList]);
  return <EnhancedTable coindata={coinData.length ? coinData : []} />;
};
export default DsbCoinList;
