'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000) // splash lasts 2s
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async () => {
    if (session) {
      router.push('/dashboard')
    } else {
      await signIn('google', { prompt: 'select_account', callbackUrl: '/dashboard' })
    }
  }

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <img
          src="/image.png" // 👈 logo in /public/logo.png
          alt="Skillmate Logo"
          className="w-32 h-32 opacity-0 animate-fadeIn"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white transition-opacity duration-1000">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">📨 Skillmate Messages</h1>
      <p className="text-lg mb-10 opacity-90">Connect, Share, and Grow Together</p>
      <button
        onClick={handleLogin}
        className="flex items-center gap-3 bg-white text-gray-900 dark:bg-gray-800 dark:text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="w-5 h-5"
        />
        <span className="font-semibold">Sign in with Google</span>
      </button>
    </div>
  )
}
