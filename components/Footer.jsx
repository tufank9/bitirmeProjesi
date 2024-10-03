import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-turuncu border-t dark:bg-neutral-950 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">FilmSitesi</h2>
            <p className="text-sm text-black dark:text-neutral-400">
              Film tutkunları için en iyi değerlendirme platformu.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Youtube">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/horror" className="hover:underline">Korku</Link></li>
              <li><Link href="/category/comedy" className="hover:underline">Komedi</Link></li>
              <li><Link href="/category/action" className="hover:underline">Aksiyon</Link></li>
              <li><Link href="/category/sci-fi" className="hover:underline">Bilim Kurgu</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-sm text-neutral-500 dark:text-neutral-400">
          <p>&copy; 2024 FilmCritic. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}