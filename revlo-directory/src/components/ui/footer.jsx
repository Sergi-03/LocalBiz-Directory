import { Mail, Github, Linkedin, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
        <div className="text-center sm:text-left">
          <div className="flex sm:justify-start gap-1 text-primary font-semibold mb-1">
            <span>Revlo</span>
            <MapPin className="w-4 h-5" />
          </div>
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Revlo. All rights reserved.</p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="mailto:ssegarragarcia@gmail.com"
            className="flex items-center gap-1 hover:text-primary"
          >
            <Mail className="w-4 h-4" />
            ssegarragarcia@gmail.com
          </Link>

          <Link
            href="https://linkedin.com/in/sergi-segarra-garcia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}