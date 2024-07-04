import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticationsModule } from './authentications/authentications.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthenticationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
