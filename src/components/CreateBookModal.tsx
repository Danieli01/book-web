import { useEffect, useState } from "react";
import type { Book } from "../services/listBooksService";
import { createBook, uploadBookImage } from "../services/createBooksService";
import { updateBook } from "../services/editBookService";


interface Props {
  mode?: "create" | "edit";
  initialData?: Book;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CreateBook({
  mode = "create",
  initialData,
  onSuccess,
  onCancel,
}: Props) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && initialData) {
      setTitle(initialData.title);
      setAuthorName(initialData.author_name);
      setPublishedDate(initialData.published_date.slice(0, 10));
      setDescription(initialData.description ?? "");
      setImageUrl(initialData.image_url);
    }
  }, [isEdit, initialData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        finalImageUrl = await uploadBookImage(imageFile);
      }

      const payload = {
        title,
        author_name: authorName,
        published_date: new Date(publishedDate).toISOString(),
        description,
        image_url: finalImageUrl,
      };

      if (isEdit && initialData && initialData.id !== undefined) {
        await updateBook(initialData.id, payload);
      } else {
        await createBook(payload);
      }

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{isEdit ? "Editar Livro" : "Adicionar Livro"}</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        placeholder="Título"
        required
      />

      <input
        value={authorName}
        onChange={(e) => setAuthorName(e.currentTarget.value)}
        placeholder="Autor"
        required
      />

      <input
        type="date"
        value={publishedDate}
        onChange={(e) => setPublishedDate(e.currentTarget.value)}
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.currentTarget.value)}
        placeholder="Descrição"
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Atual"
          style={{ width: "100%", height: 150, objectFit: "cover" }}
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImageFile(e.currentTarget.files?.[0] ?? null)
        }
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
