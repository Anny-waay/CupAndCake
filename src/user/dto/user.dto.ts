import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  name:string;
  @ApiProperty()
  phoneNumber:string;
  @ApiProperty()
  email:string;
  @ApiProperty()
  password:string;
}