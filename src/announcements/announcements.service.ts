import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
    constructor(private prisma: PrismaService) {}

    // Kepala sekolah membuat pengumuman
    async createAnnouncement(title: string, content: string, createdBy: string) {
        return this.prisma.announcement.create({
        data: {
            title,
            content,
            createdBy,
        },
        });
    }

    // Semua role bisa melihat pengumuman
    async getAllAnnouncements() {
        return this.prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' },
        });
    }

    // Kepala sekolah menghapus pengumuman
    async deleteAnnouncement(id: string) {
        return this.prisma.announcement.delete({
        where: { id },
        });
    }
}
