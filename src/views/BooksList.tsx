import { useEffect, useState } from "react";
import { getBooks } from "../services/listBoooksService";
import DetailsBooksModal from "../components/DetailsBooksModal";
import { deleteBook } from "../services/deleteBookService";


export interface Book {
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openDetails, setOpenDetails] = useState(false);

  async function fetchBooks() {
    setLoading(true);
    const data = await getBooks();
    setBooks(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p>Carregando livros...</p>;

  return (
    <>
      <div className="page-container">
        <div className="cards-grid">
          {books.map((book) => (
            <div
              key={book.id}
              className="card"
              onClick={() => {
                setSelectedBook(book);
                setOpenDetails(true);
              }}
            >
              {book.image_url && (
                <img
                  src={book.image_url}
                  alt={book.title}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}
              <h2>{book.title}</h2>
              <small>{book.author_name}</small>
            </div>
          ))}
        </div>
      </div>

      <DetailsBooksModal
        open={openDetails}
        book={selectedBook}
        onClose={() => setOpenDetails(false)}
        onUpdated={fetchBooks}
        onDeleted={async () => {
          if (!selectedBook) return;
          await deleteBook(selectedBook.id);
          setOpenDetails(false);
          setSelectedBook(null);
          fetchBooks();
        }}
      />
    </>
  );
}
