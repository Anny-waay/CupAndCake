import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "@prisma/client";

export class UserUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  name:string;
  @ApiProperty()
  @IsNotEmpty()
  password:string;
}