import Modal from "./Modal"

interface ConfirmDeleteProps {
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDelete({ onConfirm, onCancel }: ConfirmDeleteProps) {
  return (
    <Modal open onClose={onCancel}>
      <h3>Confirmar exclusão</h3>
      <p>Deseja realmente excluir este livro?</p>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </Modal>
  )
}
