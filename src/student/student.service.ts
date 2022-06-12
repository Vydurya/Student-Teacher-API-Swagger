import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {

  students: CreateStudentDto[] = [];

  create(createStudentDto: CreateStudentDto) {
    const student = this.students.find(s=> s.id == createStudentDto.id);
      if(!student){   
        this.students.push(createStudentDto);
        return `New Student Details added`;     
      }
      else{
        return `Entered Student details already exist in file`;
    }
  }

  findAll(limit:number) {
    if(this.students.length == 0){
      return `Student file is empty`;
    }
    else{
      const limitstudent = [];
      for(let i=0; i<limit; i++){
        limitstudent.push(this.students[i])
      }
      return limitstudent;
    }
  }

  findOne(id: number) {
    const student = this.searchstudent(id)[0];
    return student;
  }

  update(id: number, update: UpdateStudentDto) {
    const [student, index] = this.searchstudent(id); 
    const updatedstudent = {...student,...update};
    this.students[index] = updatedstudent;
    return `Student details with id-${id} is updated`;
  }

  remove(id: number) {
    const index = this.searchstudent(id)[1];
    this.students.splice(index, 1);
    return `Student details with id-${id} is removed`;
  }

  searchstudent(studentid: number): [CreateStudentDto, number] {
    const studentIndex = this.students.findIndex(s=> s.id == studentid);
    const student = this.students[studentIndex];
    if(!student){
        throw new NotFoundException('Could not find the Student detail');
    }
    return [student,studentIndex];
 }
}
