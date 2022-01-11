import dayjs from "dayjs";
import { ConnectWalletResult, ZilPayConnectedWallet } from '../types/wallet';
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getConnectedZilPay = async () => {
    let zilPay = (window as any).zilPay;
    if (!zilPay) {
        await delay(1500) // wallet injection may sometimes be slow
        zilPay = (window as any).zilPay;
    }
    try {
        if (typeof zilPay !== "undefined") {
            const result = await zilPay.wallet.connect();
            if (result === zilPay.wallet.isConnect) {
                return zilPay;
            }
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

export const connectWalletZilPay = async (zilPay: any): Promise<ConnectWalletResult> => {
    if (!zilPay.wallet.isConnect)
        throw new Error("ZilPay connection failed.");

    const account: any = zilPay.wallet.defaultAccount;
    if (!account)
        throw new Error("Please sign in to your ZilPay account before connecting.");
    const timestamp = dayjs();

    const network = zilPay.wallet.net;
    if (!network)
        throw new Error(`Network not found.`);

    const wallet = new ZilPayConnectedWallet(
        network,
        timestamp,
        zilPay,
        account!.bech32,
        account!.base16,
    );

    return { wallet };
};
