import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) {}

    // Kepala sekolah lihat semua siswa
    async getAllStudents() {
        return this.prisma.student.findMany({
        include: {
            user: true,
            grades: { include: { teacher: { include: { user: true } } } },
            attendances: true,
        },
        });
    }

    // Kepala sekolah lihat detail siswa
    async getStudentById(id: string) {
        return this.prisma.student.findUnique({
        where: { id },
        include: {
            user: true,
            grades: { include: { teacher: { include: { user: true } } } },
            attendances: true,
        },
        });
    }
}
