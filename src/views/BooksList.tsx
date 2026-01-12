import { useEffect, useState } from "react";
import { getBooks, type Book } from "../services/listBooksService";
import DetailsBooksModal from "../components/DetailsBooksModal";
import "../app.css";
import Modal from "../components/Modal";
import CreateBook from "../components/CreateBook";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);



  // Função ÚNICA para carregar a listagem
  function loadBooks(filter?: string) {
    getBooks({ title: filter }).then(setBooks);
  }

  // Carga inicial (sem filtro)
  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <div className="page-container">
        <div className="search-section">
          <input
            className="search-input"
            type="text"
            id="book-search"
            name="book-search"
            placeholder="Buscar"
            value={search}
            onChange={e => {
              const value = e.currentTarget.value;
              setSearch(value);
              loadBooks(value); // busca no backend
            }}
          />

          <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0943 15.0858H16.0005L15.5898 14.7429C16.8893 13.1659 17.7099 11.177 17.7099 8.91431C17.7099 3.977 13.7435 0 8.82094 0C3.96575 0 0 3.977 0 8.91431C0 13.8516 3.96575 17.8286 8.88906 17.8286C11.0773 17.8286 13.1285 17.0056 14.701 15.7031L15.1111 16.046V17.1429L21.9487 24L24 21.9429L17.0943 15.0858ZM8.88906 15.0858C5.47019 15.0858 2.73513 12.3428 2.73513 8.91431C2.73513 5.48569 5.47019 2.74294 8.88906 2.74294C12.3078 2.74294 15.0429 5.48569 15.0429 8.91431C15.0429 12.3428 12.3078 15.0858 8.88906 15.0858Z" fill="#444444" />
          </svg>

        </div>
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
              <div className="image-container">
                <img className="card-image" src={book.image_url} alt={book.title} />
              </div>
              <h4 className="card-title">{book.title}</h4>
              <span className="card-subtitle">{book.author_name}</span>
              <span className="card-description">{book.description}</span>
            </div>
          ))}
        </div>

        <DetailsBooksModal
          open={openDetails}
          book={selectedBook}
          onClose={() => setOpenDetails(false)}
          onUpdated={() => loadBooks(search)}
          onDeleted={() => {
            loadBooks(search);
            setOpenDetails(false);
          }}
        />
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <CreateBook
          onSuccess={() => {
            setOpenModal(false);
            loadBooks(search);
          }}
        />
      </Modal>
      </div>
    </>
  );
}
