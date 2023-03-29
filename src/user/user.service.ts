import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { User } from "./interfaces/user.interface";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class UserService {
  async register(userDto: UserDto): Promise<User> {
    throw new NotImplementedException();
  }

  async login(loginDto: LoginDto): Promise<User> {
    throw new NotImplementedException();
  }

  async getUser(userId: string): Promise<User> {
    throw new NotImplementedException();
  }

  async updateUser(userId: string, userDto: UserDto): Promise<User> {
    throw new NotImplementedException();
  }
}