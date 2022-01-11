import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { setWallet, selectWallet } from '../redux/features/wallet'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type WalletAccountInfo = {
  bech32: string;
  base16: string;
  privateKey?: string;
};

type ConnectedWallet = {
  network: string;
  timestamp: Dayjs;
  addressInfo: WalletAccountInfo;
};

type ConnectWalletResult = {
  wallet?: ConnectedWallet;
  error?: any;
};

class ZilPayConnectedWallet {
  network: string;
  timestamp: Dayjs;
  addressInfo: WalletAccountInfo;

  constructor(network: string, timestamp: Dayjs, zilpay: any, bech32: string, base16:string,) {
    this.network = network;
    this.timestamp = timestamp;
    this.addressInfo = {
      bech32: bech32,
      base16: base16,
    };
  }
}
export default function Home(props) {
  const dispatch = useAppDispatch();
  const walletInfo = useAppSelector(selectWallet);

  const delay = (ms: number) =>  new Promise(resolve => setTimeout(resolve, ms));

  const getConnectedZilPay = async () => {
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

  const connectWalletZilPay = async (zilPay: any): Promise<ConnectWalletResult> => {
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

  const connect = async () => {
    try{
      const zilPay = await getConnectedZilPay();
      if(zilPay) {
        const walletResult = await connectWalletZilPay(zilPay);
        if (walletResult?.wallet) {
          const { wallet } = walletResult;
          const { network } = wallet;
          const { bech32, base16 } = wallet.addressInfo;
          console.log(`wallet : ${JSON.stringify(wallet)}`);
          console.log(`network : ${JSON.stringify(network)}`);
          dispatch(setWallet({
            bech32: bech32,
            base16: base16
          }))
        }else{
          console.log(`user rejected to connect his wallet.`)
        }
      }else{
        console.log(`could not connect to zilpay`)
      }
    }catch(error){
      console.log(`error while connecting to wallet.`)
    }
  }

  const checkIfWalletIsConnected  = async () => {
    try{

      let zilPay = (window as any).zilPay;
      if (!zilPay) {
        await delay(1500) // wallet injection may sometimes be slow
        zilPay = (window as any).zilPay;
      }
      try {
        if (typeof zilPay !== "undefined" && zilPay.wallet.isConnect) {
          const result = zilPay.wallet.defaultAccount;
          const { bech32, base16 } = zilPay.wallet.defaultAccount;
          dispatch(setWallet({
            bech32: bech32,
            base16: base16
          }))
        }
      } catch (e) {
        console.error(e);
      }
    }catch(error){
      console.log(`error while checking zilpay wallet.`)
    }
  }

  useEffect( () => {
    checkIfWalletIsConnected()
  }, [])
  
  return (
    <>
      <div className="">
        <h1 className="font-mono text-xl code">
          Welcome to <span className="text-purple-700">NFT Viewer</span>, <span className="text-indigo-700">TailwindCSS</span> and <span className="text-gray-700">TypeScript</span>
        </h1>
      </div>
      {
      walletInfo.bech32 === '' && walletInfo.base16 === '' && 
      <div className="flex flex-row">
        <div className="basis-1/4 md:basis-1/3">
          <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded" onClick={connect}>
            {`Connect Your Zilpay Wallet`}
          </button>
        </div>
      </div>
      }
           
      {
        walletInfo.bech32 !== '' && walletInfo.base16 !== '' &&
        <div className="">
          <div className="">
            <h1 className="font-mono text-xl code">
              Wallet info { JSON.stringify(walletInfo) }
            </h1>
          </div>
        </div>
      }
    </>
  )
}
