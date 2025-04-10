"use client";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  contact_me?: string;
  created_at: string;
  type?: "product" | "service"; // <-- item türü
};

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "product" | "service">("all");

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

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex gap-4 mb-6">
        <a href="/login" className="text-blue-600 underline">Login</a>
      </nav>

      <h1 className="text-2xl font-bold mb-4">Items</h1>

      {/* Arama ve filtre */}
      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${filterType === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterType("all")}
          >
            Tümü
          </button>
          <button
            className={`px-4 py-2 rounded ${filterType === "product" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterType("product")}
          >
            Ürünler
          </button>
          <button
            className={`px-4 py-2 rounded ${filterType === "service" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilterType("service")}
          >
            Hizmetler
          </button>
        </div>
      </div>

      {/* Liste */}
      {loading && <p>Loading items...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {!loading && !error && filteredItems.length === 0 && <p>Hiçbir sonuç bulunamadı.</p>}

      <div className="grid gap-6">
        {filteredItems.map((item) => (
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
            <p><strong>Tür:</strong> {item.type === "product" ? "Ürün" : "Hizmet"}</p>
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
