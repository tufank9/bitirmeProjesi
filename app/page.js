"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import MainPage from "@/components/MainPage";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession(); 
    session.then(({ data }) => {
      setUser(data.session?.user || null); 
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      router.push('/');
    }
  };

  return (
    <div>
      <MainPage/>
    </div>
  );
}
