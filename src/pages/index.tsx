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
  
  const renderZilpayConnectView = () => {
    return (
      <div className="flex flex-row">
        <div className="basis-1/4 md:basis-1/3">
          <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded" onClick={connect}>
            {`Connect Your Zilpay Wallet`}
          </button>
        </div>
      </div>
    )
  }

  const renderConnectedWalletView = () => {
    return (
      <div className="mt-3 flex space-x-2">
        <div className="relative">
          <div className="mt-3">
            <span className="font-mono text-xl">
              Wallet connected 
            </span> 
            <span className="font-mono text-xl text-indigo-700"> {walletInfo.base16}</span>
          </div>
          <div className="absolute top-0 left-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div className="absolute top-0 left-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
        </div>

    </div>
    )
  }

  return (
    <>
      <div className="">
        <h1 className="font-mono text-xl code">
          Welcome to <span className="text-purple-700">NFT Viewer</span>
        </h1>
      </div>
      {
      walletInfo.bech32 === '' && walletInfo.base16 === '' && 
        renderZilpayConnectView()
      }
           
      {
        walletInfo.bech32 !== '' && walletInfo.base16 !== '' &&
        renderConnectedWalletView()
      }
    </>
  )
}
