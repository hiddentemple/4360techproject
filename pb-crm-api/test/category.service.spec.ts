import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import request from "supertest";

describe('CategoryController (e2e)', () => {
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
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/api/categories')
            .expect(200)
            .expect(res => console.log(res));
    });
});