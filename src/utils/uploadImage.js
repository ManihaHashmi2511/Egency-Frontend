import api from "./api";

// File ko backend ke through Cloudinary pe upload karta hai, permanent URL return karta hai
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  // IMPORTANT: Content-Type header manually set NAHI karna - axios FormData dekh ke
  // khud sahi boundary ke sath multipart header set kar deta hai. Manually set karne se
  // boundary miss ho jata hai aur backend file parse nahi kar pata.
  const res = await api.post("/upload", formData);

  return res.data.url;
};