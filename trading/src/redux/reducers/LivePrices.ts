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
