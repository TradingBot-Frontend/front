import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import { loginActions, LOGIN_REQUEST, LoginAction } from '@redux/reducers/authReducer';
import axios from 'axios';

const loginAPI = (user: any) => {
  console.log(user, '@login user');
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  return axios.post('sign-in', user, config);
};

interface ILoginResponse {
  msg: string;
}

function* login(action: LoginAction) {
  try {
    const res: ILoginResponse = yield call(loginAPI, action.payload);
    console.log(res);
    yield put(loginActions.success(res));
  } catch (e) {
    yield put(loginActions.failure(e));
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}
