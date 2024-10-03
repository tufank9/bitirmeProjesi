'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const movieData = {
  id: 1,
  title: "Örnek Film",
  year: 2023,
  plot: "Bu bir örnek film açıklamasıdır. Gerçek bir filmde burada filmin konusu yer alacaktır.",
  poster: "/placeholder.svg?height=400&width=300",
  userRating: 4.5,
  imdbRating: 7.8,
  comments: [
    { id: 1, user: "Kullanıcı1", text: "Harika bir film!" },
    { id: 2, user: "Kullanıcı2", text: "Ortalama üstü, izlenir." },
  ]
}

export function MovieDetailJsx() {
  const [userRating, setUserRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleRating = (rating) => {
    setUserRating(rating)
    // Burada kullanıcının puanı backend'e gönderilecek
  }

  const handleCommentSubmit = () => {
    // Burada yorum backend'e gönderilecek
    console.log("Yorum gönderildi:", comment)
    setComment("")
  }

  return (
    (<div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-8">
        <img
          src={movieData.poster}
          alt={movieData.title}
          className="w-64 h-96 object-cover" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movieData.title}</h1>
          <p className="text-xl mb-4">{movieData.year}</p>
          <p className="mb-4">{movieData.plot}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="mr-4">Kullanıcı Puanı: {movieData.userRating.toFixed(1)}</span>
            <span>IMDb Puanı: {movieData.imdbRating}</span>
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
        {movieData.comments.map((comment) => (
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
    </div>)
  );
}