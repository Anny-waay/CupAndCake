import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @ApiProperty({
    description: 'user name',
    example: "Anne"
  })
  @IsNotEmpty()
  name:string;

  @ApiProperty()
  @IsNotEmpty()
  role:UserRole;

  @ApiProperty({
    description: 'user phone',
    example: "88888888888"
  })
  @IsNotEmpty()
  phoneNumber:string;

  @ApiProperty({
    description: 'user email',
    example: "user@mail.ru"
  })
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @ApiProperty({
    description: 'user password',
    example: "aaaaaa"
  })
  @IsNotEmpty()
  password:string;
}