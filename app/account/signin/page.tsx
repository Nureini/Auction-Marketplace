'use client'

import { useState } from 'react'
import { auth } from '../../../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'

const SignIn = () => {
    const { user } = useAuthContext()

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                router.push('/')
            })
            .catch((error) => console.log('Error: ', error))
    }

    return (
        <div
            className="h-screen flex flex-col items-center justify-center bg-bottom bg-cover"
            style={{
                height: 'calc(100vh - 68px - 81px)',
                backgroundImage: 'url(/account-bg.jpg)',
                backgroundBlendMode: 'multiply',
                backgroundColor: 'rgba(26, 26, 26, 0.9)',
            }}
        >
            <h1 className="mb-6 text-3xl font-bold text-white">Sign In</h1>
            <form onSubmit={handleSubmit} className=" p-6 rounded-md shadow-md">
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 w-full p-2 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 w-full p-2 rounded-md"
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-lustrous-gold text-deep-charcoal rounded-md hover:bg-gold-darker transition-all duration-300"
                >
                    Sign In
                </button>
            </form>

            <Link
                href="/account/register"
                className="text-white text-center hover:text-lustrous-gold hover:underline"
            >
                Don't Already Have An Account? Register Here!
            </Link>
        </div>
    )
}

export default SignIn
