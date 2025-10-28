import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    // 🔹 Semua tugas (Guru & Kepsek)
    async findAll() {
        return this.prisma.task.findMany({
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    // 🔹 Tugas siswa tertentu
    async findByStudent(siswaId: string) {
        return this.prisma.task.findMany({
        where: { studentId: siswaId },
        include: {
            teacher: { include: { user: true } },
        },
        orderBy: { dueDate: 'asc' },
        });
    }

    // 🔹 Detail tugas
    async findOne(id: string) {
        const task = await this.prisma.task.findUnique({
        where: { id },
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
            comments: { include: { user: true } },
        },
        });

        if (!task) throw new NotFoundException('Tugas tidak ditemukan');
        return task;
    }

    // 🔹 Guru buat tugas
    async create(guruId: string, dto: any) {
        return this.prisma.task.create({
        data: {
            title: dto.title,
            description: dto.description,
            dueDate: new Date(dto.dueDate),
            teacherId: guruId,
            studentId: dto.studentId,
            status: TaskStatus.PENDING,
        },
        });
    }

    // 🔹 Guru edit tugas
    async update(id: string, dto: any) {
        return this.prisma.task.update({
        where: { id },
        data: {
            title: dto.title,
            description: dto.description,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            status: dto.status,
        },
        });
    }

    // 🔹 Guru hapus tugas
    async remove(id: string) {
        return this.prisma.task.delete({ where: { id } });
    }

    // 🔹 Siswa upload jawaban tugas
    async submitTask(taskId: string, siswaId: string, file: Express.Multer.File) {
        if (!file) throw new Error('File tidak ditemukan');

        const uploadDir = join(__dirname, '..', '..', 'uploads');
        const uploadPath = join(uploadDir, file.originalname);

        writeFileSync(uploadPath, file.buffer);

        return this.prisma.task.update({
        where: { id: taskId, studentId: siswaId },
        data: {
            status: TaskStatus.SUBMITTED,
            filePath: `/uploads/${file.originalname}`,
            submittedAt: new Date(),
        },
        });
    }

    // 🔹 Guru memberi nilai ke tugas siswa
    async gradeTask(taskId: string, grade: number) {
        return this.prisma.task.update({
        where: { id: taskId },
        data: {
            grade,
            status: TaskStatus.GRADED,
        },
        });
    }
}