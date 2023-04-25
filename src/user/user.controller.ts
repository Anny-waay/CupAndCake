import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserUpdateDto } from "./dto/user.update.dto";
import { UserInterface } from "./interfaces/user.interface";
import { PasswordUpdateDto } from "./dto/password.update.dto";

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService : UserService) {}
  @ApiCreatedResponse({description: 'User was successfully created.', type: UserInterface})
  @ApiBadRequestResponse({description: 'Invalid user data.'})
  @Post('register')
  async register(@Body() userDto: UserDto): Promise<UserInterface> {
    return await this.userService.register(userDto);
  }

  @ApiOkResponse({description: 'User was successfully logged in.', type: UserInterface})
  @ApiBadRequestResponse({description: 'Invalid login or password.'})
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserInterface> {
    return await this.userService.login(loginDto);
  }

  @ApiOkResponse({description: 'User data was successfully received.', type: UserInterface})
  @ApiBadRequestResponse({description: 'Invalid userId.'})
  @Get()
  async getUser(@Query('userId') userId: string): Promise<UserInterface> {
    return await this.userService.getUser(userId);
  }

  @ApiOkResponse({description: 'User data was successfully updated', type: UserInterface})
  @ApiBadRequestResponse({description: 'Invalid user data.'})
  @Put()
  async updateUser(@Query('userId') userId: string, @Body() userDto: UserUpdateDto): Promise<UserInterface> {
    return await this.userService.updateUser(userId, userDto);
  }

  @ApiOkResponse({description: 'Password was successfully updated', type: UserInterface})
  @ApiBadRequestResponse({description: 'Invalid password data.'})
  @Put('update-password')
  async updatePassword(@Query('userId') userId: string, @Body() passwordDto: PasswordUpdateDto): Promise<UserInterface> {
    return await this.userService.updatePassword(userId, passwordDto);
  }
}