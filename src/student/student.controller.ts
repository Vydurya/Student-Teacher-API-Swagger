import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiConflictResponse({ description: 'Student already exists' })
  @ApiCreatedResponse({ description: 'Student created' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
  })
  @Get()
  findAll(@Query('limit') limit:number) {
    return this.studentService.findAll(limit);
  }

  @ApiNotFoundResponse({ description: "Student doesn't exist" })
  @ApiOkResponse({ description: 'Student found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  @ApiNotFoundResponse({ description: "Student doesn't exist" })
  @ApiOkResponse({ description: 'Student detail updated' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto) {
    console.log(updateStudentDto);
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiNotFoundResponse({ description: "Student doesn't exist" })
  @ApiOkResponse({ description: 'Student deleted' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.remove(id);
  }
}
