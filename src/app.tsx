import { useState } from "react";
import CreateBook from "./components/CreateBook";
import BooksList from "./views/BooksList";
import Modal from "./components/Modal";
import "./index.css";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="App">
      <div className="header-section">
        <div className="title-section">
          <h1>Livros</h1>
          <h3
            style={{ cursor: "pointer" }}
            onClick={() => setOpenModal(true)}
          >
            Novo
          </h3>
        </div>
      </div>

      {/* força recarregar lista sem reload */}
      <BooksList key={refreshKey} />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <CreateBook
          mode="create"
          onSuccess={() => {
            setOpenModal(false);
            setRefreshKey((k) => k + 1);
          }}
          onCancel={() => setOpenModal(false)} // ← adicionado para o botão Cancelar funcionar
          noOverlay={true} // ← ESSA LINHA resolve o problema de aninhamento de overlays
        />
      </Modal>
    </div>
  );
}

export default App;