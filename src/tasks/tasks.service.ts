import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    // 👨‍🏫 Guru membuat tugas baru
    async createTask(teacherId: string, studentId: string, title: string, description: string, dueDate: Date) {
        return this.prisma.task.create({
        data: {
            teacherId,
            studentId,
            title,
            description,
            dueDate,
            status: 'PENDING',
        },
        });
    }

    // 👨‍🏫 Guru melihat semua tugas yang dia buat
    async getTasksByTeacher(teacherId: string) {
        return this.prisma.task.findMany({
        where: { teacherId },
        include: {
            student: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    // 👨‍🎓 Siswa melihat tugas mereka sendiri
    async getTasksForStudent(studentId: string) {
        return this.prisma.task.findMany({
        where: { studentId },
        include: {
            teacher: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    // 👨‍🎓 Siswa mengumpulkan tugas
    async submitTask(taskId: string) {
        return this.prisma.task.update({
        where: { id: taskId },
        data: { status: 'SUBMITTED' },
        });
    }

    // 👨‍🏫 Guru memberi nilai tugas
    async gradeTask(taskId: string) {
        return this.prisma.task.update({
        where: { id: taskId },
        data: { status: 'GRADED' },
        });
    }

    // 🧑‍💼 Kepala sekolah melihat semua tugas
    async getAllTasks() {
        return this.prisma.task.findMany({
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }
}