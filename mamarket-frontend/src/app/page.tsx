"use client";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  contact_me?: string;
  created_at: string;
};

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items");

        if (!res.ok) {
          throw new Error(`Status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data.items)) {
          throw new Error("Geçersiz veri yapısı");
        }

        setItems(data.items);
      } catch (err: any) {
        setError(err.message || "Veri çekilemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex gap-4 mb-6">
        <a href="/login" className="text-blue-600 underline">Login</a>
        {/* hide this button */}
      </nav>

      <h1 className="text-2xl font-bold mb-4">Items</h1>

      {loading && <p>Loading items...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && items.length === 0 && <p>No items found.</p>}

      <div className="grid gap-6">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.description}</p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="max-w-full h-auto my-2"
              />
            )}
            <p><strong>Contact:</strong> {item.contact_me || "Not available"}</p>
            <p className="text-sm text-gray-600">
              Posted on: {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
