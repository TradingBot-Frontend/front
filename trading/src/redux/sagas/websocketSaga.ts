/* eslint-disable no-param-reassign */
import { buffers, eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from '@redux-saga/core/effects';
import { flush, select, delay } from 'redux-saga/effects';
import { ICoinState, START_INIT } from '@redux/reducers/websocketReducer';
import { connectSocketSaga } from '@redux/reducers/websocketReducer';

function initWebsocket() {
  console.log('initWebsocket');
  return eventChannel((emitter) => {
    // websocket 구독하기 나중에 ip 받으면 그에 따라 수정 필요
    const ws = new WebSocket('ws://3.36.166.137:8080/coins');
    ws.onopen = () => {
      console.log('opening websocket');
    };
    ws.onerror = (error) => {
      console.log('ERROR:', error);
      console.dir(error);
    };
    ws.onmessage = (e) => {
      let value = null;
      try {
        value = JSON.parse(e.data);
      } catch (error) {
        console.error('Error parsing data:', error);
      }
      console.log('value', value);
      if (value && value.type === 'ticker') {
        emitter({
          type: 'POST_LIVE_PRICE_DATA',
          data: value.price,
        });
      }
    };
    return () => {
      ws.close();
    };
  });
}
const createSocket = () => {
  const client = new WebSocket('ws://3.36.166.137:8080/coins');
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
          const newCoinList: any = [...state.coin.coinList];
          datas.forEach((data: ICoinState) => {
            const symbol: string = data.symbol as string;
            // if (state.coin.coinList[symbol]) {
            const targetIdx = newCoinList.findIndex(
              (coin: any) => coin.symbol === symbol,
            );
            if (targetIdx !== -1) {
              // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
              if (
                newCoinList[targetIdx].timeTag.split('T')[1] <
                data.timeTag.split('T')[1]
              ) {
                newCoinList[targetIdx] = data;
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
function* wsSaga(): any {
  // const channel = yield call(initWebsocket);
  // while (true) {
  //   const action = yield take(channel);
  //   yield put(action);
  // }
  yield connectSocketSaga({ payload: 'coinList' });
}
export function* watchLivePricesSaga() {
  yield takeEvery(START_INIT, wsSaga);
}
