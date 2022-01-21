import { client } from "../pages/api/client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NFTItem({nft}) {
  const [metaData, setMetaData] = useState(null);

  const loadMetadata = async () => {
    const response = await client.axiosGet(nft.tokenUri);
    setMetaData(response.data)
  }

  useEffect( () => {
    loadMetadata()
  }, [])

    return ( metaData && 
        <>
          {/* <!-- card --> */}
          <Link href={"/nfts/"+nft.contractAddress+"/"+nft.tokenId}>
            <div className="m-5 p-2 w-60 bg-white rounded shadow-2xl flex flex-col space-y-5 justify-between border-1 border-slate-800 hover:scale-105">
              {/* <!-- image --> */}
                <img src={metaData.image} alt="boy with camera" className="rounded-t-xl w-full object-cover h-56"  />
              
                <div className="grow flex md:flex-row flex-col justify-between">
                  <div className="basis-1/2 flex flex-col">
                    <div className="md:text-left text-center font-mono text-zinc-700 text-sm">{metaData.name} </div>
                    <div className="md:text-left text-center font-mono text-sm">#{nft.tokenId}</div>
                  </div>
                  <div className="basis-1/2 flex flex-col">
                    <div className="md:text-right text-center font-mono text-sm">Top Bid</div>
                    {/* <div className="md:text-right text-center text-sm">{nft.top_bid_price}</div> */}
                    <div className="md:text-right text-center text-sm">---</div>
                  </div>
                </div>
            </div>
          </Link>
        </>
    );  
}