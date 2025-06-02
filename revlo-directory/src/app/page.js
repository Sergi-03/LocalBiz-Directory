"use client"

import { useEffect, useState } from "react"
import { BusinessCard } from "@/components/ui/business-card"
import { supabase } from "@/lib/supabaseClient"
import Navbar from "@/components/ui/navbar"
import BusinessMap from "@/components/ui/business-map"
import { Fqa } from "@/components/ui/fqa"

export default function HomePage() {
  const [allBusinesses, setAllBusinesses] = useState([])
  const [filteredBusinesses, setFilteredBusinesses] = useState([])
  const [filters, setFilters] = useState({ searchTerm: "", selectedCategory: "all" })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("id, name, slug, images, phone, website, email, verified, description, address, category:categoryId(name, slug)")

      if (error) {
        setError(error.message)
      } else {
        setAllBusinesses(data)
        setFilteredBusinesses(data)
      }
      setLoading(false)
    }

    fetchBusinesses()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("name, slug")
      if (!error) {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const { searchTerm, selectedCategory } = filters
    const search = searchTerm.toLowerCase()

    const filtered = allBusinesses.filter((biz) => {
      const matchesName = biz.name.toLowerCase().includes(search)
      const matchesCategory =
        selectedCategory === "all" || biz.category?.slug === selectedCategory

      return matchesName && matchesCategory
    })

    setFilteredBusinesses(filtered)
  }, [filters, allBusinesses])

  if (loading) return <p className="text-center mt-10">Loading businesses...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <>
      <Navbar filters={filters} setFilters={setFilters} categories={categories} />
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-6">Discover businesses near you</h2>
        <div className="mb-8">
          <BusinessMap businesses={filteredBusinesses} />
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">No results found</p>
          )}
        </div>
      </section>
      <Fqa/>
    </>
  )
}