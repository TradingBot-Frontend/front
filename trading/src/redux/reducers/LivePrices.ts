export const startLivePriceApp = () => {
  return {
    type: 'START_LIVE_PRICE_APP',
  };
};

export const postLivePriceData = (livePriceData: any) => {
  return {
    type: 'POST_LIVE_PRICE_DATA',
    data: livePriceData,
  };
};

const initialState = {
  livePriceData: [],
  timeLabels: [],
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case 'POST_LIVE_PRICE_DATA':
      return {
        ...state,
        livePriceData: [...state.livePriceData, action.data],
        timeLabels: [...state.timeLabels, new Date().toLocaleTimeString()],
      };
    default:
      return state;
  }
}
