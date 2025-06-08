# Frontend Files Proxy Challenge – Cristian Suarez

This is the frontend application for the Full Stack JavaScript Challenge. The app is built with **React**, **Create React App (CRA v5)**, **Redux Toolkit**, and **React Bootstrap**. It connects to a backend service that proxies and formats `.csv` files from an external API. This frontend allows users to view and filter the parsed data based on the file name.

---

## 🚀 Project Features

- Fetches and displays structured data from a backend REST API
- Filters records by file name using a search input
- Shows loading and error states gracefully
- Uses Redux Toolkit for state management
- Responsive UI using React Bootstrap

---

## 🧠 What Does the App Do?

This app consumes the backend endpoint `/files/data`, which returns a list of CSV-formatted records. These are displayed in a responsive table. Users can:

- See all the valid lines from all files
- Filter by a specific file name using a search bar
- Clear the filter to see all results again

Example of returned data from the backend:
```json
[
  {
    "file": "test1.csv",
    "lines": [
      { "text": "Example", "number": 123, "hex": "abcdef1234567890..." }
    ]
  }
]
```

---

## ⚙️ How to Run

### 📌 Requirements

- **Node.js version:** `v16.x`

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

This will open the app in your default browser at:
```bash
http://localhost:3000
```
Make sure your backend service is running at:
```bash
http://localhost:3001
```
