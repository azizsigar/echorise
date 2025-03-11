// api.js - API işlemleri
const API_BASE = "http://localhost:3000/api";

// Kullanıcı kayıt
async function registerUser(userName, password) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  return response.json();
}

// Kullanıcı giriş
async function loginUser(userName, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName, password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "profile.html"; // Giriş başarılıysa profile sayfasına yönlendir
  } else {
    alert(data.message);
  }
}

// Tüm itemleri getir
async function fetchItems() {
  const response = await fetch(`${API_BASE}/items`);
  const data = await response.json();
  const itemsContainer = document.getElementById("itemsContainer");
  itemsContainer.innerHTML = "";
  data.items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <img src="${item.image_url}" width="100">
        `;
    itemsContainer.appendChild(div);
  });
}

// Yeni item oluştur
async function postItem(title, description, imageFile) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", imageFile);

  const response = await fetch(`${API_BASE}/items/post`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response.json();
}

// Item silme
async function deleteItem(itemId) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/items/delete/${itemId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    alert("Ürün başarıyla silindi!");
    fetchItems(); // Listeyi güncelle
  } else {
    alert("Silme işlemi başarısız!");
  }
}

// Kullanıcı bilgisi al
async function getUser() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/auth/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (response.ok) {
    document.getElementById(
      "userInfo"
    ).innerText = `Kullanıcı: ${data.user.username}`;
  } else {
    alert("Kullanıcı bilgileri alınamadı!");
  }
}

// Kullanıcı silme
async function deleteUser() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/auth/delete/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    alert("Hesabınız başarıyla silindi!");
    localStorage.removeItem("token");
    window.location.href = "register.html";
  } else {
    alert("Hesap silme başarısız!");
  }
}
