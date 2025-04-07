"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostItemPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const router = useRouter();
  const handleOnClick = async() => {
    console.log("homomenu clicked");

router.push("/"); // Redirect to home page
}
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !image) {
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
        router.push("/profile"); // Redirect to profile after posting
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
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
          />
        </div>
        <button type="submit">Post Item</button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleOnClick}
        >
          Home Menu
        </button>
      </form>

      <div>{responseMessage && <p>{responseMessage}</p>}</div>
    </div>
  );
}
