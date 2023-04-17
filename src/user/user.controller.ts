import { BadRequestException, Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { User } from "./interfaces/user.interface";
import { LoginDto } from "./dto/login.dto";
import { UserUpdateDto } from "./dto/user.update.dto";

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService : UserService) {}
  @ApiCreatedResponse({description: 'User was successfully created.', type: User})
  @ApiBadRequestResponse({description: 'Invalid user data.'})
  @Post('register')
  async register(@Body() userDto: UserDto): Promise<User> {
    let user = await this.userService.register(userDto);
    if (user == null)
      throw new BadRequestException();
    return user;
  }

  @ApiOkResponse({description: 'User was successfully logged in.', type: User})
  @ApiBadRequestResponse({description: 'Invalid login or password.'})
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User> {
    let user = await this.userService.login(loginDto);
    if (user == null)
      throw new BadRequestException();
    return user;
  }

  @ApiOkResponse({description: 'User data was successfully received.', type: User})
  @ApiBadRequestResponse({description: 'Invalid userId.'})
  @Get()
  async getUser(@Param('userId') userId: string): Promise<User> {
    let user = await this.userService.getUser(userId);
    if (user == null)
      throw new BadRequestException();
    return user;
  }

  @ApiOkResponse({description: 'User data was successfully updated', type: User})
  @ApiBadRequestResponse({description: 'Invalid user data.'})
  @Put()
  async updateUser(@Param('userId') userId: string, @Body() userDto: UserUpdateDto): Promise<User> {
    let user = await this.userService.updateUser(userId, userDto);
    if (user == null)
      throw new BadRequestException();
    return user;
  }
}