import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../api/client";
import NFTItem from "../../components/NFTItem";

export default function NftWithContractAddress() { 
    const router = useRouter();
    const { address } = router.query;
    const [nfts,setNfts] = useState([])

    const loadAllNfts = async () => {
        const response = await client.graphql('http://localhost:5000/graphql', `{
            getAllNfts(address: "${address}"){
              tokenId,
              tokenUri,
              owner,
              contractAddress
            }
          }`)
        console.log(`response from json server : ${JSON.stringify(response.data.data.getAllNfts)}`)
        setNfts(response.data.data.getAllNfts)
    }

    useEffect( () => {
        loadAllNfts();
    }, [address])

    const loadNFTsView = () => {
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
                <div className="flex md:flex-row flex-col sm:flex-col flex-wrap">
                    {loadNFTsView()}
                </div>
            </div>       
        </>
    );   
}