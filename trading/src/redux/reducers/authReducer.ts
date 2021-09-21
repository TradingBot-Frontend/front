import { setAuthToken } from '@utils/axios';

// action types
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;

export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE' as const;

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
const loginSuccess = (loginRes: any) => ({ type: LOGIN_SUCCESS, payload: loginRes });
const loginFailure = (error: any) => ({ type: LOGIN_FAILURE, payload: error });
export const loginActions = {
  request: loginRequest,
  success: loginSuccess,
  failure: loginFailure,
};

const signupRequest = (user: any) => ({ type: SIGNUP_REQUEST, payload: user });
const signupSuccess = (res: any) => ({ type: SIGNUP_SUCCESS, payload: res });
const signupFailure = (error: any) => ({ type: SIGNUP_FAILURE, payload: error });
export const signupActions = {
  request: signupRequest,
  success: signupSuccess,
  failure: signupFailure,
};

export type LoginAction =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>;
export type SignupAction =
  | ReturnType<typeof signupRequest>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFailure>;
export type AuthAction = LoginAction | SignupAction;

interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // eamil: string;
  // userName: string;
  // successMsg: string;
  errorMsg: string;
}

const initialState: IAuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  // eamil: '',
  // userName: '',
  // successMsg: '',
  errorMsg: '',
};

export default function authReducer(state: IAuthState = initialState, action: AuthAction): IAuthState {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case LOGIN_SUCCESS: {
      const token = action.payload.data?.msg;
      console.log('token', token);
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
      localStorage.removeItem('token'); // 로그인 실패시 token 삭제
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        errorMsg: action.payload.detail.msg,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.msg,
      };
    default:
      return state;
  }
}
