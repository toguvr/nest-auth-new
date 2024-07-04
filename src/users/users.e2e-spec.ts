import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) - create user', async () => {
    return await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Augusto',
        email: 'augusto@gmail.com',
        password: '123456',
      })
      .expect(200)
      .expect('Hello World!');
  });
});
