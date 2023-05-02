import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { Session } from "../auth/session.decorator";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService : UserService) {}

  @ApiOkResponse({description: 'User data was successfully received.', type: UserDto})
  @ApiUnauthorizedResponse({description: 'User is not authorized.'})
  @UseGuards(new AuthGuard())
  @ApiCookieAuth()
  @Get()
  async getUser(@Session() session): Promise<UserDto> {
    const userId = session.userId;
    return await this.userService.getUser(userId);
  }
}