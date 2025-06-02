"use client"

import { useState, useEffect } from "react"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel} from "@/components/ui/dropdown-menu" 

export default function SearchBar({ filters = { searchTerm: "", selectedCategory: "all" }, onSearch, categories }) {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm)
  const [selectedCategory, setSelectedCategory] = useState(filters.selectedCategory)

  useEffect(() => {
    setSearchTerm(filters.searchTerm)
    setSelectedCategory(filters.selectedCategory)
  }, [filters])

  const handleSearchChange = (e) => {
    const newTerm = e.target.value
    setSearchTerm(newTerm)
    onSearch({ ...filters, searchTerm: newTerm })
  }

  const handleCategorySelect = (value) => {
    setSelectedCategory(value)
    onSearch({ ...filters, selectedCategory: value })
  }

  const selectedCategoryName =
    selectedCategory === "all"
      ? "All categories"
      : categories.find((cat) => cat.slug === selectedCategory)?.name || "All categories"

  return (
    <div className="searchbar-container flex gap-5 items-center">
      <input
        type="text"
        placeholder="Search business..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-1 rounded outline placeholder:text-muted-foreground placeholder:text-sm "
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="border rounded text-sm p-1.5 text-left outline text-muted-foreground">
            {selectedCategoryName}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => handleCategorySelect("all")}>
            All categories
          </DropdownMenuItem>
          {categories.map((cat) => (
            <DropdownMenuItem key={cat.slug} onSelect={() => handleCategorySelect(cat.slug)}>
              {cat.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
