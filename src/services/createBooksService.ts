// src/services/booksService.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function uploadBookImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/books/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.imageUrl;
}

export async function createBook(data: any) {
  const response = await api.post("/books", data);
  return response.data;
}
