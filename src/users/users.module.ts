import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/core/database/prisma.module';
import { IUserRepository } from './repositories/interface/IUserRepository';
import { IHashProvider } from 'src/core/providers/hash/interface/IHashProvider';
import CryptHashProvider from 'src/core/providers/hash/implementations/crypt-hash.provider';
import PrismaUserRepository from './repositories/implementations/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: IHashProvider,
      useClass: CryptHashProvider,
    },
  ],
})
export class UsersModule {}
