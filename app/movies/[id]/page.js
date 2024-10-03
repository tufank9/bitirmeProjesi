"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MovieDetail = ({ params }) => {
  const router = useRouter();
  const { id } = params; // URL'den ID'yi alıyoruz
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODA5YzI5ODE1MWYyYTU2MTM2NjM0NjVhMGIwZmE4OCIsIm5iZiI6MTcyNTM3MjkyMC43NzU5MjEsInN1YiI6IjY2NDNkY2NjZjY0ODRkNzgxNjJhNGZkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uoaupt0Opwnf-fnMX7BMitM-6lzAEMidWnzk6q5uBXs'
        }
      };

      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(response => response.json())
        .then(data => {
          setMovie(data);
          // Örnek yorumlar ekleyelim, gerçek uygulamada backend'den alınır.
          setComments([
            { id: 1, user: "Kullanıcı1", text: "Harika bir film!" },
            { id: 2, user: "Kullanıcı2", text: "Ortalama üstü, izlenir." },
          ]);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleRating = (rating) => {
    setUserRating(rating);
    // Burada kullanıcının puanı backend'e gönderilecek
  };

  const handleCommentSubmit = () => {
    // Yorum ekleme işlemi burada yapılacak
    const newComment = { id: comments.length + 1, user: "Yeni Kullanıcı", text: comment };
    setComments(prevComments => [...prevComments, newComment]);
    setComment("");
    console.log("Yorum gönderildi:", comment);
  };

  if (!movie) return <div>Loading...</div>; // Yükleniyor durumu

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 h-96 object-cover" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-xl mb-4">{new Date(movie.release_date).getFullYear()}</p>
          <p className="mb-4">{movie.overview}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="mr-4">Kullanıcı Puanı: {userRating > 0 ? userRating.toFixed(1) : "Henüz puan verilmedi"}</span>
            <span>IMDb Puanı: {movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="mb-4">
            <p className="mb-2">Puan Ver:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${star <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => handleRating(star)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Yorumlar</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <p className="font-semibold">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        ))}
        <div className="mt-4">
          <Textarea
            placeholder="Yorumunuzu yazın..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-2" />
          <Button onClick={handleCommentSubmit}>Yorum Yap</Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
