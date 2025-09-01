'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Info, Settings, HelpCircle, User } from 'lucide-react'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  onSelectSection: (section: string) => void
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onSelectSection }) => {
  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Header without Close Button */}
      <div className="flex items-center p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Skillmate Panel</h2>
      </div>

      {/* Menu Items */}
      <ul className="p-4 space-y-4">
        <li>
          <button
            onClick={() => onSelectSection('Message Details')}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <User className="w-4 h-4" /> Message Details
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelectSection('Settings')}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelectSection('Help')}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <HelpCircle className="w-4 h-4" /> Help
          </button>
        </li>
        <li>
          <button
            onClick={() => onSelectSection('About')}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <Info className="w-4 h-4" /> About
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SidePanel
