import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Dept } from "src/department";

export class CreateTeacherDto {
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
    YOE: number;//Year of Entry

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    age?: number;
}