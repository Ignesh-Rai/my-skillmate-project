'use client'

import React, { useState } from 'react'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'

export default function MessageForm() {
  const [message, setMessage] = useState('')
  const { mutate } = useSWR('/api/messages')
  const { data: session } = useSession()   // ✅ get logged-in user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      alert('Enter a Message First !')
      return
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: session.user.name,   // ✅ send from session
          text: message,
        }),
      })

      if (res.ok) {
        setMessage('')
        mutate()
      } else {
        const err = await res.json()
        alert(`Error: ${err.error || 'Failed to save message'}`)
      }
    } catch (error) {
      console.error('Error posting message:', error)
      alert('Error posting message. Check console.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-2"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`What's on your mind, ${session?.user?.name || 'Guest'}?`}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        type="submit"
        className="self-end px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Post
      </button>
    </form>
  )
}
