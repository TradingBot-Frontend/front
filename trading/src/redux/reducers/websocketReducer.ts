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
interface IState {
  symbol: string;
  tickType: string;
  openPrice: string;
  closePrice: string;
  lowPrice: string;
  highPrice: string;
  value: string;
  volume: string;
  sellVolume: string;
  buyVolume: string;
  prevClosePrice: string;
  chgRate: string;
  chgAmt: string;
  timeTag: string;
}
const initialState: IState = {
  symbol: '',
  tickType: '',
  openPrice: '',
  closePrice: '',
  lowPrice: '',
  highPrice: '',
  value: '',
  volume: '',
  sellVolume: '',
  buyVolume: '',
  prevClosePrice: '',
  chgRate: '',
  chgAmt: '',
  timeTag: '',
};
const reducerUtils = {
  success: (state: any, payload: any, key: any) => {
    return {
      ...state,
      [key]: {
        data: payload,
        error: false,
      },
    };
  },
  error: (state: any, error: any, key: any) => ({
    ...state,
    [key]: {
      ...state[key],
      error,
    },
  }),
};

export default function websocketReducer(
  state = initialState,
  action: any,
  key: any,
) {
  switch (action.type) {
    case 'SUCCESS':
      return reducerUtils.success(state, action.payload, key);
    default:
      return state;
  }
}
