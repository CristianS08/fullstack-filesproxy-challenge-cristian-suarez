# 🧩 Backend – Files Proxy Challenge (Cristian Suarez)

This is the **backend API** for the Full Stack JavaScript Challenge.  
It acts as a proxy and formatter for CSV files served by a remote API.  
The service fetches, parses, validates, and exposes structured JSON data from `.csv` files.

---

## 📦 Project Overview

This backend service:

- Retrieves a **list of available CSV files** from an external API
- Fetches and **parses the content** of each CSV file
- **Validates** each line, ensuring correct `text`, `number`, and `hex` fields
- Serves structured data via a REST API to be consumed by a frontend
- Optionally allows **filtering by file name**

---

## 🚀 Endpoints

| Method | Endpoint          | Description                                 |
|--------|-------------------|---------------------------------------------|
| GET    | `/files/list`     | Returns an array of all available file names |
| GET    | `/files/data`     | Returns parsed and validated data from all files |
| GET    | `/files/data?fileName=test2.csv` | Returns parsed data from a specific file |

---

## ⚙️ How to Run

### 📌 Requirements

- **Node.js version:** `v14.21.3`

> If you're using [nvm](https://github.com/nvm-sh/nvm), you can run:
>
> ```bash
> nvm use
> ```
>
> This project includes an `.nvmrc` file that specifies the correct Node.js version.

### 📦 1. Install dependencies

Make sure you are in the root folder of the project, then run:

```bash
npm install
```

### ▶️ 2. Start the development server

Once installed, start the project with:
```bash
npm run start
```

By default, the server will run on:
```bash
http://localhost:3001
```
