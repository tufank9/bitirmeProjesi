"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link"; // Link bileşeni içe aktarılıyor

const ComedyMovies = () => {
  const [comedyMovies, setComedyMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODA5YzI5ODE1MWYyYTU2MTM2NjM0NjVhMGIwZmE4OCIsIm5iZiI6MTcyNTM3MjkyMC43NzU5MjEsInN1YiI6IjY2NDNkY2NjZjY0ODRkNzgxNjJhNGZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uoaupt0Opwnf-fnMX7BMitM-6lzAEMidWnzk6q5uBXs'
      }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?with_genres=35&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(data => {
        const movies = data.results.slice(0, 25).map(movie => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.svg'
        }));
        setComedyMovies(movies);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Komedi Filmleri</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
        {comedyMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}> {/* Tıklanabilir link */}
            <Card className="w-full flex-shrink-0 cursor-pointer"> {/* Tıklanabilir card */}
              <CardContent className="p-4">
                <div className="aspect-[2/3] bg-gray-200 mb-2">
                  <img src={movie.poster} alt={movie.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="font-semibold">{movie.title}</h3>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComedyMovies;
