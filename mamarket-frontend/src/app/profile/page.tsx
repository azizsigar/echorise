"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view your profile.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load profile.");
        }

        const data = await response.json();
        setUser(data.user);
        setItems(data.items || []);
      } catch (err) {
        setError("Error loading profile: " + (err as Error).message);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteItem = async (itemId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      alert("Item deleted successfully.");
    } catch (error) {
      alert("Failed to delete item.");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      {user ? (
        <>
          <h2>{user.username}'s Profile</h2>
          <p>User ID: {user.id}</p>
          <a href="/postItem" className="text-blue-600">Post an item</a>
          <h3>Your Items:</h3>
          <div>
            {items.length === 0 ? (
              <p>You have no items posted.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="item" style={{ marginBottom: "20px" }}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-600 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ maxWidth: "300px", height: "auto" }}
                  />
                  <p>
                    <small>Posted on: {new Date(item.created_at).toLocaleString()}</small>
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
