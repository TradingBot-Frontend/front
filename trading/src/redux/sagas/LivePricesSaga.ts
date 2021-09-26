import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from '@redux-saga/core/effects';

function initWebsocket() {
  console.log('initWebsocket');
  return eventChannel((emitter) => {
    const subscribe = {
      type: 'subscribe',
      channels: [
        {
          name: 'ticker',
          product_ids: ['BTC-USD'],
        },
      ],
    };
    // websocket 구독하기
    const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');
    ws.onopen = () => {
      console.log('opening websocket');
      ws.send(JSON.stringify(subscribe));
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
        console.error('Error parsing data:', error.data);
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
