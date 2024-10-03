'use client'

import Link from 'next/link'
import { Film, Star, TrendingUp} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryTitle } from '@/app/category/categoryTitle'

const categories = [
  { name: "Komedi", icon: <Film className="h-6 w-6" />, description: "Kahkaha garantili eğlenceli filmler" },
  { name: "Drama", icon: <Film className="h-6 w-6" />, description: "Duygusal ve etkileyici hikayeler" },
  { name: "Romantik", icon: <Film className="h-6 w-6" />, description: "Aşk ve ilişki temalı filmler" },
  { name: "ÇizgiFilm", icon: <Film className="h-6 w-6" />, description: "Çocuklar için eğlenceli filmler" },
  { name: "Macera", icon: <Film className="h-6 w-6" />, description: "Heyecan dolu yolculuklara çıkaran filmler" },
  { name: "Gerilim", icon: <Film className="h-6 w-6" />, description: "Tansiyonu yüksek, kenarında tutan filmler. filmler" },
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
                <Link href={"/category"}>Keşfet</Link>
                {/* href={`/kategori/${category.name.toLowerCase()}`} */}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       
    </div>)
  );
}