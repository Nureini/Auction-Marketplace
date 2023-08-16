'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import Link from 'next/link'
import { Listing } from '../../types/ListingType'

const ViewListings: React.FC = () => {
    const [listings, setListings] = useState<Listing[]>([])

    useEffect(() => {
        const fetchListings = async () => {
            const querySnapshot = await getDocs(collection(db, 'listings'))
            setListings(
                querySnapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() } as Listing)
                )
            )
        }
        fetchListings()
    }, [])

    return (
        <div
            className="flex items-center justify-center h-screen dark:text-white"
            style={{
                height: 'calc(100vh - 68px - 81px)',
            }}
        >
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 dark:text-white">
                {listings.map((listing) => (
                    <Link
                        className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
                        key={listing.id}
                        href={`/listings/${listing.id}`}
                    >
                        <div className="w-full h-[300px] overflow-hidden relative">
                            <img
                                src={listing.imageUrl}
                                alt={listing.title}
                                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
                                <h2 className="text-xl font-bold text-white">
                                    {listing.title}
                                </h2>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-100 dark:bg-gray-900">
                            <div className="flex justify-between mt-2">
                                <span className="text-gray-700 dark:text-white">
                                    Starting Bid:
                                </span>
                                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                                    ${listing.startingBid}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700 dark:text-white">
                                    Current Bid:
                                </span>
                                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                                    ${listing.currentBid}
                                </span>
                            </div>
                            {listing.buyNowPrice && (
                                <div className="flex justify-between mt-2">
                                    <span className="text-gray-700 dark:text-white">
                                        Buy Now:
                                    </span>
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        ${listing.buyNowPrice}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ViewListings
