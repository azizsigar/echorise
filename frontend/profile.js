document.addEventListener("DOMContentLoaded", async () => {
  const profileElement = document.getElementById("profile");

  if (!profileElement) {
    console.error("Profile element not found.");
    return;
  }

  // Check if localStorage is available
  let token;
  try {
    token = localStorage.getItem("token");
  } catch (err) {
    console.error("Error accessing localStorage:", err);
    profileElement.innerHTML =
      "<p>Error loading profile. Please check browser settings.</p>";
    return;
  }

  if (!token) {
    profileElement.innerHTML = "<p>Please log in to view your profile.</p>";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load profile (Status: ${response.status})`);
    }

    const data = await response.json();

    if (!data.user || !data.user.username || !data.user.id) {
      throw new Error("Invalid user data received");
    }

    // Display user profile information
    profileElement.innerHTML = `
        <h2>${data.user.username}'s Profile</h2>
        <p>User ID: ${data.user.id}</p>
    `;

    // Check if the user has posted items
    if (data.items && data.items.length > 0) {
      // Generate HTML for all items
      const itemsList = data.items
        .map((item) => {
          // Here we're logging the item's title, description, and image_url
          console.log(item.title);
          console.log(item.description);
          console.log(item.image_url);

          return `
          <div class="item">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <img src="${item.image_url}" alt="${
            item.title
          }" style="max-width: 300px; height: auto;" />
            <p><small>Posted on: ${new Date(
              item.created_at
            ).toLocaleString()}</small></p>
          </div>
        `;
        })
        .join(""); // This joins all the HTML items into a single string

      profileElement.innerHTML += `
        <h3>Your Items:</h3>
        <div class="items-list">${itemsList}</div>
      `;
    } else {
      profileElement.innerHTML += "<p>You have no items posted.</p>";
    }

    console.log(data); // You can keep this to inspect the entire data object
    console.log(data.items); // This will show the items array
  } catch (error) {
    console.error("Error fetching profile:", error);
    profileElement.innerHTML = `<p>Error loading profile: ${error.message}</p>`;
  }
});
