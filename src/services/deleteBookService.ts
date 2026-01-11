const API_URL = "http://localhost:3000/books";

export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Erro ao excluir livro");
  }
}
