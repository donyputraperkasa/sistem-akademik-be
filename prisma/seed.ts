import { PrismaClient, Role, TaskStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// 🔧 Fungsi pembuat NIS/NIP otomatis
function generateNISN(role: Role, index: number): string {
    if (role === Role.GURU) return `G${String(index).padStart(3, '0')}`;
    if (role === Role.SISWA) return `S${String(index).padStart(3, '0')}`;
    return `A${String(index).padStart(3, '0')}`; // untuk kepala sekolah/admin
}

async function main() {
    console.log('🚀 Seeding database dimulai...\n');

    const passwordHash = await bcrypt.hash('password123', 10);

    // -----------------------------
    // 1️⃣ Buat akun pengguna
    // -----------------------------
    const kepalaSekolah = await prisma.user.upsert({
        where: { username: 'kepsek' },
        update: {},
        create: {
        nisnip: generateNISN(Role.KEPALA_SEKOLAH, 1),
        username: 'kepsek',
        password: passwordHash,
        role: Role.KEPALA_SEKOLAH,
        },
    });

    const guruUser = await prisma.user.upsert({
        where: { username: 'guru' },
        update: {},
        create: {
        nisnip: generateNISN(Role.GURU, 1),
        username: 'guru',
        password: passwordHash,
        role: Role.GURU,
        },
    });

    const guru = await prisma.teacher.upsert({
        where: { userId: guruUser.id },
        update: {},
        create: {
        userId: guruUser.id,
        mapel: 'Matematika',
        },
    });

    const siswaUser1 = await prisma.user.upsert({
        where: { username: 'siswa' },
        update: {},
        create: {
        nisnip: generateNISN(Role.SISWA, 1),
        username: 'siswa',
        password: passwordHash,
        role: Role.SISWA,
        },
    });

    const siswa1 = await prisma.student.upsert({
        where: { userId: siswaUser1.id },
        update: {},
        create: {
        userId: siswaUser1.id,
        kelas: '8A',
        },
    });

    const siswaUser2 = await prisma.user.upsert({
        where: { username: 'siswi' },
        update: {},
        create: {
        nisnip: generateNISN(Role.SISWA, 2),
        username: 'siswi',
        password: passwordHash,
        role: Role.SISWA,
        },
    });

    const siswa2 = await prisma.student.upsert({
        where: { userId: siswaUser2.id },
        update: {},
        create: {
        userId: siswaUser2.id,
        kelas: '8A',
        },
    });

    console.log('✅ User, guru, dan siswa berhasil dibuat!\n');

    // -----------------------------
    // 2️⃣ Buat tugas contoh
    // -----------------------------
    const tugas1 = await prisma.task.create({
        data: {
        title: 'Latihan Persamaan Linear',
        description: 'Kerjakan 10 soal tentang persamaan linear dua variabel.',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        teacherId: guru.id,
        studentId: siswa1.id,
        status: TaskStatus.PENDING,
        },
    });

    const tugas2 = await prisma.task.create({
        data: {
        title: 'Luas Bangun Datar',
        description: 'Buat laporan pengukuran luas berbagai bangun datar.',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        teacherId: guru.id,
        studentId: siswa2.id,
        status: TaskStatus.PENDING,
        },
    });

    console.log('📘 Contoh tugas berhasil dibuat:\n');
    console.table([
        { title: tugas1.title, untuk: 'siswa' },
        { title: tugas2.title, untuk: 'siswi' },
    ]);

    // -----------------------------
    // 3️⃣ Pengumuman awal
    // -----------------------------
    const pengumuman = await prisma.announcement.create({
        data: {
        title: 'Ujian Tengah Semester',
        content: 'UTS akan dilaksanakan minggu depan, persiapkan diri kalian!',
        createdBy: kepalaSekolah.id,
        },
    });

    console.log('\n📢 Pengumuman dibuat:', pengumuman.title);
    console.log('\n🎉 Seeding selesai dengan sukses!');
    console.log('🚀 Server siap di http://localhost:4000');
    console.log('📘 Swagger docs: http://localhost:4000/api/docs\n');
    }

main()
    .catch((e) => {
        console.error('❌ Terjadi kesalahan saat seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });