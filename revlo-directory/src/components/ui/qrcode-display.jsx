"use client"

import { QRCodeCanvas } from "qrcode.react"

export default function QRCodeDisplay({ url }) {
  if (!url) return null

  return (
    <div className="text-center mt-8 space-y-2">
      <p className="text-sm text-muted-foreground">Scan this QR code to visit the business website</p>
      <div className="inline-block border p-2 rounded-lg shadow-md bg-white mt-5">
        <QRCodeCanvas value={url} size={150} level="H" />
      </div>
    </div>
  )
}
