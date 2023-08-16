import Link from 'next/link'

export default function Home() {
    return (
        <section
            className="h-screen text-white p-6 sm:p-12 md:p-24 flex flex-col justify-center bg-center bg-cover"
            style={{
                height: 'calc(100vh - 68px - 81px)',
                backgroundImage: 'url(/hero-bg.jpg)',
                backgroundBlendMode: 'multiply',
                backgroundColor: 'rgba(26, 26, 26, 0.9)',
            }}
        >
            <div className="container mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                    Welcome to PrestigeAuctions
                </h1>
                <p className="text-md sm:text-xl md:text-2xl mb-6">
                    Dive into a world where luxury meets exclusivity. Discover
                    and bid on the world's most sought-after automobiles.
                </p>
                <Link
                    className="text-md sm:text-xl bg-lustrous-gold text-deep-charcoal px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-md hover:bg-gold-darker transition-all duration-300"
                    href="/listings"
                >
                    View Listings
                </Link>
            </div>
        </section>
    )
}
