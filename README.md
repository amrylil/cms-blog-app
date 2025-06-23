# 🚀 Implementasi CMS untuk Blog 🚀

**Studi Kasus Kelompok 4**

---

## 👨‍💻 Tim Pengembang

Proyek ini dibangun oleh **Kelompok 4**, yang terdiri dari:

| NIM    | Nama Lengkap          |
| ------ | --------------------- |
| 222279 | **Riswanda Alfarizi** |

---

## 🛠️ Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan teknologi modern:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

---

## 📝 Deskripsi Proyek

Content Management System (CMS) untuk blog yang dikembangkan menggunakan stack MERN (MongoDB, Express.js, React, Node.js) dengan TypeScript dan Tailwind CSS untuk styling yang modern dan responsif.

## ✨ Fitur Utama

- 📱 **Responsive Design** - Tampilan yang optimal di semua perangkat
- 🔐 **Authentication System** - Sistem login dan registrasi yang aman
- ✏️ **CRUD Operations** - Create, Read, Update, Delete artikel blog
- 🎨 **Modern UI/UX** - Interface yang clean dan user-friendly
- 📊 **Admin Dashboard** - Panel admin untuk mengelola konten
- 🔍 **Search & Filter** - Pencarian dan filter artikel

## 🚀 Instalasi dan Penggunaan

### Prerequisites

- Node.js (v14 atau lebih baru)
- MongoDB
- npm atau yarn

### Langkah Instalasi

1. Clone repository

```bash
git clone [repository-url]
cd my-cms-blog
```

2. Install semua dependencies sekaligus

```bash
npm run install:all
```

_Script ini akan menginstall dependencies untuk root project, client, dan server_

3. Setup environment variables

```bash
# Di folder server, buat file .env
cd server
cp .env.example .env
# Edit file .env sesuai konfigurasi database MongoDB Anda
```

4. Jalankan aplikasi (development mode)

```bash
# Kembali ke root directory
cd ..

# Jalankan client dan server bersamaan
npm run dev
```

### Script yang Tersedia

- `npm run dev` - Menjalankan client dan server secara bersamaan
- `npm run client` - Menjalankan hanya client (frontend)
- `npm run server` - Menjalankan hanya server (backend)
- `npm run install:all` - Install dependencies untuk semua bagian proyek

## 📁 Struktur Proyek

```
my-cms-blog/
│
├── client/                 # Frontend (React)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Backend (Express.js)
│   ├── src/
│   │   ├── config/        # Konfigurasi database
│   │   ├── controllers/   # Logic bisnis
│   │   ├── dtos/          # Data Transfer Objects
│   │   ├── middleware/    # Middleware Express
│   │   ├── models/        # Model database
│   │   ├── repositories/  # Layer akses data
│   │   ├── routes/        # Route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── category.routes.ts
│   │   │   ├── comment.routes.ts
│   │   │   ├── post.routes.ts
│   │   │   └── tag.routes.ts
│   │   └── services/      # Service layer
│   ├── node_modules/
│   └── package.json
│
├── package.json           # Root package.json
├── .gitignore
└── README.md
```

## 🤝 Kontribusi

Proyek ini dikembangkan sebagai bagian dari tugas kelompok. Kontribusi dari anggota tim sangat dihargai.

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik.

---

<div align="center">
  <strong>Dibuat dengan ❤️ oleh Kelompok 4</strong>
</div>
