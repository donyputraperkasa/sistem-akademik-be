import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    // 👨‍🏫 Guru membuat tugas
    async createTask(teacherId: string, studentId: string, title: string, description: string, dueDate: Date) {
        return this.prisma.task.create({
        data: {
            title,
            description,
            dueDate,
            teacherId,
            studentId,
        },
        });
    }

    // 👨‍🎓 Siswa lihat semua tugas miliknya
    async getTasksForStudent(studentId: string) {
        return this.prisma.task.findMany({
        where: { studentId },
        include: {
            teacher: { include: { user: true } },
        },
        orderBy: { dueDate: 'asc' },
        });
    }

    // 👨‍🏫 Guru lihat semua tugas yang ia berikan
    async getTasksByTeacher(teacherId: string) {
        return this.prisma.task.findMany({
        where: { teacherId },
        include: {
            student: { include: { user: true } },
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    // 👨‍🎓 Siswa mengirim tugas
    async submitTask(taskId: string) {
        return this.prisma.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.SUBMITTED },
        });
    }

    // 👨‍🏫 Guru memberi nilai ke tugas
    async gradeTask(taskId: string) {
        return this.prisma.task.update({
        where: { id: taskId },
        data: { status: TaskStatus.GRADED },
        });
    }

    // 🧑‍💼 Kepala sekolah lihat semua tugas
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
