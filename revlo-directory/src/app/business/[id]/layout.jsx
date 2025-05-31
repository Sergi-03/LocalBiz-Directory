export async function generateMetadata({ params }) {
  const res = await fetch(`https://expert-space-journey-wr9w6p6jp7wxhv457-1234.app.github.dev/api/business/${params.id}`)
  const business = await res.json()

  return {
    title: `${business.name} | Revlo`,
    description: `Details, contact and opening hours for ${business.name}.`,
    openGraph: {
      title: `${business.name} | Revlo`,
      description: `Details, contact and opening hours for ${business.name}.`,
      url: `https://revlo.com/business/${params.id}`,
      images: [
        {
          url: business.images?.[0] || "/og-image.png",
          width: 1200,
          height: 630,
          alt: business.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${business.name} | Revlo`,
      description: `Details, contact and opening hours for ${business.name}.`,
      images: [business.images?.[0] || "/og-image.png"],
    },
  }
}

export default function BusinessLayout({ children }) {
  return <>{children}</>
}