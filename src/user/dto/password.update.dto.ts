import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PasswordUpdateDto {
  @ApiProperty({
    description: 'current password',
    example: "Anne123"
  })
  @IsNotEmpty()
  currPassword: string;

  @ApiProperty({
    description: 'new password',
    example: "Anne123"
  })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    description: 'repeat new password',
    example: "Anne123"
  })
  @IsNotEmpty()
  repeatNewPassword: string;
}