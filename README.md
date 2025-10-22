# 🏫 **Sistem Akademik — Backend API**
Backend API untuk Sistem Akademik Sekolah berbasis **NestJS + Prisma + PostgreSQL**

---

## 🚀 **Tech Stack**
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

---

## 🧱 **Struktur Proyek**
```
sistem-akademik-be/
├── prisma/
│   ├── schema.prisma          # Model database Prisma
│   └── seed.ts                # Data awal (kepsek, guru, siswa)
│
├── src/
│   ├── auth/                  # Modul autentikasi + JWT
│   ├── users/                 # Manajemen data pengguna
│   ├── teachers/              # Data guru
│   ├── students/              # Data siswa
│   ├── grades/                # Nilai akademik
│   ├── attendance/            # Absensi siswa
│   ├── announcements/         # Pengumuman sekolah
│   ├── tasks/                 # Tugas dari guru
│   ├── prisma/                # PrismaService
│   ├── app.module.ts          # Root module
│   ├── main.ts                # Entry point
│   └── ...
```

---

## 🧭 **Role & Fitur Utama**

### 🧑‍💼 Kepala Sekolah
| Fitur | Endpoint | Deskripsi |
|-------|-----------|-----------|
| 📢 Pengumuman | `POST /announcements` | Membuat pengumuman |
| 📢 Lihat Semua | `GET /announcements` | Melihat pengumuman |
| ❌ Hapus | `DELETE /announcements/:id` | Menghapus pengumuman |
| 👨‍🏫 Guru | `GET /teachers` | Lihat semua guru |
| 👨‍🎓 Siswa | `GET /students` | Lihat semua siswa |
| 📊 Nilai | `GET /grades/all` | Lihat seluruh nilai |
| 🕒 Absensi | `GET /attendance/all` | Lihat seluruh absensi |
| 📚 Tugas | `GET /tasks/all` | Lihat seluruh tugas |

---

### 👨‍🏫 Guru
| Fitur | Endpoint | Deskripsi |
|-------|-----------|-----------|
| 📝 Input Nilai | `POST /grades/add` | Input nilai siswa |
| 🕒 Absensi | `POST /attendance/mark` | Tandai hadir/tidak hadir |
| 📚 Buat Tugas | `POST /tasks/create` | Buat tugas untuk siswa |
| 📚 Lihat Tugas | `GET /tasks/by-teacher` | Lihat tugas yang dibuat |
| ✅ Nilai Tugas | `PATCH /tasks/:id/grade` | Tandai tugas sebagai dinilai |

---

### 👨‍🎓 Siswa
| Fitur | Endpoint | Deskripsi |
|-------|-----------|-----------|
| 📊 Nilai | `GET /grades/me` | Lihat nilai pribadi |
| 🕒 Absensi | `GET /attendance/me` | Lihat absensi pribadi |
| 📚 Lihat Tugas | `GET /tasks/by-student` | Lihat semua tugas |
| 📬 Submit Tugas | `PATCH /tasks/:id/submit` | Kirim tugas |
| 📢 Pengumuman | `GET /announcements` | Lihat pengumuman sekolah |

---

## 🔐 **Autentikasi & Role-Based Access**

**Login Endpoint**
```bash
POST /auth/login
```
**Request Body**
```json
{
  "username": "kepsek",
  "password": "admin123"
}
```

**Response**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "username": "kepsek",
    "role": "KEPALA_SEKOLAH"
  }
}
```

Gunakan JWT di setiap request:
```bash
Authorization: Bearer <jwt_token>
```

---

## 🧪 **Menjalankan di Local**

### 1️⃣ Clone & Install
```bash
git clone https://github.com/<username>/sistem-akademik-be.git
cd sistem-akademik-be
npm install
```

### 2️⃣ Konfigurasi `.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sistem_akademik"
JWT_SECRET="supersecretkey"
PORT=4000
```

### 3️⃣ Prisma & Seed
```bash
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

### 4️⃣ Jalankan Server
```bash
npm run start:dev
```
Server berjalan di:  
👉 **http://localhost:4000**

---

## 🧭 **Preview API Flow**
```text
Login → Dapatkan JWT → Akses Endpoint Sesuai Role
```

---

## 🧱 **Akun Default**
| Role | Username | Password |
|------|-----------|-----------|
| 🧑‍💼 Kepala Sekolah | kepsek | admin123 |
| 👨‍🏫 Guru | guru1 | admin123 |
| 👨‍🎓 Siswa | siswa1 | admin123 |

---

## 🌐 **Deployment Ready**
✅ Support: **Render**, **Railway**, **Fly.io**  
🔒 Aman & siap untuk production.

---

## ✨ **Author**
**👨‍💻 Dony Putra Perkasa**  
Fullstack Web Developer — Sistem Akademik (NestJS + Prisma + PostgreSQL)

---

## 📄 **License**
Distributed under the MIT License. See `LICENSE` for more information.