# 🎬 Finder

Aplicativo desenvolvido em **Ionic + Angular** que permite explorar, avaliar e salvar **filmes e séries** utilizando a API do [TMDB](https://www.themoviedb.org/). Projeto criado para a faculdade com foco em **experiência do usuário**, **funcionalidades completas** e integração com **Firebase**.

![Finder App Screenshot](src/assets/img/finder.jpg) 

---

## 📱 Funcionalidades

- 🔍 Busca por filmes e séries
- 🎭 Filtro por gêneros
- 🎞️ Detalhes completos (sinopse, elenco, trailers, onde assistir)
- ❤️ Marcar como favorito
- 👍👎 Avaliação positiva ou negativa
- 👤 Perfil do usuário com favoritos e avaliações salvas
- 🔐 Login, cadastro e autenticação via Firebase

---

## 🚀 Tecnologias Utilizadas

- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [TMDB API](https://developer.themoviedb.org/)
- [Firebase Auth + Firestore](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [HTML5 + SCSS](https://ionicframework.com/docs/theming)

---

## ⚙️ Como Rodar Localmente

1. Clone o repositório:


git clone https://github.com/SEU_USUARIO/finder-app.git
cd finder-app

2. Instale as dependências:

npm install

3. Crie o arquivo de ambiente:

Copie o arquivo de exemplo:

cp src/environments/environment.example.ts src/environments/environment.ts

Substitua as variáveis com suas credenciais do Firebase.

4. Rode a aplicação:

ionic serve


📁 Estrutura de Pastas (Simplificada)
src/
├── app/
│   ├── pages/
│   │   ├── search/           # Página principal (busca)
│   │   ├── movie-detail/     # Detalhes de filmes
│   │   ├── profile/          # Perfil do usuário
│   ├── services/             # Serviços TMDB e Firebase
├── environments/             # Configuração do ambiente


🔐 Segurança
Este projeto não inclui as credenciais reais do Firebase por segurança. Os arquivos environment.ts e environment.prod.ts estão no .gitignore. Use o arquivo de exemplo environment.example.ts para configurar o seu.

📸 Screenshots

![Busca por filmes](src/assets/img/screensshot1.jpg)
![Detalhes do filme](src/assets/img/screensshot2.jpg)
![Perfil do usuário](src/assets/img/screensshot3.jpg)

👨‍💻 Autor
Daniel de Lima Leal
Desenvolvedor Fullstack | Estudante de ADS (Unisuam)
📍 Rio de Janeiro - RJ
LinkedIn | GitHub

📄 Licença
Projeto acadêmico sem fins lucrativos. TMDB é uma marca registrada. Este aplicativo utiliza a TMDB API apenas para fins educacionais.