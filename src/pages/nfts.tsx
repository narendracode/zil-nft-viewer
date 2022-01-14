import { useEffect, useState } from "react";
import { delay} from '../utils/wallet'
import { useAppDispatch } from "../redux/hooks";
import { setWallet } from '../redux/features/wallet';
import { useAppSelector } from "../redux/hooks";
import { clearNFTs, selectNFTs, nftStatus, nftError, fetchNFTs  } from "../redux/features/nft";
import SkeletonLoader from "../components/SkeletonLoader";
import NFTItem from "../components/NFTItem";
export default function Nfts() {
    const userNFTs = useAppSelector(selectNFTs);
    const dispatch = useAppDispatch();
    const [walletInfo, setWalletInfo] = useState(null);

    const nftLoadStatus = useAppSelector(nftStatus);
    const nftLoadError = useAppSelector(nftError);

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

    const loadNFTs = () => {
        let content;
        console.log(`load NFTs is called. status : ${nftLoadStatus.status}`)
        if(nftLoadStatus.status === 'idle') {
            content = <div>Do you have your wallet connected?</div>
        }
        else if(nftLoadStatus.status === 'loading') {
            content = <SkeletonLoader/>
        }else if (nftLoadStatus.status == 'succeeded'){
            console.log('cp1')
            if(!userNFTs.nfts.nfts.length || userNFTs.nfts.nfts.length ===0 ){
                console.log('cp2')
                content = <div>Oops looks like you don't own any NFTs.</div>
            }else{
                console.log(`cp3 nfts : ${JSON.stringify(userNFTs.nfts.nfts)} `)
                content = userNFTs.nfts.nfts.map( (nft) => {
                    return <NFTItem key={nft.address} nft={nft} />
                })
            }
        }else if (nftLoadStatus.status === 'failed') {
            content = <div>{nftLoadError.error}</div>
        }
        return content;
    }

    useEffect( () => {
        console.log(`wallet : ${JSON.stringify(walletInfo)}`)
        if(walletInfo && walletInfo.base16 && walletInfo.bech32){
            console.log(`wallet info found, fetch NFTs from this wallet.`);
            dispatch(fetchNFTs(walletInfo.bech32))
        }else{
            console.log(`Wallet not connected yet by this user.`)
            return;
        }
    }, [walletInfo])

    return (
        <div>
        {
            loadNFTs()
        }
        </div>
    );   
}