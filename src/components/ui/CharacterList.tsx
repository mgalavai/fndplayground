// File: src/components/CharacterList.tsx
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Character } from './CharacterTable'

type CharacterListProps = {
  characters: [string, Character][]
}

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {characters.map(([name, char]) => (
        <Card key={name}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Class:</strong> {char.class.split('|')[0]}</p>
            <p><strong>Species:</strong> {char.species.split('|')[0]}</p>
            <p><strong>Color:</strong> {char.color.split('|')[0]}</p>
            <p><strong>Stars:</strong> {char.stars.split('|')[0]}</p>
            <p><strong>AI:</strong> {char.ai.split('|')[0]}</p>
            <p><strong>Basic Attack:</strong> {char.basic_attack}</p>
            <p><strong>Basic Health:</strong> {char.basic_health}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}