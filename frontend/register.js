document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });
    const data = await response.json();

    if (response.ok) {
      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Kayıt başarısız!");
    }
  });
