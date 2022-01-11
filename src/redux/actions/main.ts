import * as t from '../types';

export const setWallet = (wallet) => dispatch => {
    localStorage.setItem("wallet", JSON.stringify(wallet))
    dispatch(
        {
            type: t.SET_WALLET,
            payload: wallet
        }
    )
}

export const getWallet = () => dispatch => {
    const walletInfo = localStorage.getItem("wallet")
    dispatch(
        {
            type: t.GET_WALLET,
            payload: walletInfo
        }
    )
}


export const removeWallet = () => dispatch => {
    localStorage.removeItem('wallet');
    dispatch({
        type: t.REMOVE_WALLET
    })
}