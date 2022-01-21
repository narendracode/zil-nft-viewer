import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { client } from "../../api/client";

export default function NftWithContractAddressAndTokenId() { 
    const router = useRouter();
    const { address, tokenId } = router.query;
    const [nft,setNft] = useState(null)

    const loadNft = async () => {
        console.log(`calling load NFT with address : ${address}, tokenId : ${tokenId}`)
        const response = await client.graphql('http://localhost:5000/graphql', `{
            getAllNfts(address: "${address}", tokenId: "${tokenId}"){
              tokenId,
              tokenUri,
              owner,
              contractAddress
            }
          }`)
        
        console.log(`load nft with contactAddress and tokenId : ${JSON.stringify(response.data.data.getAllNfts)}`)
        if(response.data.data.getAllNfts && response.data.data.getAllNfts.length){
            setNft(response.data.data.getAllNfts)
        }
    }

    useEffect(() => {
        loadNft()
    }, [address,tokenId] )

    return (
        <>
            <div>
                Address of contract : { address }        
            </div>

            <div>
                TokenId : { tokenId }        
            </div>
        </>
    );   
}