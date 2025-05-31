import Link from "next/link"
import { Github, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toogle"
import SearchBar from "@/components/ui/searchbar"

export default function Navbar({ filters, setFilters, categories = [], showSearchbar = true }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            Revlo
            <MapPin className="w-6 h-6 text-primary" />
          </Link>
          <div className="flex items-center space-x-4">
            {showSearchbar && (
            <SearchBar filters={filters} onSearch={setFilters} categories={categories} />
            )}
            <Link
              href="https://github.com/Sergi-03/Revlo-Directory"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
            >
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}