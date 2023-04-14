import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: 'user email',
    example: "user@mail.ru"
  })
  email:string;

  @ApiProperty({
    description: 'user password',
    example: "aaaaaa"
  })
  password:string;
}