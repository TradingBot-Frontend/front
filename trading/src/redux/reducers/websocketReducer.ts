import { createConnectSocketSaga } from '@redux/sagas/websocketSaga';
import { coinDataUtils } from '@utils/utils';

const CONNECT_SOCKET = 'coin/CONNECT_SOCKET' as const;
const CONNECT_SOCKET_SUCCESS = 'coin/CONNECT_SOCKET_SUCCESS' as const;
const CONNECT_SOCKET_ERROR = 'coin/CONNECT_SOCKET_ERROR' as const;

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
export interface ICoinState {
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
const initialState: ICoinState = {
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
//TODO: init 초기 함수 key 갖고 있도록 바꾸기
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
const requestActions = (type: any, key: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state: any, action: any) => {
    switch (action.type) {
      case SUCCESS:
        return reducerUtils.success(state, action.payload, key);
      case ERROR:
        return reducerUtils.error(state, action.payload, key);
      default:
        return state;
    }
  };
};
export const connectSocketSaga = createConnectSocketSaga(
  CONNECT_SOCKET,
  coinDataUtils.update,
);

export default function websocketReducer(
  state = initialState,
  action: any,
  // key: any,
) {
  switch (action.type) {
    case 'SUCCESS':
      return state;
    //   return reducerUtils.success(state, action.payload, key);
    case CONNECT_SOCKET_SUCCESS:
    case CONNECT_SOCKET_ERROR:
      return requestActions(CONNECT_SOCKET)(state, action);
    default:
      return state;
  }
}
