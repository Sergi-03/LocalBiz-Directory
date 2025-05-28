import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { CheckCircle2, Globe, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BusinessCard({ business}) {

   const {
    name,
    address,
    phone,
    website,
    images,
    verified,
    category
  } = business

  const imageUrl = images?.[0] || "https://via.placeholder.com/400x200?text=Business"
  const Icon = category?.icon ? require("lucide-react")[category.icon] : null


  return (
     <Card className="w-full max-w-sm border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-0">
      <div className="relative w-full h-40">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          {verified && <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" title="Verified" />}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {Icon && <Icon className="w-4 h-4" />}
          <Badge variant="outline">{category?.name}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{address}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-[2px] text-sm px-4 pb-2 gap-3">
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{phone}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-500 hover:underline"
            >
            Website
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
