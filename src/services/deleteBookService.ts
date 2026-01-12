// deleteBookService.ts - Versão definitiva com melhorias
const API_URL = "http://localhost:3000/books"

export async function deleteBook(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      let errorMessage = "Erro ao excluir livro"
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch {
        errorMessage = await response.text() || errorMessage
      }
      throw new Error(`${errorMessage} (status ${response.status})`)
    }
  } catch (error) {
    console.error(`[deleteBook] Falha ao excluir livro #${id}:`, error)
    throw error
  }
}