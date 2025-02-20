import axios from "axios";

const API_BASE_URL = "https://mini-blog-be-nine.vercel.app/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post("/login", { email, password });
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (name, phone, email, password) => {
  try {
    const { data } = await api.post("/register", {
      name,
      phone,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get("/profile");
    return data;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
};

export const logoutUser = () => localStorage.removeItem("token");

export const updateUserProfile = async (data) => {
  try {
    const { data: updatedData } = await api.put("/profile", data);
    return updatedData;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
};

export const fetchPosts = async (page = 1, perPage = 10) => {
  try {
    const { data } = await api.get(`/posts?page=${page}&per_page=${perPage}`);
    return data;
  } catch (error) {
    console.error("Fetch posts error:", error);
    return { posts: [], total: 0, pages: 0, current_page: 1 };
  }
};

export const getPostById = async (id) => {
  try {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  } catch (error) {
    console.error("Fetch post error:", error);
    return null;
  }
};

export const createPost = async (formData) => {
  try {
    const { data, status } = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Ensure correct content type
    });
    return { data, status };
  } catch (error) {
    console.error("Create post error:", error);
    throw error;
  }
};

export const updatePost = async (id, formData) => {
  try {
    const { data } = await api.put(`/posts/${id}`, formData);
    return data;
  } catch (error) {
    console.error("Update post error:", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error("Delete post error:", error);
    throw error;
  }
};
