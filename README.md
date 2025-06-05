# 📚 Bribrioteca

## 📖 Sobre o Projeto

O **Aplicativo de Gerenciamento de Livros** é um app mobile desenvolvido em **React Native** que permite organizar e gerenciar uma coleção de livros. O app possui um design moderno com tema preto e roxo, utiliza **Redux** para gerenciar o estado e se conecta a um servidor **Node.js com MongoDB** para persistência dos dados.

O **APK** é o arquivo que permite instalar o aplicativo em dispositivos Android, funcionando em conjunto com o backend para gerenciamento em tempo real.

---

## ✨ Funcionalidades

- **Login e Cadastro**  
  Acesse o app com uma conta existente ou crie uma nova.

- **Gerenciamento de Livros**
  - Visualize a lista de livros com título, autor, ano de publicação e status de disponibilidade.
  - Adicione novos livros por meio de um formulário em modal.
  - Edite ou exclua livros existentes.
  - Visualize detalhes completos de um livro ao clicar sobre ele.

- **Confirmações via Modal**  
  Mensagens de sucesso são exibidas ao adicionar, editar ou excluir livros.

- **Design Moderno**  
  Interface elegante com tema preto e roxo, utilizando estilo **neumórfico**.

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** React Native, Redux  
- **Backend:** Node.js, MongoDB, Docker Compose  
- **Estilo:** Tema escuro (preto e roxo) com design neumórfico

---

## ⚙️ Como Configurar e Rodar

### 1. Clonar o Repositório

```bash
git clone https://github.com/Regis-Rafael/Bribrioteca.git
cd Bribrioteca
```

---

### 2. Instalar Dependências do Frontend

```bash
npm install
```

---

### 3. Configurar o Backend

O aplicativo depende de um servidor backend com endpoints para login, cadastro e gerenciamento de livros.

#### Iniciar o Backend

```bash
cd costa-final
npm install
docker-compose up -d
npm start
```

O backend estará disponível em:  
`http://localhost:8000`

#### Conectar o Frontend ao Backend

Edite os arquivos:

- `src/redux/BookSlice.js`  
- `src/redux/authSlice.js`

E atualize a URL da API:

```js
const API_URL = 'http://{IP da máquina}:8000/api';
```

> ℹ️ **Importante**: Se estiver testando em um dispositivo físico, substitua `localhost` pelo IP da sua máquina. Exemplo:  
> `http://192.168.1.x:8000/api`

---

### 4. Rodar o Frontend

Inicie o Metro Bundler:

```bash
npx react-native start
```

Rode o app em um emulador Android ou dispositivo físico:

```bash
npx react-native run-android
```

> Certifique-se de que o emulador Android está ativo ou que o dispositivo físico esteja com **depuração USB** ativada.

---

## 🎯 Finalidade do APK

A proposta é oferecer uma **biblioteca pessoal e local**, simples e eficiente para gerenciamento de livros. Como o backend não está hospedado em um servidor público, o app funciona **localmente**.

---

## 🧩 Solução de Problemas

**O app não conecta ao backend? Verifique:**

- Se o backend está rodando (`npm start`).
- Se a URL da API (`API_URL`) está correta.
- Se está usando o IP da máquina (em vez de `localhost`) ao testar em dispositivos físicos.
- Se há permissão de rede no Android (verifique `AndroidManifest.xml`).

---
## 📝 Equipe

### Feito com 💜 por [Rafael Regis](https://github.com/Regis-Rafael), [Ana Valeria](https://github.com/BomDiaSol) e [Jorge Lucas](https://github.com/jorgelucas-rm).