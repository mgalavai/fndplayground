// File: src/components/CharacterTable.tsx
import React, { useState, useMemo } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"

export type Character = {
  class: string
  species: string
  color: string
  stars: string
  ai: string
  basic_attack: string
  basic_health: string
  asc_attack: string
  asc_health: string
  traits: string[]
  gear: string[]
  images: string[]
}

type CharacterTableProps = {
  characters: [string, Character][]
}

function decodeHtmlEntities(str: string) {
  return str.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCodePoint(dec);
  });
}

export default function CharacterTable({ characters }: CharacterTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const data = useMemo(() => 
    characters.map(([name, char]) => ({
      name,
      ...char,
      class: char.class.split('|')[0],
      species: char.species.split('|')[0],
      color: char.color.split('|')[0],
      stars: decodeHtmlEntities(char.stars.split('|')[0]),
      ai: char.ai.split('|')[0],
    })),
    [characters]
  )

  const columns = useMemo<ColumnDef<(typeof data)[number]>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: 'class',
      header: 'Class',
    },
    {
      accessorKey: 'species',
      header: 'Species',
    },
    {
      accessorKey: 'color',
      header: 'Color',
    },
    {
      accessorKey: 'stars',
      header: 'Stars',
      cell: ({ row }) => (
        <div className="font-emoji">{row.original.stars}</div>
      ),
    },
    {
      accessorKey: 'ai',
      header: 'AI',
    },
    {
      accessorKey: 'basic_attack',
      header: 'Basic Attack',
    },
    {
      accessorKey: 'basic_health',
      header: 'Basic Health',
    },
  ], [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}