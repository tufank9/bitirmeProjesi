'use client'

import Link from 'next/link'
import { Star, Clock, TrendingUp, Ghost, Skull, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KorkuFİlmBaslik } from '@/app/category/horror/text'

// Bu örnek veri yapısı. Gerçek uygulamada bu veriler bir API'den gelecektir.
const topHorrorMovies = [
  { id: 1, title: "Korkunç Film 1", rating: 4.5, year: 2021 },
  { id: 2, title: "Gece Kabusları", rating: 4.2, year: 2020 },
  { id: 3, title: "Karanlık Ev", rating: 4.0, year: 2022 },
  { id: 4, title: "Son Çığlık", rating: 3.8, year: 2019 },
]

export function KomediFilm() {
  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Ghost className="mr-2 h-8 w-8" />
       <KorkuFİlmBaslik/>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              En İyi Korku Filmleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topHorrorMovies.map(movie => (
                <li key={movie.id} className="flex justify-between items-center">
                  <span>{movie.title}</span>
                  <Badge variant="secondary">{movie.rating}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/en-iyi-korku-filmleri">Tümünü Gör</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              Yakında Vizyona Girecek Korku Filmleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Yakında vizyona girecek en korkunç filmleri keşfedin ve beklemeye başlayın!</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/yakinda-korku-filmleri">Keşfet</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Trend Korku Filmleri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Şu anda en çok izlenen ve konuşulan korku filmlerini kaçırmayın.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/trend-korku-filmleri">Görüntüle</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Korku Alt Kategorileri</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {['Doğaüstü', 'Slasher', 'Psikolojik', 'Zombi', 'Hayalet', 'Vampir', 'Canavar', 'Gerilim'].map(subCategory => (
          <Button key={subCategory} variant="outline" asChild className="h-auto py-2">
            <Link href={`/kategori/korku/${subCategory.toLowerCase()}`}>
              {subCategory}
            </Link>
          </Button>
        ))}
      </div>
      
    </div>)
  );
}