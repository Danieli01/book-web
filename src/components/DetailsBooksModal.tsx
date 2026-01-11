import { useState } from "react";
import type { Book } from "../services/listBoooksService";
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

  if (!book) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="details-modal">
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
              <button onClick={() => setIsEditing(true)} style={{ border: "none", background: "none", cursor: "pointer" }}>Editar</button>
              <button onClick={() => setConfirmDelete(true)} style={{ border: "none", background: "none", cursor: "pointer" }}>Excluir</button>
              <div style={{ backgroundColor: 'white', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: "bold", fontSize: 20, alignSelf: "center", marginLeft: 8 }}>&lt;</span>
                <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer" }}>Voltar</button>
              </div>
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
          <Modal open onClose={() => setConfirmDelete(false)} >
            <h3>Tem certeza?</h3>
            <p>Ao excluir este livro não será possível recuperá-lo. Realmente deseja excluí-lo?</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={onDeleted}>Excluir</button>
              <button onClick={() => setConfirmDelete(false)}>
                Cancelar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </Modal>
  );
}
