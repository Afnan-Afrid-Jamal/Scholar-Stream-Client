import axios from "axios";

export const uploadImage = async (imageFile) => {
  if (!imageFile) return null;

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axios.post(`${import.meta.env.VITE_IMGBB_URL}`, formData);
    return res.data.data.url;
  } catch (err) {
    console.error("Image upload failed:", err);
    return null;
  }
};

// store user data

export const registerUser = async ({ name, email, photoURL, role }) => {
  try {
    const res = await axios.post("/register", {
      name,
      email,
      photoURL,
      role,
    });

    return res.data; // { message: "...", userId: "..." } বা lastLogin update message
  } catch (err) {
    console.error(
      "Registration error:",
      err.response?.data?.message || err.message
    );
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};
