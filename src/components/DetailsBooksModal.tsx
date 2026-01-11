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
    <Modal open={open} onClose={onClose} className="details-modal">
      {!isEditing ? (
        <>
          {/* Cabeçalho com Voltar / Editar / Excluir */}
          <header>
            <div className="back-button">
              <span>&lt;</span>
              <button onClick={onClose}>Voltar</button>
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
              <h4>Por {book.author_name}</h4>
              <small className="published-date">
                {new Date(book.published_date).toLocaleDateString()}
              </small>
              <p>{book.description}</p>
            </div>

            {book.image_url && (
              <img src={book.image_url} alt={book.title} className="book-image" />
            )}
          </div>
        </>
      ) : (
        <CreateBook
          mode="edit"
          initialData={book}
          onCancel={() => {
            setIsEditing(false);
             onClose();           
          }}
          onSuccess={() => {
            onUpdated();
            onClose();
            setIsEditing(false);
            onClose();
            }}
          />
          )}
      {confirmDelete && (
        <Modal
          open
          onClose={() => {
            setConfirmDelete(false);
            setIsEditing(false); // Fecha o modal de edição se estiver aberto
            onClose(); // Sempre volta para a tela principal ao fechar qualquer modal
            setIsEditing(false); // Garante que o modo de edição seja fechado
            }}
            className="confirm-delete-modal"
          >
          <div className="confirm-delete">
            <h3>Confirmar exclusão</h3>
            <p>Deseja realmente excluir este livro?</p>
            <div className="actions">
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setIsEditing(false);
                  onDeleted();
                }}
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setConfirmDelete(false);
                  setIsEditing(false);
                  onClose(); // Fecha o modal de detalhes e volta para a listagem
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
