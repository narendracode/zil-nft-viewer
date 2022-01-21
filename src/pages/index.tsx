import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {  getConnectedZilPay, connectWalletZilPay, delay} from '../utils/wallet'
import { useAppDispatch } from "../redux/hooks";
import { client } from "./api/client";
import { setWallet, selectWallet } from '../redux/features/wallet'
import NFTItem from "../components/NFTItem";

export default function Home(props) {
  const walletInfo = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();
  const [nfts,setNfts] = useState([])

  const loadAllNfts = async () => {
    const response = await client.graphql('http://localhost:5000/graphql', `{
        getAllNfts{
          tokenId,
          tokenUri,
          owner,
          contractAddress
        }
      }`)
    console.log(`response from json server : ${JSON.stringify(response.data.data.getAllNfts)}`)
    setNfts(response.data.data.getAllNfts)
  }

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
    loadAllNfts();
  }, [])
  
  const renderZilpayConnectView = () => {
    return (
        <div className="mt-4 basis-1/4 md:basis-1/3">
            <button
            className='text-rose-50 text-2xl font-bold py-3 px-12 bg-teal-700 shadow-lg shadow-[#6FFFE9] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
            onClick={connect}
            >
              Connect Wallet
            </button>
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
  const loadNFTs = () => {
    let content;
        if(nfts.length){
            content =  nfts.map( (nft) => {
                 return <NFTItem key={nft.tokenId+nft.contractAddress} nft={nft} />
            })
        }else {
          content = <div>Loading... NFTs</div>;
        }
    return content;
}
  return (
    <>
      <div className='flex flex-col items-center pt-32 min-h-screen'>
        <div className='text-rose-600 trasition hover:rotate-180 hover:scale-105 transition duration-500 ease-in-out'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='60'
            height='60'
            fill='currentColor'
            viewBox='0 0 16 16'
          >
            <path d='M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z' />
          </svg>
        </div>
        <h1 className="font-mono text-xl code">
          Welcome to <span className="text-purple-700">NFT Viewer</span>
        </h1>
        {
      walletInfo.bech32 === '' && walletInfo.base16 === '' && 
        renderZilpayConnectView()
      }
           
      {
        walletInfo.bech32 !== '' && walletInfo.base16 !== '' &&
        renderConnectedWalletView()
      }
      
        <div className="flex md:flex-row flex-col sm:flex-col flex-wrap">
        {loadNFTs()}
        </div>
      
      </div>
    </>
  )
}
