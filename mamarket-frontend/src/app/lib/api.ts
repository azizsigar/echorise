// src/lib/api.ts
export const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      return data.token; // Token'ı döndürüyoruz
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };
  