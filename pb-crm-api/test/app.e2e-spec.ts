import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import request from 'supertest';
import {AppModule} from './../src/app.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryController} from "../src/contact/controllers/category.controller";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
              "type": "postgres",
              "host": "localhost",
              "port": 5432,
              "database": "e2e",
              "username": "postgres",
              "password": "localpassword",
              "entities": ["dist/db/entities/**/*.entity{.js, .ts}"],
              "synchronize": true,
              "logging": true,
            }
        ),
      ],
        controllers: [CategoryController]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
      return request(app.getHttpServer())
          .get('api/category')
          .expect(200)
          .expect(res => console.log(res));
  });
});
