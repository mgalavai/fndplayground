// File: src/app/page.tsx
'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import CharacterList from '@/components/ui/CharacterList'
import CharacterTable from '@/components/CharacterTable'
import { Character } from '@/types/Character'
import characterData from '@/data/characters.json'

type CharacterData = {
  characters: {
    [key: string]: Character
  }
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [isTableView, setIsTableView] = useState(false)

  const typedCharacterData = characterData as CharacterData

  const filteredCharacters = Object.entries(typedCharacterData.characters)
    .filter(([name, char]) => {
      return name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === 'all' || char.color.toLowerCase().startsWith(filter))
    }) as [string, Character][]

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Character Explorer</h1>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          <Button onClick={() => setFilter('all')}>All</Button>
          <Button onClick={() => setFilter('green')}>Green</Button>
          <Button onClick={() => setFilter('dark')}>Dark</Button>
          <Button onClick={() => setFilter('light')}>Light</Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="table-view"
          checked={isTableView}
          onCheckedChange={setIsTableView}
        />
        <label htmlFor="table-view">
          {isTableView ? 'Table View' : 'Card View'}
        </label>
      </div>
      {isTableView ? (
        <CharacterTable characters={filteredCharacters} />
      ) : (
        <CharacterList characters={filteredCharacters} />
      )}
    </main>
  )
}