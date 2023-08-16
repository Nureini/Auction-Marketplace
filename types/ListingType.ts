import { Timestamp } from 'firebase/firestore' // Importing the Timestamp type

export type Listing = {
    id: string
    title: string
    startingBid: number
    currentBid: number
    highestBid: number
    buyNowPrice: number
    imageUrl: string
    createdAt: string
    endAt: string
    available: boolean
}
