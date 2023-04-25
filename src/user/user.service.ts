import { BadRequestException, Injectable} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "../prisma.service";
import { UserUpdateDto } from "./dto/user.update.dto";
import { UserInterface } from "./interfaces/user.interface";
import { PasswordUpdateDto } from "./dto/password.update.dto";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async register(userDto: UserDto): Promise<UserInterface> {
    let user = await this.prisma.user.findUnique({
      where: {
        email: userDto.email
      }
    },)
    if (user != null)
      throw new BadRequestException('Invalid email');

    return new UserInterface(await this.prisma.user.create({
      data: {
        name : userDto.name,
        role : userDto.role,
        phone_number : userDto.phoneNumber,
        email : userDto.email,
        password : userDto.password
      }
    }))
  }

  async login(loginDto: LoginDto): Promise<UserInterface> {
    let user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email
      }
    })
    if (user == null || user.password != loginDto.password)
      throw new BadRequestException('Invalid login or password');
    return new UserInterface(user)
  }

  async getUser(userId: string): Promise<UserInterface> {
    let user = await this.prisma.user.findUnique({
      where: {
        id:userId
      }
    })
    if (user == null)
      throw new BadRequestException('Invalid userId');
    return new UserInterface(user)
  }

  async updateUser(userId: string, userDto: UserUpdateDto): Promise<UserInterface> {
    let user = null;
    if (userDto.name != null && userDto.name != "")
      user = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          name: userDto.name
        }
      });
    if (userDto.phoneNumber != null && userDto.phoneNumber != "")
      user = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          phone_number: userDto.phoneNumber
        }
      });
    return new UserInterface(user);
  }

  async updatePassword(userId: string, passwordDto: PasswordUpdateDto): Promise<UserInterface> {
    if (passwordDto.newPassword != passwordDto.repeatNewPassword)
      throw new BadRequestException('Invalid new password')

    let user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    },)

    if (user.password != passwordDto.currPassword)
      throw new BadRequestException('Invalid current password')

    return new UserInterface(await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        password: passwordDto.newPassword
      }
    }))
  }
}