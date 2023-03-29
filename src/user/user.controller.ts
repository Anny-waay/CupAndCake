import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { User } from "./interfaces/user.interface";
import { LoginDto } from "./dto/login.dto";

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService : UserService) {}
  @Post('register')
  async register(@Body() userDto: UserDto): Promise<User> {
    return this.userService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    return this.userService.login(loginDto);
  }

  @Get(':user_id')
  async getUser(@Param('user_id') userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Put(':user_id')
  async updateUser(@Param('user_id') userId: string, @Body() userDto: UserDto): Promise<User> {
    return this.userService.updateUser(userId, userDto);
  }
}