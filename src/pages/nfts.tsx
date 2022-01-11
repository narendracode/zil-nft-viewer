import { useEffect, useState } from "react";
import { delay} from '../utils/wallet'
import { useAppDispatch } from "../redux/hooks";
import { setWallet } from '../redux/features/wallet'

export default function Nfts() {
    const dispatch = useAppDispatch();
    const [walletInfo, setWalletInfo] = useState(null);


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
                    setWalletInfo({
                        bech32: bech32,
                        base16: base16
                    })
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


 useEffect( () => {
    console.log(`wallet : ${JSON.stringify(walletInfo)}`)
    if(walletInfo && walletInfo.base16 && walletInfo.bech32){
        console.log(`wallet info found, fetch NFTs from this wallet.`);
    }else{
        console.log(`Wallet not connected yet by this user.`)
        return;
    }
  }, [walletInfo])

 return (
    <div>
        NFTs
    </div>
);   
}