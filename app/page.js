"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import MovieCarousel from "@/components/movieCarousel";
import MainPage from "@/components/MainPage";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession(); // Asenkron fonksiyonu çağırıyoruz
    session.then(({ data }) => {
      setUser(data.session?.user || null); // Oturumdaki kullanıcıyı al
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null); // Kullanıcı çıkış yaptıktan sonra kullanıcıyı sıfırla
      router.push('/'); // Giriş sayfasına yönlendir
    }
  };

  return (
    <div>
      {/* <MovieCarousel/> */}
      <MainPage/>
    </div>
  );
}
