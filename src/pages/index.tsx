import { useEffect } from "react";
import { selectWallet } from '../redux/features/wallet'
import { useAppSelector } from "../redux/hooks";
import {  getConnectedZilPay, connectWalletZilPay, delay} from '../utils/wallet'
import { useAppDispatch } from "../redux/hooks";

import { setWallet } from '../redux/features/wallet'

export default function Home(props) {
  const walletInfo = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();

  const connect = async () => {
    try {
        const zilPay = await getConnectedZilPay();
        if (zilPay) {
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
            } else {
                console.log(`user rejected to connect his wallet.`)
            }
        } else {
            console.log(`could not connect to zilpay`)
        }
    } catch (error) {
        console.log(`error while connecting to wallet.`)
    }
}

const checkIfWalletIsConnected = async () => {
  try {

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
  } catch (error) {
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
          Welcome to <span className="text-purple-700">NFT Viewer</span>
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
          <div className="mt-3 flex space-x-2">
            <span> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg> 
            </span>
            <span className="font-mono text-xl">
              Wallet connected 
            </span> 
            <span className="font-mono text-xl text-indigo-700"> {walletInfo.base16}</span>
          </div>
      }
    </>
  )
}
