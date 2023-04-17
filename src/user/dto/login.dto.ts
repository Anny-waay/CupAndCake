import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: 'user email',
    example: "user@mail.ru"
  })
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email:string;

  @ApiProperty({
    description: 'user password',
    example: "aaaaaa"
  })
  @ApiProperty()
  @IsNotEmpty()
  password:string;
}