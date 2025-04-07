// src/pages/post-item.tsx
import React, { useState } from "react";
import { postItem, getToken } from "@/lib/api";
import { useRouter } from "next/router";

const PostItemPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setMessage("Tüm alanları doldurun.");
      return;
    }

    const token = getToken();
    if (!token) {
      setMessage("Lütfen giriş yapın.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const result = await postItem(formData, token);
      if (result && !result.error) {
        setMessage("Başarıyla yüklendi.");
        router.push("/profile"); // Gönderim sonrası profile sayfasına yönlendir
      } else {
        setMessage(result.error || "Bir hata oluştu.");
      }
    } catch (err: any) {
      setMessage(err.message || "İstek gönderilemedi.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title:</label>
          <input
            type="text"
            className="w-full border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Description:</label>
          <textarea
            className="w-full border px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Item
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
};

export default PostItemPage;
