import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../../api/client";

export default function NftWithContractAddressAndTokenId() { 
    const router = useRouter();
    const { address, tokenId } = router.query;
    const [nft,setNft] = useState(null)
    const [metaData, setMetaData] = useState(null);

    const loadNft = async (currentAddress, currentTokenId) => {
        console.log(`calling load NFT with address : ${currentAddress}, tokenId : ${currentTokenId}`)
        const response = await client.graphql('http://localhost:5000/graphql', `{
            getAllNfts(address: "${currentAddress}", tokenId: "${currentTokenId}"){
              tokenId,
              tokenUri,
              owner,
              contractAddress
            }
          }`)
        
        console.log(`load nft with contactAddress and tokenId : ${JSON.stringify(response.data.data.getAllNfts)}`)
        if(response.data.data.getAllNfts && response.data.data.getAllNfts.length){
            setNft(response.data.data.getAllNfts[0])
        }
    }

    useEffect(() => {
        loadNft(address,tokenId)
    }, [address,tokenId] )

    const loadMetadata = async (nftItem) => {
        if(nftItem){
            const response = await client.axiosGet(nftItem.tokenUri);
            setMetaData(response.data)
        }
    }

    useEffect( () => {
        loadMetadata(nft);
    },[address,tokenId,nft])

    return (metaData &&
        <>
            <div className='flex flex-row'>
                {/* <!-- left colum --> */}
                <div className="grow">
                    <div className="m-5 p-2 w-96 h-96 bg-white rounded shadow-2xl flex flex-col space-y-5 justify-between border-1 border-slate-800">
                        {/* <!-- image --> */}
                        <img src={metaData.image} alt="boy with camera" className="rounded-t-xl w-full object-cover h-96"  />
                    </div>
                    <div  className="m-5 p-2 w-96 bg-white rounded shadow-2xl flex flex-col space-y-5 justify-between border-1 border-slate-800">
                        {metaData.description}
                    </div>
                </div>

                {/* <!-- Right colum --> */}
                <div className="grow">
                    <span className="text-5xl font-bold">{metaData.name} </span>
                </div>
            </div>

            { metaData && 
               // 
               <div> { JSON.stringify(metaData) }</div>
            }
            {/* <div>
                Address of contract : { address }        
            </div>

            <div>
                TokenId : { tokenId }        
            </div> */}
        </>
    );   
}