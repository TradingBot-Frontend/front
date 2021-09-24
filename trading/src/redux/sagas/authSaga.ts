import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import {
  loginActions,
  LOGIN_REQUEST,
  LoginAction,
  SIGNUP_REQUEST,
  signupActions,
  SignupAction,
  LOGOUT_REQUEST,
  logoutActions,
} from '@redux/reducers/authReducer';
import axios from '@utils/axios';
// put: action을 dispatch 한다.
// call: 인자로 들어온 함수를 실행시킨다. 동기적인 함수 호출일 때 사용.
// all: all에 제네레이터 함수를 배열로 담아서 넘기면 제네레이터 함수들이
//      병렬적으로 실행 -> 전부 resolve 될 때까지 기다렸다가 결과를 리턴한다.
//      (Promise.all과 같은 역할)
// fork: 인자로 들어온 함수를 실행시킨다. 비동기적인 함수 호출일 때 사용. (순서 상관 없을 때

const loginAPI = (user: any) => {
  console.log(user, '@login user');
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

function* logout() {
  try {
    yield put(logoutActions.success());
  } catch (e) {
    yield put(logoutActions.failure());
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield all([fork(watchLogin), fork(watchSignup), fork(watchLogout)]);
}
