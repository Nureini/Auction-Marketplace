import { Listing } from '@/types/ListingType'
import { useRouter } from 'next/navigation'

const ListingCard = (listing: Listing) => {
    const router = useRouter()

    return (
        <div
            className="border p-4 m-2 rounded cursor-pointer"
            onClick={redirectToListing}
        >
            <h3 className="font-bold">{listing.title}</h3>
            <p>Current highest bid: ${listing.highestBid}</p>
            {/* You can add more details if needed */}
        </div>
    )
}

export default ListingCard
