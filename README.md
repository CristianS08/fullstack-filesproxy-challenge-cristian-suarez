# 📁 FilesProxy Fullstack App – Cristian Suarez

This repository contains the fullstack solution for the **Files Proxy Challenge**, structured into two main directories:

- **`/frontend`**: React-based UI to visualize and filter parsed `.csv` data  
- **`/backend`**: Node.js API that proxies and formats external CSV files  

Each directory contains its own README with setup instructions, features, and implementation details.

---

## 🚀 How to Run the Fullstack App with Docker

You can launch both the frontend and backend using Docker Compose.

### 📦 Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Optionally, `nvm` for local Node.js version control (check `.nvmrc` inside subfolders)

---

### ▶️ Run with Docker Compose

From the root of the project:

```bash
docker compose up --build
```

This command will:
* Build and start the backend on port 3001
* Build and start the frontend on port 3000

Once running:
Visit the UI at: http://localhost:3000

Backend API is available at: http://localhost:3001/files/data

### 📄 More Info
📘 Frontend README

📘 Backend README