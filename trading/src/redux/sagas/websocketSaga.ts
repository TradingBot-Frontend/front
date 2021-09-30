import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from '@redux-saga/core/effects';

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
