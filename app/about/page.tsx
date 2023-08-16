// components/AboutUs.tsx
import React from 'react'

const AboutUs = () => {
    return (
        <div className="flex flex-col items-center justify-center px-6 pt-[81px] dark:text-white pb-[68px]">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed">
                    At PrestigeAuctions, our mission is to provide you with the
                    finest auction experience. We are committed to showcasing
                    rare and unique items and ensuring a seamless auction
                    process for both buyers and sellers.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Our History</h2>
                <p className="text-lg leading-relaxed">
                    Founded in 2023, PrestigeAuctions has quickly become one of
                    the leading online auction platforms. With a dedicated team
                    of experts and a curated selection of items, we've
                    successfully organized numerous auctions with high customer
                    satisfaction.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <p className="text-lg leading-relaxed">
                    At the heart of PrestigeAuctions are our core values -
                    integrity, transparency, excellence, and innovation. We
                    believe in building trust with our community through open
                    and honest communication. Our pursuit of excellence ensures
                    that we deliver the best service to our users, while
                    continually adapting and innovating to meet the changing
                    needs of the auction industry.
                </p>
            </section>
        </div>
    )
}

export default AboutUs
