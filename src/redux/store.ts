import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import walletReducer from './features/wallet';
import nftReducer from './features/nft';

export function makeStore() {
    return configureStore({
        reducer: {
            wallet: walletReducer,
            nft: nftReducer
        }
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store