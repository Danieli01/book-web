
### README.md - Frontend

```markdown
# 📚 Gerenciador de Livros - Frontend

Interface moderna e responsiva para gerenciamento de catálogo de livros, com busca em tempo real, visualização detalhada, criação, edição e exclusão.

## 🚀 Tecnologias Utilizadas

- **React** + **TypeScript** ⚛️
- **Vite** (ou Create React App) ⚡
- **CSS** 🎨
- **Axios** / **Fetch** para chamadas à API 🌐
- **Modal** customizado 🪟
- **Gerenciamento de estado**: 
    **React Hooks** (useState e useEffect) 🔄

## ✨ Funcionalidades Principais

- 📖 Listagem de livros em grade (cards)
- 🔍 Busca em tempo real por título
- 👁️ Visualização detalhada do livro em modal
- ✏️ Criação e edição de livros com upload de capa e preview
- 🗑️ Confirmação de exclusão com modal bonito
- ♻️ Atualização automática da lista após alterações

## 🛠️ Instalação e Execução

```bash
# 1. Clone o repositório
git clone git@github.com:Danieli01/book-web.git
cd books-app-frontend

# 2. Instale as dependências
npm install

# 3. Configure a URL da API
# Crie/editar .env na raiz:
VITE_API_URL=http://localhost:3000

# 4. Inicie o projeto
npm run dev
```

## 🔗 Integração com Backend

Certifique-se de que o backend está rodando em http://localhost:3000  
A variável `VITE_API_URL` deve apontar para a URL correta da API.