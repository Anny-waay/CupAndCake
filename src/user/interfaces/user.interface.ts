import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty({
    description: 'user name',
    example: "Ann"
  })
  name:string;

  @ApiProperty({
    description: 'phone number',
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
    example: "aaaaa"
  })
  password:string;
}