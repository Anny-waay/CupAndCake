import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    description: 'user name',
    example: "Anne"
  })
  name:string;

  @ApiProperty({
    description: 'user email',
    example: "88888888888"
  })
  phoneNumber:string;
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