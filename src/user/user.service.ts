import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "../prisma.service";
import { User } from "@prisma/client";
import { UserUpdateDto } from "./dto/user.update.dto";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async register(userDto: UserDto): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: {
        email: userDto.email
      }
    },)
    if (user != null)
      return null
    return this.prisma.user.create({
      data: {
        name : userDto.name,
        role : userDto.role,
        phone_number : userDto.phoneNumber,
        email : userDto.email,
        password : userDto.password
      }
    });
  }

  async login(loginDto: LoginDto): Promise<User> {
    let user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email
      }
    },)
    if (user == null || user.password != loginDto.password)
      return null;
    return user;
  }

  async getUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId
      }
    },)
  }

  async updateUser(userId: string, userDto: UserUpdateDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: userDto.name,
        password: userDto.password
      }
    })
  }
}