'use client'

import Link from 'next/link'
import { Film, Star, TrendingUp, Award, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryTitle } from '@/app/category/categoryTitle'

const categories = [
  { name: "Aksiyon", icon: <Film className="h-6 w-6" />, description: "Heyecan dolu, tempolu filmler" },
  { name: "Komedi", icon: <Film className="h-6 w-6" />, description: "Kahkaha garantili eğlenceli filmler" },
  { name: "Drama", icon: <Film className="h-6 w-6" />, description: "Duygusal ve etkileyici hikayeler" },
  { name: "Bilim Kurgu", icon: <Film className="h-6 w-6" />, description: "Gelecek ve teknoloji temalı filmler" },
  { name: "Korku", icon: <Film className="h-6 w-6" />, description: "Gerilim dolu, korkutucu filmler" },
  { name: "Romantik", icon: <Film className="h-6 w-6" />, description: "Aşk ve ilişki temalı filmler" },
]

export function FilmCategories() {
  return (
    (<div className="container mx-auto px-4 py-8">
      <CategoryTitle/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={`/kategori/${category.name.toLowerCase()}`}>Keşfet</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-6">Öne Çıkanlar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-6 w-6 mr-2" />
              En Yüksek Puanlı Filmler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Kullanıcılarımızın en yüksek puan verdiği filmleri keşfedin.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/en-yuksek-puanli">Görüntüle</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              Trend Filmler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Şu anda en çok izlenen ve konuşulan filmleri kaçırmayın.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/trend-filmler">Görüntüle</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-6 w-6 mr-2" />
              Ödüllü Filmler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Prestijli ödüller kazanmış filmleri keşfedin.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/odullu-filmler">Görüntüle</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              Yakında Vizyonda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Yakında vizyona girecek filmleri önceden keşfedin.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/yakinda-vizyonda">Görüntüle</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Özel Koleksiyonlar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Yönetmen Spotlight</CardTitle>
            <CardDescription>Her ay farklı bir yönetmenin eserlerini keşfedin</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Bu ay: Christopher Nolan</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/yonetmen-spotlight">İncele</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tematik Koleksiyonlar</CardTitle>
            <CardDescription>Özel temalara göre seçilmiş film listeleri</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Güncel tema: Distopik Gelecek</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/tematik-koleksiyonlar">Keşfet</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>)
  );
}