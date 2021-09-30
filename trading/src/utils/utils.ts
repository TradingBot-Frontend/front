const coinDataUtils = {
  init: (data: any, state: any) => {
    const newData: any = [];
    data.forEach((coin: any) => {
      newData.push({
        symbol: coin.symbol,
        tickType: coin.tickType,
        openPrice: coin.openPrice,
        closePrice: coin.closePrice,
        lowPrice: coin.lowPrice,
        highPrice: coin.highPrice,
        value: coin.value,
        volume: coin.volume,
        sellVolume: coin.sellVolume,
        buyVolume: coin.buyVolume,
        prevClosePrice: coin.prevClosePrice,
        chgRate: coin.chgRate,
        chgAmt: coin.chgAmt,
        timeTag: coin.timeTag,
      });
    });
    return newData;
  },
  update: (data: any, state: any) => {
    const targetCoin = state.coin.conList;
    console.log('state:', targetCoin, 'data:', data);
  },
};
export { coinDataUtils };
