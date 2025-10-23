import { PrismaClient, Role, AttendanceStatus, TaskStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Hapus data lama (optional, hanya untuk development)
    await prisma.task.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.grade.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();

    // Password hash
    const password = await bcrypt.hash('admin123', 10);

    // 🧑‍💼 Kepala Sekolah
    const kepsek = await prisma.user.create({
        data: {
        nisnip: '0001',
        username: 'kepsek',
        password,
        role: Role.KEPALA_SEKOLAH,
        },
    });

    // 👨‍🏫 Guru 1
    const guru1User = await prisma.user.create({
        data: {
        nisnip: 'G001',
        username: 'masdony',
        password,
        role: Role.GURU,
        },
    });
    const guru1 = await prisma.teacher.create({
        data: {
        userId: guru1User.id,
        mapel: 'Matematika',
        },
    });

    // 👨‍🏫 Guru 2
    const guru2User = await prisma.user.create({
        data: {
        nisnip: 'G002',
        username: 'dekadera',
        password,
        role: Role.GURU,
        },
    });
    const guru2 = await prisma.teacher.create({
        data: {
        userId: guru2User.id,
        mapel: 'Bahasa Indonesia',
        },
    });

    // 👨‍🎓 Siswa 1
    const siswa1User = await prisma.user.create({
        data: {
        nisnip: 'S001',
        username: 'siswa_andi',
        password,
        role: Role.SISWA,
        },
    });
    const siswa1 = await prisma.student.create({
        data: {
        userId: siswa1User.id,
        kelas: '9A',
        },
    });

    // 👨‍🎓 Siswa 2
    const siswa2User = await prisma.user.create({
        data: {
        nisnip: 'S002',
        username: 'siswa_budi',
        password,
        role: Role.SISWA,
        },
    });
    const siswa2 = await prisma.student.create({
        data: {
        userId: siswa2User.id,
        kelas: '9A',
        },
    });

    // 👨‍🎓 Siswa 3
    const siswa3User = await prisma.user.create({
        data: {
        nisnip: 'S003',
        username: 'siswa_cici',
        password,
        role: Role.SISWA,
        },
    });
    const siswa3 = await prisma.student.create({
        data: {
        userId: siswa3User.id,
        kelas: '9B',
        },
    });

    // 📚 Tugas-tugas contoh
    await prisma.task.createMany({
        data: [
        {
            title: 'Tugas Aljabar',
            description: 'Kerjakan soal di buku halaman 32',
            dueDate: new Date('2025-10-30'),
            teacherId: guru1.id,
            studentId: siswa1.id,
            status: TaskStatus.PENDING,
        },
        {
            title: 'Menulis Puisi',
            description: 'Buat puisi bertema kemerdekaan minimal 3 bait',
            dueDate: new Date('2025-10-25'),
            teacherId: guru2.id,
            studentId: siswa2.id,
            status: TaskStatus.SUBMITTED,
        },
        {
            title: 'Tugas Statistik',
            description: 'Analisis data nilai ujian matematika kelas 9A',
            dueDate: new Date('2025-11-02'),
            teacherId: guru1.id,
            studentId: siswa3.id,
            status: TaskStatus.GRADED,
        },
        ],
    });

    console.log('✅ Seeding selesai!');
    }

    main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Error during seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
