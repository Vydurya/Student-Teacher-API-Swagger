import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Dept } from "src/department";

export class CreateStudentDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ enum:Dept })
    @IsEnum(Dept)
    @IsNotEmpty()
    department: Dept;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    semester: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    division: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    age?: number;
}
