// src/pages/register.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import { register } from "@/lib/api";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const success = await register(username, password);
      if (success) {
        router.push("/login");
      } else {
        setErrorMessage("Kayıt başarısız.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Kayıt sırasında hata oluştu.");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Şifre:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Kayıt Ol
        </button>
      </form>
      <p className="mt-4">
        Zaten hesabınız var mı? <a href="/login" className="text-blue-600">Giriş Yap</a>
      </p>
    </div>
  );
};

export default RegisterPage;
