import Navbar from "@/components/ui/navbar"
import BusinessChart from "@/components/ui/business-chart"

async function getBusiness(id) {
  const res = await fetch(`https://expert-space-journey-wr9w6p6jp7wxhv457-1234.app.github.dev/api/business/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Error loading business")
  return res.json()
}

export default async function BusinessPage({ params }) {
  const business = await getBusiness(params.id)

  return (
    <>
    <Navbar showSearchbar={false}/>
     <div>
      <h1>{business.name}</h1>
    </div>
    <BusinessChart/>
    </>
  )
}