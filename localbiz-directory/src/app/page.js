"use client"  

import { useEffect, useState } from "react"

export default function HomePage() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
  async function fetchBusinesses() {
    try {
      const res = await fetch("https://expert-space-journey-wr9w6p6jp7wxhv457-1234.app.github.dev/api/business");
      if (!res.ok) throw new Error("Error al cargar los negocios");
      const data = await res.json();
      setBusinesses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchBusinesses();
   }, []);
 

  if (loading) return <p className="text-center mt-10">Cargando negocios...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Listado de Negocios</h1>
      {businesses.length === 0 ? (
        <p className="text-center">No hay negocios disponibles.</p>
      ) : (
        <ul className="space-y-4">
          {businesses.map((b) => (
            <li key={b.id} className="p-4 border rounded shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{b.name}</h2>
              <p className="text-gray-600">{b.address}</p>
              <p className="text-sm text-gray-500">Categoría ID: {b.categoryId}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}