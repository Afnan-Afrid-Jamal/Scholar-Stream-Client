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
