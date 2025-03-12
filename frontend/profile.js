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
    console.log(response);
    const data = await response.json();

    if (!data.user || !data.user.username || !data.user.id) {
      throw new Error("Invalid user data received");
    }

    profileElement.innerHTML = `
        <h2>${data.user.username}'s Profile</h2>
        
        <p>User ID: ${data.user.id}</p>
      `;
  } catch (error) {
    console.error("Error fetching profile:", error);

    profileElement.innerHTML = `<p>Error loading profile: ${error.message}</p>`;
  }
});
