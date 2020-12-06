import {validate} from "class-validator";
import {ValidationError} from "@nestjs/common";

export function expectError(entity: any, property: string, constraint: string, expectedMessage: string): Promise<any> {
    return validate(entity).then((errors: ValidationError[]) => {
        console.log(errors);
        expect(errors.length).toEqual(1);
        const error = errors[0];
        expect(error.property).toEqual(property)
        expect(error.constraints[constraint]).toBeDefined();
        expect(error.constraints[constraint]).toEqual(expectedMessage);
    })
}

export function expectNoErrors(entity: any): Promise<any> {
    return validate(entity).then((errors: ValidationError[]) => {
        console.log(errors)
        expect(errors.length).toEqual(0)
    });
}

export const TestTypeOrmModule = {
    // "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "database": "e2e",
    "username": "postgres",
    "password": "localpassword",
    "synchronize": true,
    "logging": true,
    "dropSchema": true
};