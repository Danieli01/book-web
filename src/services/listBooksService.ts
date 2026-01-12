const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Book {
  id?: number;
  title: string;
  author_name: string;
  published_date: string;
  description?: string;
  image_url?: string;
}

export async function getBooks(params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  title?: string;
  author_name?: string;
}) {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.sortBy) query.append("sortBy", params.sortBy);
  if (params?.order) query.append("order", params.order);
  if (params?.title) query.append("title", params.title);
  if (params?.author_name) query.append("author_name", params.author_name);

  const res = await fetch(`${API_URL}/books?${query.toString()}`);
  if (!res.ok) throw new Error("Erro ao buscar livros");
  const data = await res.json();
  return data.data.data;
}

