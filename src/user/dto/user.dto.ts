import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client"
export class UserDto {
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

  constructor(user: User) {
    this.name = user.name;
    this.phoneNumber = user.phone_number;
    this.email = user.email;
  }
}