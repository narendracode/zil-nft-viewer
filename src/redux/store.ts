import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import walletReducer from './features/wallet';

export function makeStore() {
    return configureStore({
        reducer: { wallet: walletReducer }
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from 'redux-thunk';
// import { createWrapper } from "next-redux-wrapper";
// import rootReducer from "./reducers/rootReducer";

// const middleware = [thunk]

// const makeStore = () => createStore(rootReducer, compose(applyMiddleware(...middleware)))

// export const wrapper = createWrapper(makeStore)