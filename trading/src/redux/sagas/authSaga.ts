import {
  call,
  put,
  all,
  fork,
  takeEvery,
  take,
  race,
} from 'redux-saga/effects';
import {
  loginActions,
  LOGIN_REQUEST,
  LoginAction,
  SIGNUP_REQUEST,
  signupActions,
  SignupAction,
  LOGOUT_REQUEST,
  logoutActions,
  USERS_REQUEST,
  usersActions,
  UsersAction,
  PRIVATEKEY_REQUEST,
  privateKeyActions,
  privateKeyAction,
  KEYCREATE_REQUEST,
  keyCreateActions,
  keyCreateAction,
} from '@redux/reducers/authReducer';
import axios from '@utils/axios';
import { connectSocketSaga } from '@redux/reducers/websocketReducer';
import { AxiosResponse } from 'axios';
// put: action을 dispatch 한다.
// call: 인자로 들어온 함수를 실행시킨다. 동기적인 함수 호출일 때 사용.
// all: all에 제네레이터 함수를 배열로 담아서 넘기면 제네레이터 함수들이
//      병렬적으로 실행 -> 전부 resolve 될 때까지 기다렸다가 결과를 리턴한다.
//      (Promise.all과 같은 역할)
// fork: 인자로 들어온 함수를 실행시킨다. 비동기적인 함수 호출일 때 사용. (순서 상관 없을 때

const loginAPI = (user: any) => {
  console.log(user, '@login user');
  return axios.post('user-service/login', user);
};

// interface ILoginResponse e {
//   data: {
//     msg: string;
//   };
// }

function* login(action: LoginAction) {
  try {
    const res: AxiosResponse = yield call(loginAPI, action.payload);
    console.log(res);
    const token = res.headers?.authorization;
    console.log(token);
    yield put(loginActions.success(token));
  } catch (e) {
    yield put(loginActions.failure(e));
  }
}

function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}
export function* loginFlow(): any {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    try {
      const res: AxiosResponse = yield call(loginAPI, action.payload);
      const token = res.headers?.authorization;
      yield put(loginActions.success(token));
    } catch (e) {
      yield put(loginActions.failure(e));
    }
    yield race({
      websocket: connectSocketSaga({ payload: 'coinList' }),
      logouts: take(LOGOUT_REQUEST),
    });
    try {
      yield put(logoutActions.success());
    } catch (e) {
      yield put(logoutActions.failure());
    }
  }
}
const signupAPI = (user: any) => {
  console.log('@signupAPIuser, user: ', user);
  return axios.post('user-service/users', user);
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

const getUserAPI = () => {
  return axios.get('user-service/users');
};
const getPrivateAPI = () => {
  return axios.get('trading-service/user-api');
};
const createPrivateAPI = async (user: any) => {
  const res = await axios.post('user-api', user);
  let resValue;
  if (res.data === 'success') {
    resValue = getPrivateAPI();
  }
  return resValue;
};
function* getUser(action: UsersAction) {
  try {
    const res: AxiosResponse = yield call(getUserAPI);
    console.log(res);
    yield put(usersActions.success());
  } catch (e) {
    yield put(usersActions.failure(e));
  }
}
function* getUserPrivate(action: privateKeyAction) {
  try {
    const res: AxiosResponse = yield call(getPrivateAPI);
    yield put(privateKeyActions.success(res.data));
  } catch (e) {
    yield put(privateKeyActions.failure(e));
  }
}
function* createUserPrivate(action: keyCreateAction) {
  try {
    const obj = {
      connect_key: action.payload.apiKey,
      secret_key: action.payload.secretKey,
    };
    const res: AxiosResponse = yield call(createPrivateAPI, obj);
    if (res) {
      yield put(privateKeyActions.success(res.data));
    }
  } catch (e) {
    yield put(privateKeyActions.failure(e));
  }
}
function* watchUser() {
  yield takeEvery(USERS_REQUEST, getUser);
}
function* watchUserPrivateKey() {
  yield takeEvery(PRIVATEKEY_REQUEST, getUserPrivate);
  yield takeEvery(KEYCREATE_REQUEST, createUserPrivate);
}
export default function* authSaga() {
  yield all([
    // fork(watchLogin),
    fork(watchSignup),
    // fork(watchLogout),
    fork(watchUser),
    fork(loginFlow),
    fork(watchUserPrivateKey),
  ]);
}
