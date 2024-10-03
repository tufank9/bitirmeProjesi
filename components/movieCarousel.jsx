import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Örnek veri yapısı. Gerçek uygulamada bu veriler bir API'den gelecektir.
const movies = [
  { id: 1, title: "Film 1", rating: 4.5 },
  { id: 2, title: "Film 2", rating: 3.8 },
  { id: 3, title: "Film 3", rating: 4.2 },
  { id: 4, title: "Film 4", rating: 3.9 },
  { id: 5, title: "Film 5", rating: 4.7 },
  { id: 6, title: "Film 6", rating: 4.0 },
  { id: 7, title: "Film 7", rating: 4.0 },
  { id: 8, title: "Film 8", rating: 4.0 },
  { id: 9, title: "Film 9", rating: 4.0 },
  // ... daha fazla film
]

export default function MovieCarousel() {
  const [startIndex, setStartIndex] = useState(0)

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 5) % movies.length)
  }

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 5 + movies.length) % movies.length)
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex space-x-4 p-4 justify-center">
        {[...Array(5)].map((_, index) => {
          const movieIndex = (startIndex + index) % movies.length
          const movie = movies[movieIndex]
          return (
            <Card key={movie.id} className="w-48 flex-shrink-0">
              <CardContent className="p-4">
                <div className="aspect-[2/3] bg-gray-200 mb-2"></div>
                <h3 className="font-semibold">{movie.title}</h3>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
