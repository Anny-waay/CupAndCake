import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, ValidateIf } from "class-validator";

export class UserUpdateDto {
  @ApiProperty({
    description: 'user name',
    example: "Anne"
  })
  @ValidateIf(o => o.phoneNumber === null || o.phoneNumber === "")
  @IsNotEmpty()
  name:string;

  @ApiProperty({
    description: 'user phone',
    example: "88888888888"
  })
  @ValidateIf(o => o.name === null || o.name === "")
  @IsNotEmpty()
  phoneNumber:string;


}