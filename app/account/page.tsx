const Account = () => {
    return (
        <div className="p-4 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Your Bids</h1>

            <section>
                <h2 className="text-xl font-semibold mb-2">Won Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <p className="text-gray-300 mb-1">
                        You haven't won any listings yet...
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Expired Listings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <p className="text-gray-300 mb-1">Nothing currently...</p>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Watchlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <p className="text-gray-300 mb-1">
                        Currently you haven't bidded on anything
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Account
