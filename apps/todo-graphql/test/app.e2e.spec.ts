import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// @ts-ignore
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

jest.mock('jwks-rsa', () => {
  return {
    passportJwtSecret: jest.fn().mockImplementation(() => 'mockedSecret'),
  };
});

const prismaMock = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
};
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.CLERK_JWSK_URL = 'test';
    process.env.CLERK_ISSUER = 'test';
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
