import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { AppState } from '../store'
import { NFTResponse, SingleNFTResponse, Token } from "../../types/nft";
import { client } from '../../pages/api/client';
import { delay } from "../../utils/wallet";

export interface NFTResponseState {
    response: NFTResponse,
    singleNFTResponse: SingleNFTResponse
    status: string,
    error: string
}

const initialState: NFTResponseState = {
    response: null,
    singleNFTResponse: null,
    status: 'idle',
    error: null,
}

export const nftSlice = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        clearNFTs: (state) => {
            state.response = null;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchNFTs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchNFTs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.response = action.payload;
            })
            .addCase(fetchNFTs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'some fake error encountered.'
            })
            .addCase(fetchNFT.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchNFT.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleNFTResponse = action.payload;
            })
            .addCase(fetchNFT.rejected, (state, action) => {
                state.status = 'failed'
                state.error = 'some fake error encountered while fetching single NFT.'
            })
    }
})

export const fetchNFT = createAsyncThunk('nft/fetchNFT', async (token: Token) => {
    console.log(`fetch nft is called in reducer, contract adress : ${token.address} , tokenId : ${token.tokenId}`)

    await delay(1000)
    const response = await client.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(`response from json server : ${JSON.stringify(response.data)}`)
    return {
        nft: {
            contractAddress: "nft address dummy1",
            owner: "Owner address dummy",
            tokenId: '1234',
            tokenUri: "https://ipfs.io/cid/dummy-1234",
            metadata: {
                title: "Mad Series #1",
                description: "some popular NFT description",
                img_url: "https://images.unsplash.com/photo-1610720657521-c38abf6dbb7d",
                traits: [

                ]
            }
        }
    };
})

export const fetchNFTs = createAsyncThunk('nft/fetchNFTs', async (walletAddress: string) => {
    // fetch
    console.log(`fetch nfts is called in reducer, wallet : ${walletAddress}`)
    await delay(1000)
    const response = await client.graphql('http://localhost:5000/graphql', `{
        getAllNfts(owner: "${walletAddress.toLowerCase()}"){
          tokenId,
          tokenUri,
          owner,
          contractAddress
        }
      }`)
    console.log(`response from json server : ${JSON.stringify(response.data.data.getAllNfts)}`)

    return { nfts: response.data.data.getAllNfts };
})

export const { clearNFTs } = nftSlice.actions;

export const fetchUserNFTs = async (state: AppState) => {
    const walletAddress = state.wallet.base16.toLowerCase();
    console.log(`fetch user nfts is called in reducer, wallet : ${walletAddress}`)
    await delay(1000)

    const response = await client.graphql('http://localhost:5000/graphql', `{
        getAllNfts(owner: ${walletAddress}){
          tokenId,
          tokenUri,
          owner,
          contractAddress
        }
      }`)
    console.log(`response from json server for user NFTs : ${JSON.stringify(response.data.data.getAllNfts)}`)

    return { nfts: response.data.data.getAllNfts };
}
export const selectNFTs = (state: AppState) => {
    return {
        nfts: state.nft.response
    }
}
export const nftStatus = (state: AppState) => {
    return {
        status: state.nft.status
    }
}

export const nftError = (state: AppState) => {
    return {
        error: state.nft.error
    }
}

export default nftSlice.reducer;