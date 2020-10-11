import {HasPrimary} from "./has-primary.constraint";
import {CategoryCode, CategoryModel, HasCategory} from "@hiddentemple/api-interfaces";

describe('Has Primary Constraint', () => {
    let constraint: HasPrimary;

    beforeEach(() => constraint = new HasPrimary())

    it('should return false when an empty array is passed', () => {
        expect(constraint.validate([])).toBeFalsy()
    })

    it('should return false when an undefined value is passed', () => {
        expect(constraint.validate(undefined)).toBeFalsy()
    })

    it('should return true when a primary is found (singleton)', () => {
        const primary: HasCategory = getHasCategory({ code: CategoryCode.PRIMARY, description: 'Primary' })
        const categories: HasCategory[] = [primary];
        expect(constraint.validate(categories)).toBeTruthy()
    })

    it('should return true when a primary is found (multiple)', () => {
        const primary: HasCategory = getHasCategory({ code: CategoryCode.PRIMARY, description: 'Primary' })
        const user: HasCategory = getHasCategory({ code: CategoryCode.USER, description: 'user' })
        const categories: HasCategory[] = [primary, user];
        expect(constraint.validate(categories)).toBeTruthy()
    })

    it('should return false when a primary is not found', () => {
        const user: HasCategory = getHasCategory({ code: CategoryCode.USER, description: 'user' })
        const categories: HasCategory[] = [user];
        expect(constraint.validate(categories)).toBeFalsy()
    })

});

function getHasCategory(category: CategoryModel): HasCategory {
    return { category }
}