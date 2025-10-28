import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Req,
    UseGuards,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    // 🟢 Guru & Kepsek lihat semua tugas
    @Get()
    @Roles(Role.GURU, Role.KEPALA_SEKOLAH)
    findAll() {
        return this.tasksService.findAll();
    }

    // 🟡 Siswa lihat tugasnya sendiri
    @Get('student')
    @Roles(Role.SISWA)
    findForStudent(@Req() req) {
        const siswaId = req.user.id;
        return this.tasksService.findByStudent(siswaId);
    }

    // 🟢 Semua role bisa lihat detail tugas
    @Get(':id')
    @Roles(Role.SISWA, Role.GURU, Role.KEPALA_SEKOLAH)
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    // 🟢 Guru membuat tugas
    @Post()
    @Roles(Role.GURU)
    create(@Req() req, @Body() dto: any) {
        const guruId = req.user.id;
        return this.tasksService.create(guruId, dto);
    }

    // 🟢 Guru update tugas
    @Patch(':id')
    @Roles(Role.GURU)
    update(@Param('id') id: string, @Body() dto: any) {
        return this.tasksService.update(id, dto);
    }

    // 🔵 Guru beri nilai ke tugas
    @Patch(':id/grade')
    @Roles(Role.GURU)
    gradeTask(@Param('id') id: string, @Body() body: { grade: number }) {
        return this.tasksService.gradeTask(id, body.grade);
    }

    // 🟡 Siswa upload jawaban
    @Post(':id/submit')
    @Roles(Role.SISWA)
    @UseInterceptors(FileInterceptor('file'))
    submitTask(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Req() req,
    ) {
        const siswaId = req.user.id;
        return this.tasksService.submitTask(id, siswaId, file);
    }

    // 🔴 Guru hapus tugas
    @Delete(':id')
    @Roles(Role.GURU)
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}