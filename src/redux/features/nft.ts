import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { AppState } from '../store'
import { NFTResponse } from "../../types/nft";
import { client } from '../../pages/api/client';
import { delay } from "../../utils/wallet";

export interface NFTResponseState {
    response: NFTResponse,
    status: string,
    error: string
}

const initialState: NFTResponseState = {
    response: null,
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
    }
})

export const fetchNFTs = createAsyncThunk('nft/fetchNFTs', async (walletAddress: string) => {
    // fetch
    console.log(`fetch nfts is called in reducer, wallet : ${walletAddress}`)
    await delay(1000)
    const response = await client.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(`response from json server : ${JSON.stringify(response.data)}`)

    //returning dummy data
    // return {
    //     nfts: []
    // }

    return {
        nfts: [
            {
                address: "nft address dummy1",
                owner: "Owner address dummy",
                token_id: '1234',
                token_uri: "https://ipfs.io/cid/dummy-1234",
                top_bid_price: '$ 100',
                metadata: {
                    title: "Mad Series #1",
                    description: "some popular NFT description",
                    img_url: "https://images.unsplash.com/photo-1610720657521-c38abf6dbb7d",
                    traits: [

                    ]
                }
            },
            {
                address: "nft address dummy1",
                owner: "Owner address dummy",
                token_id: '1234',
                token_uri: "https://ipfs.io/cid/dummy-1234",
                top_bid_price: '$ 100',
                metadata: {
                    title: "Mad Series #2",
                    description: "some popular NFT description",
                    img_url: "https://ipfs.io/ipfs/QmZTuKtEopBaLZAVch4pwijhroeAnkFgCGR3jD59qy2jxJ",
                    traits: [

                    ]
                }
            },
            {
                address: "nft address dummy1",
                owner: "Owner address dummy",
                token_id: '1234',
                token_uri: "https://ipfs.io/cid/dummy-1234",
                top_bid_price: '$ 100',
                metadata: {
                    title: "Mad Series #2",
                    description: "some popular NFT description",
                    img_url: "https://ipfs.io/ipfs/QmZTuKtEopBaLZAVch4pwijhroeAnkFgCGR3jD59qy2jxJ",
                    traits: [

                    ]
                }
            },
        ]
    };
})

export const { clearNFTs } = nftSlice.actions;
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