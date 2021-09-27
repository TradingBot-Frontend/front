// action types
export const GET_BOTS_REQUEST = 'bot/GET_BOTS_REQUEST' as const;
export const GET_BOTS_SUCCESS = 'bot/GET_BOTS_SUCCESS' as const;
export const GET_BOTS_FAILURE = 'bot/GET_BOTS_FAILURE' as const;

export const GET_BOT_REQUEST = 'bot/GET_BOT_REQUEST' as const;
export const GET_BOT_SUCCESS = 'bot/GET_BOT_SUCCESS' as const;
export const GET_BOT_FAILURE = 'bot/GET_BOT_FAILURE' as const;

export const ADD_BOT_REQUEST = 'bot/ADD_BOT_REQUEST' as const;
export const ADD_BOT_SUCCESS = 'bot/ADD_BOT_SUCCESS' as const;
export const ADD_BOT_FAILURE = 'bot/ADD_BOT_FAILURE' as const;

export interface Bot {
  bot_name: string;
  coin_name: string;
  coin_ratio: string;
  quantity: number;
  refrence: string;
  type: string;
}

export type Bots = Bot[];

export interface BotInfo {
  id: string;
  uuid: string;
  bot_name: string;
  coin_name: string;
  bid_reference: string;
  bid_condition: number;
  bid_quantity: number;
  is_bid_condition_exceed: boolean;
  ask_reference: string;
  ask_condition: number;
  ask_quantity: number;
  is_active: boolean;
  description: string;
}

const getBotsRequest = () => ({ type: GET_BOTS_REQUEST, payload: null });
const getBotsSuccess = (bots: Bots) => ({
  type: GET_BOTS_SUCCESS,
  payload: bots,
});
const getBotsFailure = (error: any) => ({
  type: GET_BOTS_FAILURE,
  payload: error,
});
export const getBotsActions = {
  request: getBotsRequest,
  success: getBotsSuccess,
  failure: getBotsFailure,
};

const getBotRequest = (botId: string) => ({
  type: GET_BOT_REQUEST,
  payload: botId,
});
const getBotSuccess = (bot: Bot) => ({
  type: GET_BOT_SUCCESS,
  payload: bot,
});
const getBotFailure = (error: any) => ({
  type: GET_BOT_FAILURE,
  payload: error,
});
export const getBotActions = {
  request: getBotRequest,
  success: getBotSuccess,
  failure: getBotFailure,
};

const addBotRequest = (botInfo: BotInfo) => ({
  type: ADD_BOT_REQUEST,
  payload: botInfo,
});
const addBotSuccess = (msg: any) => ({
  type: ADD_BOT_SUCCESS,
  payload: msg,
});
const addBotFailure = (error: any) => ({
  type: ADD_BOT_FAILURE,
  payload: error,
});
export const addBotActions = {
  request: addBotRequest,
  success: addBotSuccess,
  failure: addBotFailure,
};

// TODO: delete bot
// TODO: get botdetail
// TODO: update bot

export type GetBotsAction =
  | ReturnType<typeof getBotsRequest>
  | ReturnType<typeof getBotsSuccess>
  | ReturnType<typeof getBotsFailure>;

export type GetBotAction =
  | ReturnType<typeof getBotRequest>
  | ReturnType<typeof getBotSuccess>
  | ReturnType<typeof getBotFailure>;

export type AddBotAction =
  | ReturnType<typeof addBotRequest>
  | ReturnType<typeof addBotSuccess>
  | ReturnType<typeof addBotFailure>;

type BotAction = GetBotsAction | GetBotAction | AddBotAction;

interface IBotState {
  bots: Bots;
  bot: Bot;
  botInfo: BotInfo;
  isLoading: boolean;
}

const initialState: IBotState = {
  bots: [],
  bot: {} as Bot,
  botInfo: {} as BotInfo,
  isLoading: false,
};

export default function botReducer(
  state: IBotState = initialState,
  action: BotAction,
): IBotState {
  switch (action.type) {
    case GET_BOTS_REQUEST:
    case GET_BOT_REQUEST:
    case ADD_BOT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_BOTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bots: action.payload,
      };
    case GET_BOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bot: action.payload,
      };
    case GET_BOTS_FAILURE:
    case GET_BOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        bots: action.payload,
      };
    case ADD_BOT_SUCCESS:
      getBotsActions.request(); // 추가 성공하면 새로 bot 리스트를 업데이트
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
