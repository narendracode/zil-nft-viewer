export default function NFTItem({nft}) {
    return (
        <>
          {/* <!-- card --> */}
          <div className="m-5 p-2 w-60 bg-white rounded shadow-2xl flex flex-col space-y-5 justify-between border-1 border-slate-800 hover:scale-105">
            {/* <!-- image --> */}
              <img src={nft.metadata.img_url} alt="boy with camera" className="rounded-t-xl w-full object-cover h-56"  />
            
              <div className="grow flex md:flex-row flex-col justify-between basis-full">
                <div className="basis-1/2 flex flex-col">
                  <div className="md:text-left text-center font-mono text-zinc-700 text-sm">{nft.metadata.title} </div>
                  <div className="md:text-left text-center font-mono text-sm">#{nft.token_id}</div>
                </div>
                <div className="basis-1/2 flex flex-col">
                  <div className="md:text-right text-center font-mono text-sm">Top Bid</div>
                  <div className="md:text-right text-center text-sm">{nft.top_bid_price}</div>
                </div>
              </div>

          </div>
        </>
    );  
}