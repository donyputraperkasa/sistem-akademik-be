import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    // 🧑‍💼 Kepala sekolah lihat semua siswa
    @Get()
    @Roles('KEPALA_SEKOLAH')
    async getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    // 🧑‍💼 Kepala sekolah lihat detail siswa
    @Get(':id')
    @Roles('KEPALA_SEKOLAH')
    async getStudent(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }
}
