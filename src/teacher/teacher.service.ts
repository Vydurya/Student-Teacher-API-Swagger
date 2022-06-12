import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {

  teachers: CreateTeacherDto[] = [];

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teachers.find(s=> s.id == createTeacherDto.id);
    if(!teacher){   
        this.teachers.push(createTeacherDto);
        return `New Teacher Details added`;     
    }
    else{
        return `Entered Teacher details already exist in file`;
    }
  }

  findAll(limit:number) {
    if(this.teachers.length == 0){
      return `Teacher file is empty`;
    }
    else{
      const limitteacher = [];
      for(let i=0; i<limit; i++){
        limitteacher.push(this.teachers[i])
      }
      return limitteacher;
    }
  }

  findOne(id: number) {
    const teacher = this.searchteacher(id)[0];
    return teacher;
  }

  update(id: number, update: UpdateTeacherDto) {
    const [teacher, index] = this.searchteacher(id); 
    const updatedteacher = {...teacher,...update};
    this.teachers[index] = updatedteacher;
    return `Teacher details with id-${id} is updated`;
  }

  remove(id: number) {
    const index = this.searchteacher(id)[1];
    this.teachers.splice(index, 1);
    return `Teacher details with id-${id} is removed`;
  }

  searchteacher(id: number): [CreateTeacherDto, number] {
    const teacherIndex = this.teachers.findIndex(s=> s.id == id);
    const teacher = this.teachers[teacherIndex];
    if(!teacher){
        throw new NotFoundException('Could not find the teacher detail');
    }
    return [teacher,teacherIndex];
}
}
