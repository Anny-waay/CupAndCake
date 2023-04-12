import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  name:string;
  @ApiProperty()
  @IsNotEmpty()
  role:UserRole;
  @ApiProperty()
  @IsNotEmpty()
  phoneNumber:string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email:string;
  @ApiProperty()
  @IsNotEmpty()
  password:string;
}