import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
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