
// action types
export const GET_ITEMS_REQUEST = 'portfolio/GET_ITEMS_REQUEST' as const;
export const GET_ITEMS_SUCCESS = 'portfolio/GET_ITEMS_SUCCESS' as const;
export const GET_ITEMS_FAILURE = 'portfolio/GET_ITEMS_FAILURE' as const;

export const GET_ITEM_REQUEST = 'portfolio/GET_ITEM_REQUEST' as const;
export const GET_ITEM_SUCCESS = 'portfolio/GET_ITEM_SUCCESS' as const;
export const GET_ITEM_FAILURE = 'portfolio/GET_ITEM_FAILURE' as const;

export interface Item {
    id: number,
    timeTag: string;
    coinName: string;
    uuid: string;
    price: number;
    quantity: number;
    isBid: boolean;
}

export type Items = Item[];

//
const getItemsRequest = () => ({ type: GET_ITEMS_REQUEST, payload: null });
const getItemsSuccess = (portfolios: any) => ({type: GET_ITEMS_SUCCESS, payload: portfolios,});
const getItemsFailure = (error: any) => ({type: GET_ITEMS_FAILURE, payload: error,});
export const getItemsActions = {
    request: getItemsRequest,
    success: getItemsSuccess,
    failure: getItemsFailure,
};
export type GetItemsAction =
    | ReturnType<typeof getItemsRequest>
    | ReturnType<typeof getItemsSuccess>
    | ReturnType<typeof getItemsFailure>;

//
const getItemRequest = (itemId: string) => ({type: GET_ITEM_REQUEST, payload: itemId,});
const getItemSuccess = (item: Item) => ({type: GET_ITEM_SUCCESS, payload: item,});
const getItemFailure = (error: any) => ({type: GET_ITEM_FAILURE, payload: error,});
export const getItemActions = {
    request: getItemRequest,
    success: getItemSuccess,
    failure: getItemFailure,
};
export type GetItemAction =
    | ReturnType<typeof getItemRequest>
    | ReturnType<typeof getItemSuccess>
    | ReturnType<typeof getItemFailure>;

type ItemAction = GetItemsAction | GetItemAction;

interface IItemState {
    items: Items;
    item: Item;
    isLoading: boolean;
}

const initialState: IItemState = {
    items: [],
    item: {} as Item,
    isLoading: false,
};

export default function portfolioReducer(
    state: IItemState = initialState,
    action: ItemAction,
): IItemState {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
        case GET_ITEM_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            };
        case GET_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                item: action.payload,
            };
        case GET_ITEMS_FAILURE:
        case GET_ITEM_FAILURE:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            };
        default:
            return state;
    }
}
