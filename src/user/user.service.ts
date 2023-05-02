import { BadRequestException, Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async getUser(userId: string): Promise<UserDto> {
    let user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id:userId
      }
    })
    return new UserDto(user)
  }
}