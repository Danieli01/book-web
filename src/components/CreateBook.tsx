import { useEffect, useState } from "react"
import type { Book } from "../services/listBooksService"
import { createBook, uploadBookImage } from "../services/createBooksService"
import { updateBook } from "../services/editBookService"
import styles from "../styles/createBook.module.css"

interface Props {
  mode?: "create" | "edit"
  initialData?: Book
  onSuccess?: () => void
  onCancel?: () => void
  noOverlay?: boolean // ← chave para desativar overlay interno
}

export default function CreateBook({
  mode = "create",
  initialData,
  onSuccess,
  onCancel,
  noOverlay = false,
}: Props) {
  const isEdit = mode === "edit"
  const titleText = isEdit ? "Editar livro" : "Novo livro"

  const [title, setTitle] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [publishedDate, setPublishedDate] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>()

  useEffect(() => {
    if (isEdit && initialData) {
      setTitle(initialData.title)
      setAuthorName(initialData.author_name)
      setPublishedDate(initialData.published_date?.slice(0, 10) ?? "")
      setDescription(initialData.description ?? "")
      setImagePreview(initialData.image_url)
    }
  }, [isEdit, initialData])

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile)
      setImagePreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [imageFile])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      let finalImageUrl = imagePreview

      if (imageFile) {
        finalImageUrl = await uploadBookImage(imageFile)
      }

      const payload = {
        title,
        author_name: authorName,
        published_date: publishedDate ? new Date(publishedDate).toISOString() : undefined,
        description,
        image_url: finalImageUrl,
      }

      if (isEdit && initialData?.id !== undefined) {
        await updateBook(initialData.id, payload)
      } else {
        await createBook(payload)
      }

      onSuccess?.()
    } catch (err) {
      console.error("Erro ao salvar livro:", err)
      alert("Erro ao salvar o livro. Verifique os dados e tente novamente.")
    }
  }

  const formContent = (
    <form className={styles.card} onSubmit={handleSubmit}>
      <h1 className={styles.title}>{titleText}</h1>

      <div className={styles.twoColumns}>
        <div className={styles.fieldsColumn}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle((e.target as HTMLInputElement)?.value || "")}
              placeholder="Título"
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={authorName}
              onChange={(e) => setAuthorName((e.target as HTMLInputElement).value ?? "")}
              placeholder="Autor"
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="date"
              className={styles.input}
              value={publishedDate}
              onChange={(e) => setPublishedDate((e.target as HTMLInputElement).value)}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              value={description}
              onChange={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
              placeholder="Descrição"
            />
          </div>
        </div>

        <div className={styles.imageColumn}>
          <label className={styles.imageLabel}>Escolher imagem</label>
          <div className={styles.imageUploadArea}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Pré-visualização da capa"
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.placeholder}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <path d="M3 7.941c0-2.04 0-3.059.527-3.59C4.118 4 5.244 4 7.5 4h9c2.256 0 3.382 0 3.973.351C21 4.882 21 6.009 21 8.05v7.9c0 2.04 0 3.06-.527 3.59-.59.352-1.717.352-3.973.352h-9c-2.256 0-3.382 0-3.973-.351C3 19.009 3 17.99 3 15.95V7.941Z" />
                  <path d="m16 10-4 4-2-2" />
                  <circle cx="10" cy="9" r="1" />
                </svg>
                <span>Imagem da capa</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const target = e.target as HTMLInputElement
                setImageFile(target.files && target.files[0] ? target.files[0] : null)
              }}
              className={styles.fileInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.btnCancel} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className={styles.btnSave}>
          Salvar
        </button>
      </div>
    </form>
  )

  // Se noOverlay=true → renderiza só o card (usado dentro de outro Modal)
  // Se false → renderiza com overlay próprio (para uso standalone)
  return noOverlay ? formContent : <div className={styles.overlay}>{formContent}</div>
}