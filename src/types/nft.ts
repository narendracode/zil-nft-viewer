export type NFTResponse = {
    nfts: NFT[]
};

export type SingleNFTResponse = {
    nft: NFT
};

export type NFT = {
    contractAddress: string;
    owner: string;
    tokenId: string;
    tokenUri: string;
    metadata?: object;
}

export type Token = {
    address: string;
    tokenId: string;
}