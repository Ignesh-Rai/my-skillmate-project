// app/components/TopBar.tsx
'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import DarkModeToggle from './DarkModeToggle';
import { Button } from '@/app/components/ui/button';

export default function TopBar() {
  return (
    <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">🌻 Skillmate Messages</h1>
      <div className="flex gap-4 items-center">
        <DarkModeToggle />
        <Button variant="destructive" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
