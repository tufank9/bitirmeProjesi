"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link"; // Link bileşenini içe aktar
import { supabase } from '@/lib/supabaseClient'; // Supabase clientini içe aktar

const ActionMovies = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [session, setSession] = useState(null); // Oturum durumu

  // Oturum kontrolü
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);
    };

    checkSession();
  }, []);

  // Film verilerini al
  useEffect(() => {
    const fetchMovies = async () => {
      // Tarayıcı depolamasından veriyi kontrol et
      const storedMovies = localStorage.getItem('actionMovies');
      if (storedMovies) {
        setActionMovies(JSON.parse(storedMovies)); // Depolanan veriyi kullan
        return; // Daha fazlasını yüklemeye gerek yok
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODA5YzI5ODE1MWYyYTU2MTM2NjM0NjVhMGIwZmE4OCIsIm5iZiI6MTcyNTM3MjkyMC43NzU5MjEsInN1YiI6IjY2NDNkY2NjZjY0ODRkNzgxNjJhNGZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uoaupt0Opwnf-fnMX7BMitM-6lzAEMidWnzk6q5uBXs'
        }
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?with_genres=28&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
        const data = await response.json();

        const movies = data.results.slice(0, 25).map(movie => ({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.svg' // Placeholder kullanma
        }));

        setActionMovies(movies);
        localStorage.setItem('actionMovies', JSON.stringify(movies)); // Veriyi depolayın
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Aksiyon Filmleri</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {actionMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}> {/* Tıklanabilir link oluştur */}
            <Card className="w-full flex-shrink-0 cursor-pointer"> {/* Kartın genişliğini %100 yap */}
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

export default ActionMovies;