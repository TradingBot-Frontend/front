/* eslint-disable no-param-reassign */
import { buffers, eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from '@redux-saga/core/effects';
import encoding from 'text-encoding';
import { flush, select, delay } from 'redux-saga/effects';
import { ICoinState, ICointState } from '@redux/reducers/websocketReducer';

function initWebsocket() {
  console.log('initWebsocket');
  return eventChannel((emitter) => {
    // websocket 구독하기 나중에 ip 받으면 그에 따라 수정 필요
    const ws = new WebSocket('ws://localhost:1234/ws');
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
function* wsSaga(): any {
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
export function* watchLivePricesSaga() {
  yield takeEvery('START_LIVE_PRICE_APP', wsSaga);
}

const createSocket = () => {
  const client = new WebSocket('ws://localhost:1234/ws');
  client.binaryType = 'arraybuffer';
  return client;
};
const connectSocket = (socket: any, action: any, buffer: any) => {
  return eventChannel((emit) => {
    socket.open = () => {
      console.log('opening websocket');
    };
    socket.onmessage = (event) => {
      const enc = new encoding.TextDecoder('utf-8');
      // const arr = new Uint8Array(evt.data);
      const data = JSON.parse(enc.decode(event.data));

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
    const client = yield call(createSocket);
    const clientChannel = yield call(
      connectSocket,
      client,
      action,
      buffers.expanding(500),
    );
    try {
      while (true) {
        const datas = yield flush(clientChannel);
        const state = yield select();
        if (datas.length) {
          const sortedObj: any = {};
          datas.forEach((data: ICoinState) => {
            const symbol: string = data.symbol as string;
            if (sortedObj[symbol]) {
              // 버퍼에 있는 데이터중 시간이 가장 최근인 데이터만 남김
              sortedObj[symbol] =
                sortedObj[symbol].timeTag > data.timeTag
                  ? sortedObj[symbol]
                  : data;
            } else {
              // 새로운 데이터면 그냥 넣음
              sortedObj[symbol] = data;
            }
          });
          const sortedData = Object.keys(sortedObj).reduce(
            (data: any) => sortedObj[data],
          );
          yield put({ type: SUCCESS, payload: dataMapper(sortedData, state) });
        }
        yield delay(500); // 500ms 동안 대기
      }
    } catch (e) {
      yield put({ type: ERROR, payload: e });
    }
  };
};
