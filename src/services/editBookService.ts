const API_URL = "http://localhost:3000/books";

export interface UpdateBookPayload {
    title?: string
    author_name?: string
    published_date?: string
    description?: string
    image_url?: string
}

export async function updateBook(
    id: number,
    data: UpdateBookPayload
): Promise<void> {
    const newData = {
            title: data.title,
            author_name: data.author_name,
            published_date: String(data.published_date),
            description: data.description,
            image_url: data.image_url,
        }
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        

        body: JSON.stringify(newData),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Erro ao editar livro")
    }
}
