import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import axios from '@utils/axios';
import {
  Bot,
  Bots,
  deleteBotActions,
  DELETE_BOT_REQUEST,
  GetBotAction,
  getBotActions,
  getBotsActions,
  GET_BOTS_REQUEST,
  GET_BOT_REQUEST,
  updateBotActions,
  UPDATE_BOT_REQUEST,
} from '@redux/reducers/botReducer';
import { AxiosResponse } from 'axios';

// GET bots
const getBotsAPI = () => {
  return axios.get('bots');
};

interface IResponse<T> {
  data: T;
}

interface IResponseMsg {
  msg: string;
}

function* getBots() {
  try {
    const res: AxiosResponse = yield call(getBotsAPI);
    yield put(getBotsActions.success(res.data));
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

// PATCH bots/{bot-id}
const updateBotAPI = (botInfo: Bot) => {
  return axios.patch(`bots/${botInfo.id}`, botInfo);
};

function* updateBot(action: GetBotAction) {
  try {
    const res: IResponse<IResponseMsg> = yield call(
      updateBotAPI,
      action.payload,
    );
    yield put(updateBotActions.success(res.data.msg));
  } catch (e) {
    yield put(updateBotActions.failure(e));
  }
}

function* watchUpdateBot() {
  yield takeEvery(UPDATE_BOT_REQUEST, updateBot);
}

// DELETE bots/{bot-id}
const deleteBotAPI = (botInfo: Bot) => {
  return axios.delete(`bots/${botInfo.id}`);
};

function* deleteBot(action: GetBotAction) {
  try {
    const res: IResponse<IResponseMsg> = yield call(
      deleteBotAPI,
      action.payload,
    );
    yield put(deleteBotActions.success(res.data.msg));
  } catch (e) {
    yield put(deleteBotActions.failure(e));
  }
}

function* watchDeleteBot() {
  yield takeEvery(DELETE_BOT_REQUEST, deleteBot);
}

export default function* botSaga() {
  yield all([
    fork(watchGetBots),
    fork(watchGetBot),
    fork(watchUpdateBot),
    fork(watchDeleteBot),
  ]);
}
