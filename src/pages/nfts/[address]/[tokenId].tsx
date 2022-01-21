import { useRouter } from "next/router";

export default function NftWithContractAddressAndTokenId() { 
    const router = useRouter();
    const { address, tokenId } = router.query;

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