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

    const renderNFTCollectiblesMessage = () => {
        if(userNFTs.nfts && 
            userNFTs.nfts.nfts && 
            userNFTs.nfts.nfts.length && 
            userNFTs.nfts.nfts.length > 0) {
                return               <div>
                <h1 className="my-4 text-5xl font-bold leading-tight">
                    Your NFT collectibles are here...
                </h1>
            </div>
            }else {
                return "";
            }
    }
    const loadNFTs = () => {
        let content;
        console.log(`load NFTs is called. status : ${nftLoadStatus.status}`)
        if(nftLoadStatus.status === 'idle') {
            content = <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="leading-normal text-2xl mb-8">
                Please connect your wallet to view your NFTs.
              </p>
            </div>
          </div>
        }
        else if(nftLoadStatus.status === 'loading') {
            content = <SkeletonLoader/>
        }else if (nftLoadStatus.status == 'succeeded'){
            if(!userNFTs.nfts.nfts.length || userNFTs.nfts.nfts.length === 0 ){
                content = <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                  <h1 className="my-4 text-5xl font-bold leading-tight">
                    We could not find any NFTs owned by you.
                  </h1>
                  <p className="leading-normal text-2xl mb-8">
                    Why don't you buy a NFT from Marketplace?
                  </p>
                  <p className="leading-normal text-2xl mb-8">
                    Or you can mint your own NFT.
                  </p>
                </div>
              </div>
            }else{
                return userNFTs.nfts.nfts.map( (nft) => {
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
        <>
        {
            renderNFTCollectiblesMessage()
        }
        <div className="flex md:flex-row flex-col sm:flex-col flex-wrap">
        {
            loadNFTs()
        }
        </div>
        </>
    );   
}