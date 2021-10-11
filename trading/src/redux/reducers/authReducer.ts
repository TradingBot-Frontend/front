import { setAuthToken } from '@utils/axios';

// action types
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;

export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE' as const;

export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE' as const;

export const PRIVATEKEY_REQUEST = 'auth/PRIVATEKEY_REQUEST' as const;
export const PRIVATEKEY_SUCCESS = 'auth/PRIVATEKEY_SUCCESS' as const;
export const PRIVATEKEY_FAILURE = 'auth/PRIVATEKEY_FAILURE' as const;

export const USERS_REQUEST = 'auth/USERS_REQUEST' as const;
export const USERS_SUCCESS = 'auth/USERS_SUCCESS' as const;
export const USERS_FAILURE = 'auth/USERS_FAILURE' as const;

export const KEYCREATE_REQUEST = 'auth/KEYCREATE_REQUEST' as const;
export const KEYCREATE_SUCCESS = 'auth/KEYCREATE_SUCCESS' as const;
export const KEYCREATE_FAILURE = 'auth/KEYCREATE_FAILURE' as const;

// type LoginAction =
// | typeof LOGIN_REQUEST
// | typeof LOGIN_SUCCESS
// | typeof LOGIN_FAILURE;

// interface ActionCreator<T> {
//   type: LoginAction;
//   payload: T;
// }

// action creators
// const request = (user): ActionCreator<typeof user> => ({type: LOGIN_REQUEST, payload: user});
// const success = (user): ActionCreator<typeof user> => ({type: LOGIN_SUCCESS, payload: user});
// const failure = (error): ActionCreator<typeof error> => ({type: LOGIN_FAILURE, payload: error});

// action creators
const loginRequest = (user: any) => ({ type: LOGIN_REQUEST, payload: user });
const loginSuccess = (loginRes: any) => ({
  type: LOGIN_SUCCESS,
  payload: loginRes,
});
const loginFailure = (error: any) => ({ type: LOGIN_FAILURE, payload: error });
export const loginActions = {
  request: loginRequest,
  success: loginSuccess,
  failure: loginFailure,
};

const signupRequest = (user: any) => ({ type: SIGNUP_REQUEST, payload: user });
const signupSuccess = (res: any) => ({ type: SIGNUP_SUCCESS, payload: res });
const signupFailure = (error: any) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
export const signupActions = {
  request: signupRequest,
  success: signupSuccess,
  failure: signupFailure,
};

const logoutRequest = () => ({ type: LOGOUT_REQUEST, payload: null });
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS, payload: null });
const logoutFailure = () => ({ type: LOGOUT_FAILURE, payload: null });
export const logoutActions = {
  request: logoutRequest,
  success: logoutSuccess,
  failure: logoutFailure,
};

const usersRequest = () => ({ type: USERS_REQUEST, payload: null });
const usersSuccess = (res: any) => ({ type: USERS_SUCCESS, payload: res });
const usersFailure = (error: any) => ({ type: USERS_FAILURE, payload: error });
export const usersActions = {
  request: usersRequest,
  success: usersSuccess,
  failure: usersFailure,
};

const privateKeyRequest = () => ({
  type: PRIVATEKEY_REQUEST,
  // payload: form,
});
const privateKeyRequestSuccess = (res: any) => ({
  type: PRIVATEKEY_SUCCESS,
  payload: res,
});
const privateKeyRequestFailure = (error: any) => ({
  type: PRIVATEKEY_FAILURE,
  payload: error,
});

export const privateKeyActions = {
  request: privateKeyRequest,
  success: privateKeyRequestSuccess,
  failure: privateKeyRequestFailure,
};
const keyCreateRequest = (form: any) => ({
  type: KEYCREATE_REQUEST,
  payload: form,
});
const keyCreateRequestSuccess = (res: any) => ({
  type: KEYCREATE_SUCCESS,
  payload: res,
});
const keyCreateRequestFailure = (error: any) => ({
  type: KEYCREATE_FAILURE,
  payload: error,
});

export const keyCreateActions = {
  request: keyCreateRequest,
  success: keyCreateRequestSuccess,
  failure: keyCreateRequestFailure,
};

export type LoginAction =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>;
export type SignupAction =
  | ReturnType<typeof signupRequest>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFailure>;
export type LogoutAction =
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof logoutFailure>;
export type privateKeyAction =
  | ReturnType<typeof privateKeyRequest>
  | ReturnType<typeof privateKeyRequestSuccess>
  | ReturnType<typeof privateKeyRequestFailure>;
export type keyCreateAction =
  | ReturnType<typeof keyCreateRequest>
  | ReturnType<typeof keyCreateRequestSuccess>
  | ReturnType<typeof keyCreateRequestFailure>;
export type UsersAction =
  | ReturnType<typeof usersRequest>
  | ReturnType<typeof usersSuccess>
  | ReturnType<typeof usersFailure>;
export type AuthAction =
  | LoginAction
  | SignupAction
  | LogoutAction
  | privateKeyAction
  | UsersAction
  | keyCreateAction;

interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  email: string;
  name: string;
  password: string;
  // successMsg: string;
  errorMsg: string;
  apiKey: string | null;
  secretKey: string | null;
}

const initialState: IAuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  email: '',
  name: '',
  password: '',
  // successMsg: '',
  errorMsg: '',
  apiKey: '',
  secretKey: '',
};

export default function authReducer(
  state: IAuthState = initialState,
  action: AuthAction,
): IAuthState {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case USERS_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case LOGIN_SUCCESS: {
      const token = action.payload;
      if (token) {
        localStorage.setItem('token', token); // localStorage에 token 저장
        setAuthToken(token); // 모든 axios 요청 헤더에 token이 들어가게 설정
        // const base64: string = token.split(' ')[1];
        // const base64payload: string = base64.split('.')[1];
        // const payload: any = Buffer.from(base64payload, 'base64');
        // const decoded: any = JSON.parse(payload.toString());
        // const {email, username} = deocded;
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          // email,
          // useranme,
        };
      }
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    case LOGIN_FAILURE:
      alert('로그인 실패!');
      localStorage.removeItem('token'); // 로그인 실패시 token 삭제
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGOUT_FAILURE:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token'); // 로그인 실패시 token 삭제
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        // errorMsg: action.payload,
      };
    case SIGNUP_SUCCESS:
      alert('가입 되었습니다!');
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_FAILURE:
      alert('가입 실패했습니다!');
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.message,
      };

    case PRIVATEKEY_SUCCESS:
    case KEYCREATE_SUCCESS:
      return {
        ...state,
        apiKey: action.payload.connect_key,
        secretKey: action.payload.secret_key,
        errorMsg: '',
      };
    case USERS_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
      };
    default:
      return state;
  }
}
