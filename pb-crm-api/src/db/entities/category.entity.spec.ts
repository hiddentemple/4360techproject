import {CategoryEntity} from "./category.entity";
import {CategoryCode} from "@hiddentemple/api-interfaces";
import {expectError, expectNoErrors} from "../../test.utils";


describe('CategoryEntity', () => {
    let category: CategoryEntity;

    beforeEach(() => {
        category = new class extends CategoryEntity {};
    })

    it('should require a code', () => {
        const expectedMessage = 'code should not be null or undefined';
        category.description = "Valid Description";

        return expectError(category, 'code', 'isDefined', expectedMessage);
    });

    it('should accept valid codes', () => {
        category.description = "Valid Description";
        category.code = CategoryCode.PRIMARY;

        return expectNoErrors(category);
    })

    it('should reject descriptions shorter than 4 characters', () => {
        const expectedErrorMessage = 'description must be longer than or equal to 4 characters';
        category.code = CategoryCode.PRIMARY;
        category.description = '123';

        return expectError(category, 'description', 'length', expectedErrorMessage);
    });

    it('should reject descriptions longer than 25 characters', () => {
        const expectedMessage = 'description must be shorter than or equal to 25 characters';
        category.code = CategoryCode.PRIMARY;
        category.description = 'I am far too long of a string';
        expect(category.description.length >= 25);

        return expectError(category, 'description', 'length', expectedMessage);
    });

    it('should accept valid descriptions', () => {
        category.description = "Valid Description";
        category.code = CategoryCode.PRIMARY;

        return expectNoErrors(category);
    });

    it('should require a description', () => {
        category.code = CategoryCode.PRIMARY;
        const expectedMessage = 'description should not be null or undefined';

        return expectError(category, 'description', 'isDefined', expectedMessage);
    });

})