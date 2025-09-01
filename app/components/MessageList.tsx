'use client'

import useSWR from 'swr'
import { useEffect, useState } from 'react'

type Message = {
  _id: string
  user: string
  text: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function MessageList() {
  const { data: messages, error } = useSWR<Message[]>('/api/messages', fetcher, {
    refreshInterval: 2000,
  })

  const [reactions, setReactions] = useState<Record<string, Record<string, number>>>({})

  // Load reactions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('reactions')
    if (stored) {
      setReactions(JSON.parse(stored))
    }
  }, [])

  // Save reactions to localStorage
  useEffect(() => {
    localStorage.setItem('reactions', JSON.stringify(reactions))
  }, [reactions])

  const handleReaction = (messageId: string, emoji: string) => {
    setReactions((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        [emoji]: (prev[messageId]?.[emoji] || 0) + 1,
      },
    }))
  }

  if (error) return <div>Failed to load messages</div>
  if (!messages) return <div>Loading messages...</div>

  return (
    <div className="space-y-4 mt-4">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
        >
          {/* ✅ User name displayed here */}
          <p className="font-semibold text-gray-900 dark:text-white">{msg.user}</p>
          <p className="text-gray-700 dark:text-gray-300">{msg.text}</p>

          {/* Emoji Reactions */}
          <div className="flex gap-3 mt-2">
            {['👍', '❤️', '😂', '🎉'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(msg._id, emoji)}
                className="hover:scale-110 transition-transform"
              >
                {emoji} {reactions[msg._id]?.[emoji] || 0}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
