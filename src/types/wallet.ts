import { Dayjs } from "dayjs";
export type WalletAccountInfo = {
    bech32: string;
    base16: string;
    privateKey?: string;
};

export type ConnectedWallet = {
    network: string;
    timestamp: Dayjs;
    addressInfo: WalletAccountInfo;
};

export type ConnectWalletResult = {
    wallet?: ConnectedWallet;
    error?: any;
};

export class ZilPayConnectedWallet {
    network: string;
    timestamp: Dayjs;
    addressInfo: WalletAccountInfo;

    constructor(network: string, timestamp: Dayjs, zilpay: any, bech32: string, base16: string,) {
        this.network = network;
        this.timestamp = timestamp;
        this.addressInfo = {
            bech32: bech32,
            base16: base16,
        };
    }
}