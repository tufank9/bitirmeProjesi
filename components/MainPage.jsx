import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";

export default function MainPage() {
  const trendingMovies = [
    { id: 1, title: "Trend Film 1", rating: 4.5, releaseDate: "2023-10-01" },
    { id: 2, title: "Trend Film 2", rating: 4.2, releaseDate: "2023-09-15" },
    { id: 3, title: "Trend Film 3", rating: 4.0, releaseDate: "2023-08-22" },
  ];
 
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* Hero Section */}
      <section className="text-center py-12 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-primary">FilmCritic&apos;e Hoşgeldiniz!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Yeni filmler keşfedip, puanlayıp ve yorum yapmak için en havalı yer 
        </p>
      </section>

      {/* Trending Movies Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Trend Olan Filmler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingMovies.map((movie) => (
            <Card key={movie.id} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  {movie.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Vizyon Tarihi: {movie.releaseDate}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href={`/movies/${movie.id}`}>İncele</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
