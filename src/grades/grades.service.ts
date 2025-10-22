import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GradesService {
    constructor(private prisma: PrismaService) {}

    // 👨‍🏫 Guru menambahkan nilai untuk siswa
    async addGrade(teacherId: string, studentId: string, subject: string, value: number) {
        return this.prisma.grade.create({
        data: {
            subject,
            value,
            teacherId,
            studentId,
        },
        });
    }

    // 👨‍🎓 Siswa melihat semua nilainya
    async getGradesByStudent(studentId: string) {
        return this.prisma.grade.findMany({
        where: { studentId },
        include: {
            teacher: {
            include: { user: true },
            },
        },
        });
    }

    // 👩‍💼 Kepala sekolah melihat seluruh nilai
    async getAllGrades() {
        return this.prisma.grade.findMany({
        include: {
            teacher: { include: { user: true } },
            student: { include: { user: true } },
        },
        });
    }
    }
