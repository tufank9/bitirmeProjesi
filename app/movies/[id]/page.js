"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/lib/supabaseClient';

const MovieDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null); // Kullanıcıların ortalama puanı
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [session, setSession] = useState(null);
  
  // Kullanıcı oturumunu kontrol ediyoruz
  useEffect(() => {
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);
    };

    checkSession();
  }, []);

  // Film bilgilerini, yorumları ve puanları getir
  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODA5YzI5ODE1MWYyYTU2MTM2NjM0NjVhMGIwZmE4OCIsIm5iZiI6MTcyNTM3MjkyMC43NzU5MjEsInN1YiI6IjY2NDNkY2NjZjY0ODRkNzgxNjJhNGZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uoaupt0Opwnf-fnMX7BMitM-6lzAEMidWnzk6q5uBXs'
          }
        };

        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
          const data = await response.json();
          setMovie(data);

          // Yorumları getirme işlemi
          const { data: commentData, error } = await supabase
            .from('comments')
            .select('*')
            .eq('movie_id', id);
          if (error) {
            console.error("Yorumlar getirilirken bir hata oluştu:", error);
          } else {
            setComments(commentData);
          }

          // Kullanıcının puanını alma işlemi
          if (session) {
            const { data: ratingData, error: ratingError } = await supabase
              .from('ratings')
              .select('rating')
              .eq('movie_id', id)
              .eq('user_id', session.user.id)
              .single();

            if (ratingError) {
              console.error("Kullanıcının puanı alınırken bir hata oluştu:", ratingError);
            } else if (ratingData) {
              setUserRating(ratingData.rating);
            }
          }

          // Tüm kullanıcıların puanlarının ortalamasını getirme işlemi
          const { data: allRatingsData, error: allRatingsError } = await supabase
            .from('ratings')
            .select('rating')
            .eq('movie_id', id);

          if (allRatingsError) {
            console.error("Puanlar getirilirken bir hata oluştu:", allRatingsError);
          } else if (allRatingsData.length > 0) {
            const totalRatings = allRatingsData.reduce((acc, curr) => acc + curr.rating, 0);
            const avgRating = totalRatings / allRatingsData.length; // Ortalama puan
            setAverageRating(avgRating.toFixed(1)); // Virgülden sonra bir basamakla gösteriyoruz
          }

        } catch (err) {
          console.error("Film veya yorumlar getirilirken bir hata oluştu:", err);
        }
      }
    };

    fetchMovie();
  }, [id, session]);

  // Puan verme işlemi
  const handleRating = async (rating) => {
    if (!session) {
      alert("Puan vermek için giriş yapmalısınız.");
      return;
    }

    try {
      const { error } = await supabase
        .from('ratings')
        .upsert([{ movie_id: id, user_id: session.user.id, rating }]);

      if (error) {
        console.error("Puan eklenirken bir hata oluştu:", error);
      } else {
        setUserRating(rating);
        console.log("Puan başarıyla eklendi.");

        // Puan verdikten sonra ortalamayı tekrar hesaplıyoruz
        const { data: allRatingsData, error: allRatingsError } = await supabase
          .from('ratings')
          .select('rating')
          .eq('movie_id', id);

        if (allRatingsError) {
          console.error("Puanlar getirilirken bir hata oluştu:", allRatingsError);
        } else if (allRatingsData.length > 0) {
          const totalRatings = allRatingsData.reduce((acc, curr) => acc + curr.rating, 0);
          const avgRating = totalRatings / allRatingsData.length;
          setAverageRating(avgRating.toFixed(1));
        }
      }
    } catch (err) {
      console.error("Beklenmedik bir hata oluştu:", err);
    }
  };

  // Yorum ekleme işlemi
  const handleCommentSubmit = async () => {
    if (!session) {
      alert("Yorum yapabilmek için giriş yapmalısınız.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ comment, movie_id: id, user_id: session.user.id, user_email: session.user.email }])
        .select();

      if (error) {
        console.error("Yorum eklenirken bir hata oluştu:", error);
      } else if (data && data.length > 0) {
        setComments(prevComments => [...prevComments, { id: data[0].id, user_id: session.user.id, user_email: session.user.email, comment }]);
        setComment("");
        console.log("Yorum başarıyla eklendi.");
      } else {
        console.error("Yorum eklenmesine rağmen veri alınamadı.");
      }
    } catch (err) {
      console.error("Beklenmedik bir hata oluştu:", err);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-64 h-auto object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-xl mb-4">{new Date(movie.release_date).getFullYear()}</p>
          <p className="mb-4">{movie.overview}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="mr-4">Kullanıcı Puanı: {userRating > 0 ? userRating.toFixed(1) : "Henüz puan verilmedi"}</span>
            <span>IMDb Puanı: {movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span>Genel Kullanıcı Ortalaması: {averageRating ? averageRating : "Henüz puanlanmadı"}</span>
          </div>
          <div className="mb-4">
            <p className="mb-2">Puan Ver:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Yorumlar</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <p className="font-semibold">{comment.user_email}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
        {session ? (
          <div className="mt-4">
            <Textarea
              placeholder="Yorumunuzu yazın..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleCommentSubmit}>Yorum Yap</Button>
          </div>
        ) : (
          <p className="text-red-500">Yorum yapabilmek için lütfen giriş yapın.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
