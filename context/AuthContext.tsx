'use client'

import React from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'

export const AuthContext = React.createContext({ user: null })

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider = ({ children }: any) => {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}
