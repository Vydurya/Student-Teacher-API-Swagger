import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiConflictResponse({ description: 'Teacher already exists' })
  @ApiCreatedResponse({ description: 'Teacher created' })
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
  })
  @Get()
  findAll(@Query('limit') limit:number) {
    return this.teacherService.findAll(limit);
  }

  @ApiNotFoundResponse({ description: "Teacher doesn't exist" })
  @ApiOkResponse({ description: 'Teacher found' })
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.teacherService.findOne(id);
  }

  @ApiNotFoundResponse({ description: "Teacher doesn't exist" })
  @ApiOkResponse({ description: 'Teacher detail updated' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }
 
  @ApiNotFoundResponse({ description: "Teacher doesn't exist" })
  @ApiOkResponse({ description: 'Teacher deleted' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.remove(id);
  }
}
