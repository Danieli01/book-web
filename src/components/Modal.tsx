// Modal.tsx - Sem alterações, está bom
interface ModalProps {
  open: boolean
  onClose: () => void
  className?: string
  children: React.ReactNode
}

export default function Modal({
  open,
  onClose,
  className,
  children,
}: ModalProps) {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}