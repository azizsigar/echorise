document.addEventListener("DOMContentLoaded", async () => {
  const itemsContainer = document.getElementById("itemsContainer");

  if (!itemsContainer) {
    console.error("Items container not found.");
    return;
  }

  // Sayfada loading göstermek için
  itemsContainer.innerHTML = "<p>Loading items...</p>";

  try {
    const response = await fetch("http://localhost:3000/api/items");

    if (!response.ok) {
      throw new Error(`Failed to fetch items (Status: ${response.status})`);
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid data format received");
    }

    // Önce içeriği temizle
    itemsContainer.innerHTML = "";

    if (data.items.length === 0) {
      itemsContainer.innerHTML = "<p>No items found.</p>";
      return;
    }

    // Ürünleri oluştur ve listeye ekle
    data.items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "item";
      itemElement.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <img src="${item.image_url}" alt="${
        item.title
      }" style="max-width: 300px; height: auto;" />
          <p><strong>Contact:</strong> ${item.contact_me || "Not available"}</p>
          <p><small>Posted on: ${new Date(
            item.created_at
          ).toLocaleString()}</small></p>
        `;

      itemsContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    itemsContainer.innerHTML = `<p>Error loading items: ${error.message}</p>`;
  }
});
