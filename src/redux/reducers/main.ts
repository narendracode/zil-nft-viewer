import * as t from '../types';

const main = (state = {
    walletInfo: {
    },
    loading: false,
    error: null,
}, action) => {
    switch (action.type) {
        case t.SET_WALLET:
            return {
                ...state,
                walletInfo: action.payload
            };
        case t.GET_WALLET:
            return {
                ...state,
                walletInfo: action.payload
            };
        case t.REMOVE_WALLET:
            return {
                ...state,
                walletInfo: {},
                loading: false,
                error: null
            };
        default:
            return {
                ...state
            }
    }
};

export default main;