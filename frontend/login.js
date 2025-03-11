document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      window.location.href = "profile.html"; // Başarıyla giriş yaptıktan sonra yönlendirme
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Bir hata oluştu, lütfen tekrar deneyin.");
  }
});
