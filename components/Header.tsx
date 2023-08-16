'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { auth } from '@/config/firebaseConfig'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()
    const { user } = useAuthContext()
    const [isOpen, setIsOpen] = useState(false)

    const handleIsOpen = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    const handleSignOut = () => {
        if (user) {
            auth.signOut()
            router.push('/')
        }
    }

    return (
        <header className="z-10 bg-white p-6 dark:bg-deep-charcoal dark:text-white border-b border-gray-200">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    className="text-lustrous-gold text-2xl font-bold"
                    href="/"
                >
                    PrestigeAuctions
                </Link>

                {isOpen ? (
                    <svg
                        className="md:hidden w-6 h-6 cursor-pointer hover:text-lustrous-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleIsOpen}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                ) : (
                    <svg
                        className="md:hidden w-6 h-6 cursor-pointer hover:text-lustrous-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleIsOpen}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                )}

                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                className="hover:text-lustrous-gold"
                                href="/listings"
                            >
                                Listings
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="hover:text-lustrous-gold"
                                href="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="hover:text-lustrous-gold"
                                href="/contact"
                            >
                                Contact Us
                            </Link>
                        </li>
                        {user ? (
                            <li>
                                <Link
                                    className="hover:text-lustrous-gold"
                                    href="/account"
                                >
                                    Account
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    className="hover:text-lustrous-gold"
                                    href="/account/signin"
                                >
                                    Sign In
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li
                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {isOpen && (
                <nav className="md:hidden fixed top-[80px] left-0 w-full max-h-3/4 bg-gray-100 dark:bg-[#2d2d2d] shadow-md z-10 overflow-y-auto">
                    <ul className="flex flex-col py-2 items-center">
                        <li>
                            <Link
                                className="hover:text-lustrous-gold cursor-pointer block px-4 py-2"
                                href="/listings"
                            >
                                Listings
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="hover:text-lustrous-gold cursor-pointer block px-4 py-2"
                                href="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="hover:text-lustrous-gold cursor-pointer block px-4 py-2"
                                href="/contact"
                            >
                                Contact Us
                            </Link>
                        </li>
                        {user ? (
                            <li>
                                <Link
                                    className="hover:text-lustrous-gold cursor-pointer block px-4 py-2"
                                    href="/account"
                                >
                                    Account
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    className="hover:text-lustrous-gold cursor-pointer block px-4 py-2"
                                    href="/account/signin"
                                >
                                    Sign In
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li
                                className="text-red-500 hover:text-red-600 cursor-pointer block px-4 py-2"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header
