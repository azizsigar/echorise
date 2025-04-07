// src/pages/profile.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProfile, deleteItem } from "../lib/api"; // API işlevlerini buradan alıyoruz

const Profile = () => {
  const [user, setUser] = useState<any>(null); // Kullanıcı bilgisi
  const [items, setItems] = useState<any[]>([]); // Kullanıcının ürünleri
  const [loading, setLoading] = useState<boolean>(true); // Yükleniyor durumu
  const [error, setError] = useState<string | null>(null); // Hata mesajları

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Profil verilerini almak için API çağrısı
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token);
        setUser(profileData);
        setItems(profileData.items || []); // Kullanıcının ürünlerini al
      } catch (err: any) {
        setError("Profil verileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleDeleteItem = async (itemId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Lütfen giriş yapın.");
      return;
    }

    try {
      const success = await deleteItem(itemId, token);
      if (success) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        alert("Ürün başarıyla silindi!");
      }
    } catch (error) {
      setError("Ürün silinirken bir hata oluştu.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{user?.username} Profiliniz</h1>
      <h2>Eklediğiniz Ürünler:</h2>
      {items.length === 0 ? (
        <p>Henüz bir ürün eklemediniz.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button onClick={() => handleDeleteItem(item.id)}>Sil</button>
              <img src={item.image_url} alt={item.title} style={{ maxWidth: 200 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
