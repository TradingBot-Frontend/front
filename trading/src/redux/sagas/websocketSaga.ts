/* eslint-disable no-param-reassign */
import { buffers, eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from '@redux-saga/core/effects';
import { flush, select, delay } from 'redux-saga/effects';
import { ICoinState, START_INIT } from '@redux/reducers/websocketReducer';
import { connectSocketSaga } from '@redux/reducers/websocketReducer';
// import axios from '@utils/coinAxios';
import axios from 'axios';
import {
  fetchCoinActions,
  fetchCoinAction,
  FETCH_COIN_REQUEST,
} from '@redux/reducers/websocketReducer';

const createSocket = () => {
  const client = new WebSocket('ws://3.36.52.243:8081/ws/coins');
  client.binaryType = 'arraybuffer';
  return client;
};
const connectSocket = (socket: any, action: any, buffer: any) => {
  return eventChannel((emit) => {
    socket.open = () => {
      console.log('opening websocket');
    };
    socket.onmessage = (event: any) => {
      // const arr = new Uint8Array(evt.data);
      const data = JSON.parse(event.data);
      // console.log('socket onmessage: ', data);
      emit(data);
    };
    socket.onerror = (error: any) => {
      console.log('ERROR:', error);
      console.dir(error);
    };
    const unsubscribe = () => {
      socket.close();
    };

    return unsubscribe;
  }, buffer || buffer.none());
};

export const createConnectSocketSaga = (type: any, dataMapper: any) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  return function* (action = {}): any {
    // console.log('action:', action); action.payload:'coin'
    const client = yield call(createSocket);
    const clientChannel = yield call(
      connectSocket,
      client,
      action,
      buffers.expanding(500),
    );
    try {
      while (true) {
        // 약 200ms동안 메세지 모으는중...
        const datas = yield flush(clientChannel);
        const state = yield select();
        if (datas.length) {
          // 이 문구 없으면 메시지를 받았든 받지 않았든 200ms 마다 항상 dispatch 작업을 해서 혼란 야기할 수 도 있음
          // newCoinList: 기존값 data: 새로 들어온 값
          let newCoinList: any = [...state.coin.coinList];
          let changeFlag = '0';
          const flagMap: any = {
            currentPrice: `currentPrice`,
            money: `money`,
          };
          newCoinList = newCoinList.map((data: any) => {
            return {
              ...data,
              color: 'false',
            };
          });
          datas.forEach((data: ICoinState) => {
            const symbol: string = data.symbol as string;
            // if (state.coin.coinList[symbol]) {
            const targetIdx = newCoinList.findIndex(
              (coin: any) => coin.symbol === symbol,
            );
            if (targetIdx !== -1) {
              // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
              if (newCoinList[targetIdx].chgAmt !== data.chgAmt) {
                changeFlag = 'currentPrice';
              } else if (
                newCoinList[targetIdx].money !==
                `${parseInt(data.value, 10).toLocaleString()}원`
              ) {
                changeFlag = 'money';
              }
              if (
                newCoinList[targetIdx].timeTag.split('T')[1] <
                data.timeTag.split('T')[1]
              ) {
                newCoinList[targetIdx] = data;
                newCoinList[targetIdx].color = 'true';
                newCoinList[targetIdx].changeCell = flagMap[changeFlag];
              }
            } else {
              // 새로운 데이터면 그냥 넣음
              newCoinList.push(data);
            }
          });
          yield put({ type: SUCCESS, payload: newCoinList });
          // yield put({ type: SUCCESS, payload: dataMapper(sortedData, state) });
        }
        yield delay(500); // 500ms 동안 대기
      }
    } catch (e) {
      yield put({ type: ERROR, payload: e });
    }
  };
};
const coinAPI = () => {
  return axios.get('http://3.36.52.243:8081/coins');
};
function* fetchCoin(): any {
  try {
    const res = yield call(coinAPI);
    yield put(fetchCoinActions.success(res.data));
  } catch (e) {
    yield put(fetchCoinActions.failure(e));
  }
}
function* wsSaga(): any {
  // const channel = yield call(initWebsocket);
  // while (true) {
  //   const action = yield take(channel);
  //   yield put(action);
  // }
  yield connectSocketSaga({ payload: 'coinList' });
}
export function* watchLivePricesSaga() {
  yield takeEvery(FETCH_COIN_REQUEST, fetchCoin);
  yield takeEvery(START_INIT, wsSaga);
}
