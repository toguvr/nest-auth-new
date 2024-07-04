import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from 'src/core/database/prisma.service';
import { AppModule } from 'src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  it('/users (POST) - create user', async () => {
    const email = 'augusto@gmail.com';
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Augusto',
        email,
        password: '123456',
      })
      .expect(200)
      .expect('Hello World!');

    const user = prisma.user.findUnique({ where: { email } });
    expect(user).toBeTruthy();
  });
});
