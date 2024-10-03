"use cl"
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";

export default function MainPage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODA5YzI5ODE1MWYyYTU2MTM2NjM0NjVhMGIwZmE4OCIsIm5iZiI6MTcyNTM3MjkyMC43NzU5MjEsInN1YiI6IjY2NDNkY2NjZjY0ODRkNzgxNjJhNGZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uoaupt0Opwnf-fnMX7BMitM-6lzAEMidWnzk6q5uBXs'
      }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(data => {
        const movies = data.results.slice(0, 3).map(movie => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          releaseDate: movie.release_date
        }));
        setTrendingMovies(movies);
      })
      .catch(err => console.error(err));
  }, []);

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
