import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode; // <- permite qualquer JSX
}

export default function Modal({ open, className, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className={`modal-overlay ${className || ""}`}>
      <div className="modal-content">
        {children}
         
      </div>
    </div>
  );
}
