import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import { loginActions, LOGIN_REQUEST, LoginAction, SIGNUP_REQUEST, signupActions } from '@redux/reducers/authReducer';
import axios from '@utils/axios';
import { SignupAction } from '../reducers/authReducer';

const loginAPI = (user: any) => {
  console.log(user, '@login user');
  // const config = {
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  // };
  return axios.post('sign-in', user);
};

interface ILoginResponse {
  data: {
    msg: string;
  };
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

const signupAPI = (user: any) => {
  // const config = {
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  // };
  return axios.post('sign-up', user);
};

interface ISignUpResponse {
  data: {
    msg: string;
  };
}

function* signup(action: SignupAction) {
  try {
    const res: ISignUpResponse = yield call(signupAPI, action.payload);
    yield put(signupActions.success(res));
  } catch (e) {
    yield put(signupActions.failure(e));
  }
}

function* watchSignup() {
  yield takeEvery(SIGNUP_REQUEST, signup);
}

export default function* authSaga() {
  yield all([fork(watchLogin), fork(watchSignup)]);
}
