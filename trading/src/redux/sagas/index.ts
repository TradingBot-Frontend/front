import { all, fork } from 'redux-saga/effects';
import dotenv from 'dotenv';
import axios from 'axios';
import authSaga from './authSaga';
import coinSaga from './coinSaga';
import { watchLivePricesSaga } from './LivePricesSaga';

// dotenv.config();
// axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  // 여기에 saga 추가하면 됩니다!
  yield all([fork(authSaga), fork(coinSaga), fork(watchLivePricesSaga)]);
}
