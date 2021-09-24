import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import axios from '@utils/axios';
import {
  Bot,
  Bots,
  GetBotAction,
  getBotActions,
  getBotsActions,
  GET_BOTS_REQUEST,
  GET_BOT_REQUEST,
} from '@redux/reducers/botReducer';

// GET bots
const getBotsAPI = () => {
  return axios.get('bots');
};

interface IResponse<T> {
  data: T;
}

interface IgetBotsResponse {
  'token-info': Bots;
}

function* getBots() {
  try {
    const res: IResponse<IgetBotsResponse> = yield call(getBotsAPI);
    yield put(getBotsActions.success(res.data['token-info']));
  } catch (e) {
    yield put(getBotsActions.failure(e));
  }
}

function* watchGetBots() {
  yield takeEvery(GET_BOTS_REQUEST, getBots);
}

// GET bots/{bot-id}
const getBotAPI = (botId: string) => {
  return axios.get(`bots/${botId}`);
};

interface IgetBotResponse {
  'token-info': Bot;
}

function* getBot(action: GetBotAction) {
  try {
    const res: IResponse<IgetBotResponse> = yield call(
      getBotAPI,
      action.payload,
    );
    yield put(getBotActions.success(res.data['token-info']));
  } catch (e) {
    yield put(getBotActions.failure(e));
  }
}

function* watchGetBot() {
  yield takeEvery(GET_BOT_REQUEST, getBot);
}

export default function* botSaga() {
  yield all([fork(watchGetBots), fork(watchGetBot)]);
}
