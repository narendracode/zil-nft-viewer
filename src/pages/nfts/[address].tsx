import { useRouter } from "next/router";

export default function NftWithContractAddress() { 
    const router = useRouter();
    const { address } = router.query;

    return (
        <>
            Address of contract : { address }        
        </>
    );   
}