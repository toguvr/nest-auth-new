import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './repositories/interface/IUserRepository';
import { IHashProvider } from '@/core/providers/hash/interface/IHashProvider';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashProvider: IHashProvider,
  ) {}
  async create({ email, name, password }: CreateUserDto) {
    const checkUserExist = await this.userRepository.findByEmail(email);

    if (checkUserExist) {
      throw new ConflictException('Email já em uso!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(user: any) {
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
