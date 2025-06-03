import Navbar from "@/components/ui/navbar"
import BusinessChart from "@/components/ui/business-chart"
import ReviewForm from "@/components/ui/review-form"
import QRCodeDisplay from "@/components/ui/qrcode-display"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Globe, Phone, Mail } from "lucide-react"

async function getBusiness(id) {
  const res = await fetch(`https://revlo-backend.onrender.com/api/business/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Error loading business")
  return res.json()
}

async function getReview(businessId) {
  const res = await fetch(`https://revlo-backend.onrender.com/api/business/reviews/business/${businessId}`, {
    cache: "no-store"
  })
  if(!res.ok) throw new Error("Error loading reviews")
  return res.json()
}

export default async function BusinessPage({ params }) {
  const business = await getBusiness(params.id)
  const reviews = await getReview(params.id)
  
  return (
    <>
      <Navbar showSearchbar={false} />
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden shadow-md">
          <Image 
            src={business.images?.[0]}
            alt={business.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {business.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {business.description}
          </p>
          <div className="flex justify-center items-center gap-2 mt-2">
            <Badge variant="outline">{business.category?.name}</Badge>
            {business.verified && (
              <CheckCircle2 className="text-green-500 w-5 h-5 mr-[20px]" title="Verificado" />
            )}
          </div>
        </div>
        <Card className="shadow-xl rounded-2xl border-none">
          <CardContent className="p-6 space-y-4 text-sm flex justify-center inline-grid block">
            {business.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{business.phone}</span>
              </div>
            )}
            {business.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground"/>
                <span>{business.email}</span>
              </div>
            )}
            {business.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Website
                </a>
              </div>
            )}
            {business.address && (
              <p className="text-muted-foreground">{business.address}</p>
            )}
            {business.hours && (
            <div className="mt-8 text-muted-foreground text-center">
            <div className="grid-cols-2 gap-x-5 text-left text-sm block">
            {Object.entries(business.hours).map(([day, hours]) => (
            <div key={day} className="flex justify-between">
            <span className="capitalize">{day}</span>
            <span>{hours}</span>
            </div>
            ))}
            </div>
            </div>
             )}
             {business.website && (
  <QRCodeDisplay url={business.website} />
)}
          </CardContent>
        </Card>
        {reviews.length > 0 ? (
  <section className="space-y-6">
    <h3 className="text-lg font-semibold">Customer reviews</h3>
    {reviews.map((review) => (
      <Card key={review.id} className="shadow-md">
        <CardContent className="p-4 space-y-2">
          <div className="flex">
             <Avatar>
             <AvatarImage src={review.avatarUrl || undefined}/>
             <AvatarFallback>{review.name?.[0]?.toUpperCase() || "?"}</AvatarFallback>
             </Avatar>
            <p className="font-medium ml-3 mt-1">{review.name}</p>
            <p className="text-yellow-500 ml-auto">{'⭐'.repeat(review.rating)}</p>
          </div>
          <p className="text-muted-foreground text-sm">{review.comment}</p>
          <p className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    ))}
  </section>
) : (
  <p className="text-muted-foreground text-sm">This business has no reviews yet.</p>
)}
<ReviewForm businessId={params.id}/>
  <h3 className="text-lg font-semibold mb-4">Business statistics</h3>
  <BusinessChart />
  </section>
    </>
  )
}