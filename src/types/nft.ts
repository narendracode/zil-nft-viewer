export type NFTResponse = {
    nfts: NFT[]
};

export type NFT = {
    address: string;
    owner: string;
    token_id: string;
    token_uri: string;
    metadata: object;
}
