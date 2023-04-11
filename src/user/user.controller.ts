import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { User } from "./interfaces/user.interface";
import { LoginDto } from "./dto/login.dto";

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService : UserService) {}
  @ApiCreatedResponse({description: 'User was successfully created.'})
  @ApiBadRequestResponse({description: 'Invalid user data.'})
  @Post('register')
  async register(@Body() userDto: UserDto): Promise<User> {
    return this.userService.register(userDto);
  }

  @ApiOkResponse({description: 'User was successfully logged in.'})
  @ApiBadRequestResponse({description: 'Invalid login or password.'})
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    return this.userService.login(loginDto);
  }

  @ApiOkResponse({description: 'User data was successfully received.'})
  @Get()
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  @ApiOkResponse({description: 'User data was successfully updated'})
  @ApiBadRequestResponse({description: 'Invalid user data.'})
  @Put()
  async updateUser(@Param('userId') userId: string, @Body() userDto: UserDto): Promise<User> {
    return this.userService.updateUser(userId, userDto);
  }
}