import { Controller, Get, Post, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // 👨‍🏫 Guru lihat semua tugas yang dibuatnya
    @Get()
    @Roles('GURU')
    async getByTeacher(@Req() req) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.tasksService.getTasksByTeacher(teacherId);
    }

    // 👨‍🏫 Guru membuat tugas
    @Post('create')
    @Roles('GURU')
    async create(@Req() req, @Body() body: { studentId: string; title: string; description: string; dueDate: string }) {
        const teacherId = req.user.teacherId || req.user.userId;
        return this.tasksService.createTask(
        teacherId,
        body.studentId,
        body.title,
        body.description,
        new Date(body.dueDate),
        );
    }

    // 👨‍🎓 Siswa melihat tugas mereka
    @Get('by-student')
    @Roles('SISWA')
    async getByStudent(@Req() req) {
        const studentId = req.user.studentId || req.user.userId;
        return this.tasksService.getTasksForStudent(studentId);
    }

    // 👨‍🎓 Siswa mengumpulkan tugas
    @Patch(':id/submit')
    @Roles('SISWA')
    async submit(@Param('id') id: string) {
        return this.tasksService.submitTask(id);
    }

    // 👨‍🏫 Guru memberi nilai tugas
    @Patch(':id/grade')
    @Roles('GURU')
    async grade(@Param('id') id: string) {
        return this.tasksService.gradeTask(id);
    }

    // 🧑‍💼 Kepala sekolah melihat seluruh tugas
    @Get('all')
    @Roles('KEPALA_SEKOLAH')
    async getAll() {
        return this.tasksService.getAllTasks();
    }
}