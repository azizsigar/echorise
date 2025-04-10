"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostItemPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [itemType, setItemType] = useState("product"); // default: ürün
  const [responseMessage, setResponseMessage] = useState<string>("");

  const router = useRouter();

  const handleOnClick = async () => {
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !image || !itemType) {
      setResponseMessage("All fields are required!");
      return;
    }

    let token;
    try {
      token = localStorage.getItem("token");
    } catch (err) {
      console.error("Error accessing localStorage:", err);
      setResponseMessage("Error accessing authentication data.");
      return;
    }

    if (!token) {
      setResponseMessage("Please log in to post an item.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("type", itemType); // <-- yeni alan

    try {
      const response = await fetch("http://localhost:3000/api/items/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Item posted successfully!");
        router.push("/profile");
      } else {
        setResponseMessage(`Error: ${result.error || "Something went wrong"}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-6">
      <h1>Post Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label htmlFor="type">Item Type:</label>
          <select
            id="type"
            name="type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
            className="border p-2"
          >
            <option value="product">Ürün</option>
            <option value="service">Hizmet</option>
          </select>
        </div>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2"
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            required
            className="border p-2"
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Post Item
          </button>
          <button
            type="button"
            onClick={handleOnClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Home Menu
          </button>
        </div>
      </form>

      {responseMessage && <p className="mt-4 text-red-500">{responseMessage}</p>}
    </div>
  );
}
