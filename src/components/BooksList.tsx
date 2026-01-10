// src/components/BookList.tsx
import { useEffect, useState } from "react";
import { getBooks } from "../services/booksService";

interface Book {
  id: number;
  title: string;
  author_name: string;
  published_date: string;
  description?: string;
  image_url?: string;
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        console.error("Erro ao carregar livros:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p>Carregando livros...</p>;
  if (books.length === 0) return <p>Nenhum livro encontrado.</p>;

  return (
    <div className="page-container">
      <div className="cards-grid">
        {books.map((book) => (
          <div key={book.id} className="card">
            {book.image_url && (
              <img
                src={book.image_url}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            )}
            <h2 className="card-title">{book.title}</h2>
            {book.description && <p>{book.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
