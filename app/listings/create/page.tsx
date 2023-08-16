'use client'

import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { db, storage } from '@/config/firebaseConfig'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'next/navigation'

const CreateListing = () => {
    const router = useRouter()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [startingBid, setStartingBid] = useState('')
    const [buyNowPrice, setBuyNowPrice] = useState('')
    const [image, setImage] = useState(null)

    const handleImageChange = (e: any) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const submitListingToDB = async (e: any) => {
        e.preventDefault()

        if ((user as any)?.email !== 'admin@test.com') {
            alert('Only admin@test.com can create listings.')
            return
        }

        if (image) {
            // First, upload the image to Firebase Storage
            const imageId = Math.floor(Math.random() * 9000) + 1000
            const storageRef = ref(storage, 'listings/' + imageId)
            await uploadBytes(storageRef, image)
            const imageURL = await getDownloadURL(storageRef)

            // Then, create the listing in Firestore with the image URL
            const listingId = Math.floor(Math.random() * 9000) + 1000
            const now = new Date()
            const endAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)
            try {
                const docRef = doc(db, 'listings', listingId.toString())
                await setDoc(docRef, {
                    title,
                    startingBid: parseFloat(startingBid),
                    currentBid: 0,
                    buyNowPrice: parseFloat(buyNowPrice),
                    imageUrl: imageURL,
                    createdAt: now.toString(),
                    endAt: endAt.toString(),
                    available: true,
                })
                alert('Listing created successfully!')
                router.push('/listings')
            } catch (error) {
                console.error('Error creating listing: ', error)
                alert(
                    'There was an error creating the listing. Please try again.'
                )
            }
        } else {
            alert('Please upload an image for the listing.')
        }
    }

    return (
        <div className="container mx-auto p-4 dark:text-white">
            {(user as any)?.email === 'admin@test.com' ? (
                <>
                    <h1 className="text-xl md:text-2xl font-bold mb-4">
                        Create New Auction Listing
                    </h1>
                    <form onSubmit={submitListingToDB} className="space-y-4">
                        <div>
                            <label className="block mb-2">Image</label>
                            <input
                                type="file"
                                className="w-full p-2 rounded border"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 rounded border dark:text-black"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Starting Bid</label>
                            <input
                                type="number"
                                value={startingBid}
                                onChange={(e) => setStartingBid(e.target.value)}
                                className="w-full p-2 rounded border dark:text-black"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">
                                Buy Now Price (optional)
                            </label>
                            <input
                                type="number"
                                value={buyNowPrice}
                                onChange={(e) => setBuyNowPrice(e.target.value)}
                                className="w-full p-2 rounded border dark:text-black"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={submitListingToDB}
                        >
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <p>You do not have permission to access this page.</p>
            )}
        </div>
    )
}

export default CreateListing
