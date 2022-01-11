import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import App from "next/app";

import type { AppState, AppThunk } from '../store'

export interface WalletState {
    bech32: string,
    base16: string,
    privateKey?: string
}

const initialState: WalletState = {
    bech32: '',
    base16: '',
    privateKey: ''
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWallet: (state, action: PayloadAction<any>) => {
            localStorage.setItem("wallet", JSON.stringify(action.payload))
            state.bech32 = action.payload.bech32;
            state.base16 = action.payload.base16;
            state.privateKey = action.payload.privateKey;
        },
        removeWallet: (state) => {
            localStorage.removeItem('wallet');
            state.bech32 = '';
            state.base16 = '';
            state.privateKey = '';
        }
    }
})

export const { setWallet, removeWallet } = walletSlice.actions;
export const selectWallet = (state: AppState) => {
    return {
        bech32: state.wallet.bech32,
        base16: state.wallet.base16,
        privateKey: state.wallet.privateKey
    }
}
export default walletSlice.reducer;