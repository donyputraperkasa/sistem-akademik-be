import { Controller, Post, Get, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnouncementsController {
    constructor(private announcementsService: AnnouncementsService) {}

    // 🧑‍💼 Kepala sekolah buat pengumuman
    @Post()
    @Roles('KEPALA_SEKOLAH')
    async create(@Req() req, @Body() body: { title: string; content: string }) {
        const createdBy = req.user.id;
        return this.announcementsService.createAnnouncement(body.title, body.content, createdBy);
    }

    // 👨‍🏫 👨‍🎓 Semua role bisa lihat pengumuman
    @Get()
    async findAll() {
        return this.announcementsService.getAllAnnouncements();
    }

    // 🧑‍💼 Kepala sekolah hapus pengumuman
    @Delete(':id')
    @Roles('KEPALA_SEKOLAH')
    async delete(@Param('id') id: string) {
        return this.announcementsService.deleteAnnouncement(id);
    }
}
