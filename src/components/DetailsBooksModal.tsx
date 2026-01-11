import { useState } from "react";
import type { Book } from "../services/listBoooksService";
import CreateBook from "./CreateBook";
import Modal from "./Modal";


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

  if (!book) return null;

  return (
    <Modal open={open} onClose={onClose}>
      {!isEditing ? (
        <>
          <h2>{book.title}</h2>
          <h4>{book.author_name}</h4>
          <small>
            {new Date(book.published_date).toLocaleDateString()}
          </small>

          {book.image_url && (
            <img
              src={book.image_url}
              alt={book.title}
              style={{ width: "100%", marginTop: 16 }}
            />
          )}

          <p>{book.description}</p>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={() => setConfirmDelete(true)}>Excluir</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </>
      ) : (
        <CreateBook
          mode="edit"
          initialData={book}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => {
            setIsEditing(false);
            onUpdated();
            onClose();
          }}
        />
      )}

      {confirmDelete && (
        <Modal open onClose={() => setConfirmDelete(false)}>
          <h3>Confirmar exclusão</h3>
          <p>Deseja realmente excluir este livro?</p>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onDeleted}>Confirmar</button>
            <button onClick={() => setConfirmDelete(false)}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
