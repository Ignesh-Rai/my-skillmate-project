'use client'

import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import MessageForm from '@/app/components/MessageForm'
import MessageList from '@/app/components/MessageList'
import ChartSection from '@/app/components/ChartSection'
import QuoteBox from '@/app/components/QuoteBox'
import SidePanel from '@/app/components/SidePanel'
import DarkModeToggle from '@/app/components/DarkModeToggle'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-4xl font mb-6">Get Back to </h1>
        <h2 className="text-5xl font-bold mb-6">Skillmate Messages </h2>
        <button
          onClick={() => signIn('google',{ prompt:'select_account'})}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Side Panel */}
      <div className="w-1/5 border-r border-gray-200 dark:border-gray-700">
        <SidePanel
          isOpen={true}
          onClose={() => {}}
          onSelectSection={(section) => alert(`${section} clicked`)}
        />
      </div>

      {/* Center Panel */}
      <main className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
        <div className="w-full max-w-2xl space-y-6">
          
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              )}
              <h1 className="text-2xl font-bold">📨 Skillmate Messages</h1>
            </div>
            <div className="flex gap-2">
              <DarkModeToggle />
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Message Form + Message List */}
          <MessageForm />  {/* ✅ no more user prop */}
          <MessageList />
        </div>
      </main>

      {/* Right Panel */}
      <div className="w-1/4 border-l border-gray-200 dark:border-gray-700 p-4 hidden md:block">
        <ChartSection />
        <QuoteBox />
      </div>
    </div>
  )
}
