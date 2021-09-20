// action types
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;

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
const request = (user: any) => ({ type: LOGIN_REQUEST, payload: user });
const success = (user: any) => ({ type: LOGIN_SUCCESS, payload: user });
const failure = (error: any) => ({ type: LOGIN_FAILURE, payload: error });
export const loginActions = {
  request,
  success,
  failure,
};

export type LoginAction = ReturnType<typeof request> | ReturnType<typeof success> | ReturnType<typeof failure>;

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

export default function authReducer(state: IAuthState = initialState, action: LoginAction): IAuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.payload.msg,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        errorMsg: action.payload.detail.msg,
        token: null,
      };
    default:
      return state;
  }
}
