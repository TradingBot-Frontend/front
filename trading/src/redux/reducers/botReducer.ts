// action types
export const GET_BOTS_REQUEST = 'bot/GET_BOTS_REQUEST' as const;
export const GET_BOTS_SUCCESS = 'bot/GET_BOTS_SUCCESS' as const;
export const GET_BOTS_FAILURE = 'bot/GET_BOTS_FAILURE' as const;

export const GET_BOT_REQUEST = 'bot/GET_BOT_REQUEST' as const;
export const GET_BOT_SUCCESS = 'bot/GET_BOT_SUCCESS' as const;
export const GET_BOT_FAILURE = 'bot/GET_BOT_FAILURE' as const;

export interface Bot {
  bot_name: string;
  coin_name: string;
  coin_ratio: string;
  quantity: number;
  refrence: string;
  type: string;
}

export type Bots = Bot[];

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

export type GetBotsAction =
  | ReturnType<typeof getBotsRequest>
  | ReturnType<typeof getBotsSuccess>
  | ReturnType<typeof getBotsFailure>;

export type GetBotAction =
  | ReturnType<typeof getBotRequest>
  | ReturnType<typeof getBotSuccess>
  | ReturnType<typeof getBotFailure>;

type BotAction = GetBotsAction | GetBotAction;

interface IBotState {
  bots: Bots;
  bot: Bot;
  isLoading: boolean;
}

const initialState: IBotState = {
  bots: [],
  bot: {} as Bot,
  isLoading: false,
};

export default function botReducer(
  state: IBotState = initialState,
  action: BotAction,
): IBotState {
  switch (action.type) {
    case GET_BOTS_REQUEST:
    case GET_BOT_REQUEST:
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
    default:
      return state;
  }
}
