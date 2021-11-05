import { useNFTViewMethod, useNFTViewMethodType } from './NFT/useNFTViewMethod'
import { useNFT, useNFTType } from './NFT/useNFT'
import {
    useNFTContentType,
    useNFTContentTypeType,
} from './NFT/useNFTContentType'
import { useNFTReference, useNFTReferenceType } from './NFT/useNFTReference'
import {
    useNFTContractMetadata,
    useNFTContractMetadataType,
} from './NFT/useNFTContractMetadata'

import { useNFTContract } from './NFT/useNFTContract'
import { useNFTMethod } from './NFT/useNFTMethod'

import useMarketContract, { useMarketMethod } from './useMarketContract'
import useFTContract, { useFTMethod } from './useFTContract'
import { NearHooksProvider, useNearHooksContainer } from './near'

export {
    // NFT hooks
    useNFTViewMethod,
    useNFT,
    useNFTContentType,
    useNFTReference,
    useNFTContract,
    useNFTContractMetadata,
    useNFTMethod,
    // NFT hooks types,
    useNFTViewMethodType,
    useNFTType,
    useNFTContentTypeType,
    useNFTReferenceType,
    useNFTContractMetadataType,
    // Market hooks
    useMarketContract,
    useMarketMethod,
    // FT hooks
    useFTContract,
    useFTMethod,
    // NEAR hooks
    NearHooksProvider,
    useNearHooksContainer,
}
