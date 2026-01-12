// DetailsBooksModal.tsx - Versão definitiva com integração de delete e tratamento de erros
import { useState } from "react";
import type { Book } from "../services/listBooksService";
import { deleteBook } from "../services/deleteBookService";
import CreateBook from "./CreateBook";
import Modal from "./Modal";
import "../styles/modal.css";

interface Props {
  open: boolean;
  book: Book | null;
  onClose: () => void;
  onUpdated: () => void;
  onDeleted: () => void;
}

export default function DetailsBooksModal({
  open,
  book,
  onClose,
  onUpdated,
  onDeleted,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (!book) return null;

  function handleCloseAll() {
    setIsEditing(false);
    setConfirmDelete(false);
    setDeleteError(null);
    onClose();
  }

  async function handleConfirmDelete() {
    if (!book?.id) return;

    try {
      await deleteBook(book.id);
      onDeleted();
      handleCloseAll();
    } catch (err: any) {
      setDeleteError(err.message || "Erro ao excluir o livro");
    }
  }

  return (
    <Modal open={open} onClose={handleCloseAll} className="details-modal">
      {!isEditing ? (
        <>
          <header>
            <div className="back-button">
              <span>&lt;</span>
              <button onClick={handleCloseAll}>Voltar</button>
            </div>
            <div>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button className="delete" onClick={() => setConfirmDelete(true)}>
                Excluir
              </button>
            </div>
          </header>

          <div className="book-content">
            <div className="book-text">
              <h2>{book.title}</h2>
              <div className="author-date">
                <span>Por {book.author_name}</span>
                <span className="published-date">
                  Publicado em{" "}
                  {new Date(book.published_date).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p>{book.description}</p>
            </div>

            {book.image_url && (
              <img
                src={book.image_url}
                alt={book.title}
                className="book-image"
              />
            )}
          </div>
        </>
      ) : (
        <CreateBook
          mode="edit"
          initialData={book}
          onCancel={handleCloseAll}
          onSuccess={() => {
            onUpdated();
            handleCloseAll();
          }}
          noOverlay={true}
        />
      )}

      {confirmDelete && (
        <Modal
          open
          onClose={handleCloseAll}
          className="confirm-delete-modal"
        >
          <div className="confirm-delete">
            <h3>Tem certeza?</h3>
            <p>Ao excluir este livro não será possível recuperá-lo. Realmente deseja excluí-lo?</p>
            {deleteError && <p className="error">{deleteError}</p>}
            <div className="actions">
              <button onClick={handleCloseAll}>Cancelar</button>
              <button onClick={handleConfirmDelete}>Excluir</button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
