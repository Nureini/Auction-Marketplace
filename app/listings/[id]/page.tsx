'use client'

import { useEffect, useState } from 'react'
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    runTransaction,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore'
import { useRouter, useParams } from 'next/navigation'
import { db } from '../../../config/firebaseConfig'
import { Listing } from '@/types/ListingType'
import { useAuthContext } from '@/context/AuthContext'

const ViewListing = () => {
    const { user } = useAuthContext()
    const router = useRouter()
    const { id } = useParams()

    const [listing, setListing] = useState<Listing | null>(null)
    const [currentHighestBid, setCurrentHighestBid] = useState<number | null>(
        null
    )
    const [bidAmount, setBidAmount] = useState<number>(0)

    useEffect(() => {
        if (!id) return

        const fetchListing = async () => {
            const docRef = doc(db, 'listings', id as string)
            const docSnapshot = await getDoc(docRef)

            if (docSnapshot.exists()) {
                setListing({
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                } as Listing)
            }
        }

        fetchListing()

        // Set up real-time listener for the highest bid
        const bidsCollectionRef = collection(
            doc(db, 'listings', id as string),
            'bids'
        )
        const highestBidQuery = query(
            bidsCollectionRef,
            orderBy('amount', 'desc'),
            limit(1)
        )

        const unsubscribe = onSnapshot(highestBidQuery, (snapshot) => {
            const highestBidData = snapshot.docs[0]?.data()

            if (highestBidData) {
                setCurrentHighestBid(highestBidData.amount)
            }
        })

        // Clean up the real-time listener when component is unmounted
        return () => unsubscribe()
    }, [id])

    const buyNow = async () => {
        const listingRef = doc(db, 'listings', id as string)

        const listingSnapshot = await getDoc(listingRef)
        const listingData = listingSnapshot.data()

        // Ensure the listing is available
        if (!listingData?.available) {
            throw new Error('Listing is not available.')
        }

        // Update the status and buyNowUserId
        await updateDoc(listingRef, {
            available: false,
            soldToUserId: (user as any)?.uid,
        })
    }

    const getHighestBid = async () => {
        const listingRef = doc(db, 'listings', id as string)
        const bidsCollectionRef = collection(listingRef, 'bids')

        const highestBidQuery = query(
            bidsCollectionRef,
            orderBy('amount', 'desc'),
            limit(1)
        )
        const highestBidSnapshot = await getDocs(highestBidQuery)

        if (!highestBidSnapshot.empty) {
            return highestBidSnapshot.docs[0].data()
        } else {
            return null
        }
    }

    const handleBid = async () => {
        if (currentHighestBid && bidAmount <= currentHighestBid) {
            alert('Your bid must be higher than the current highest bid.')
            return
        }

        if (bidAmount < (listing as any)?.startingBid) {
            alert(
                'Your bid must be greater than $' +
                    (listing as any)?.startingBid
            )
            return
        }

        const listingDocRef = doc(db, 'listings', id as string)
        const bidsCollectionRef = collection(listingDocRef, 'bids')

        // Start a transaction to ensure data integrity
        return runTransaction(db, async (transaction) => {
            const listingDoc = await transaction.get(listingDocRef)

            if (!listingDoc.exists()) {
                throw Error('Listing does not exist!')
            }

            // Add the bid to the bids sub-collection
            const newBid = {
                userId: (user as any)?.uid, // Assuming you have access to the user object
                amount: bidAmount,
                timestamp: serverTimestamp(),
            }
            transaction.set(doc(bidsCollectionRef), newBid)

            // Update the highest bid on the listing
            transaction.update(listingDocRef, {
                highestBid: bidAmount,
                currentBid: bidAmount, // Here we're updating the currentBid value in the database
            })
        })
            .then(() => {
                alert('Bid placed successfully!')
            })
            .catch((error: Error) => {
                console.error('Error placing bid: ', error)
                alert(
                    'There was an error placing your bid. Please Sign In And try again.'
                )
            })
    }

    if (!listing)
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        )

    return (
        <div className="m-4 p-4 bg-white shadow-lg rounded-lg max-w-xl mx-auto md:max-w-2xl">
            <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-full h-[200px] md:h-[300px] object-cover rounded-t-lg"
            />

            <div className="p-4">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                    {listing.title}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <span className="text-lg font-medium">
                        Starting: ${listing.startingBid}
                    </span>
                    <span className="text-lg font-medium">
                        Current Bid: $
                        {currentHighestBid ? currentHighestBid : 0}
                    </span>

                    {listing.buyNowPrice && (
                        <span className="text-lg font-medium col-span-2">
                            Buy Now: ${listing.buyNowPrice}
                        </span>
                    )}

                    <span className="text-sm text-gray-500 col-span-2 truncate">
                        Start: {listing?.createdAt}
                    </span>
                    <span className="text-sm text-gray-500 col-span-2 truncate">
                        End:{listing?.endAt}
                    </span>
                </div>

                {listing?.available ||
                new Date(listing?.endAt).getTime() <= new Date().getTime() ? (
                    <div className="space-y-2 md:space-y-4">
                        <div className="flex flex-col items-center space-y-2">
                            <input
                                type="number"
                                placeholder="Enter bid"
                                className="p-2 border rounded w-full"
                                value={bidAmount}
                                onChange={(e) =>
                                    setBidAmount(Number(e.target.value))
                                }
                            />
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded w-full  mt-2 md:mt-0"
                                onClick={handleBid}
                            >
                                Place Bid
                            </button>
                        </div>
                        <button
                            className="bg-green-600 text-white px-4 py-2 w-full rounded mt-2"
                            onClick={buyNow}
                        >
                            Buy Now for ${listing.buyNowPrice}
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-center text-red-500 font-bold">
                        This listing is finished!
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewListing
