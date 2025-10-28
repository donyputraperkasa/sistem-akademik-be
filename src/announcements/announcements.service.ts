import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
    constructor(private prisma: PrismaService) {}

    async createAnnouncement(title: string, content: string, createdBy: string) {
        return this.prisma.announcement.create({
        data: {
            title,
            content,
            createdBy,
        },
        });
    }

    async getAllAnnouncements() {
    return this.prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
        createdByUser: {
            select: { username: true, role: true },
        },
        },
    });
    }

    async deleteAnnouncement(id: string) {
        return this.prisma.announcement.delete({
        where: { id },
        });
    }
}