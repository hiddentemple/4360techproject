import {HasPrimary} from "./has-primary.constraint";
import {Categorized, CategoryCode, CategoryModel} from "@hiddentemple/api-interfaces";

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
        const primary: Categorized = getHasCategory({ code: CategoryCode.PRIMARY, description: 'Primary' })
        const categories: Categorized[] = [primary];
        expect(constraint.validate(categories)).toBeTruthy()
    })

    it('should return true when a primary is found (multiple)', () => {
        const primary: Categorized= getHasCategory({ code: CategoryCode.PRIMARY, description: 'Primary' })
        const user: Categorized= getHasCategory({ code: CategoryCode.USER, description: 'user' })
        const categories: Categorized[] = [primary, user];
        expect(constraint.validate(categories)).toBeTruthy()
    })

    it('should return false when a primary is not found', () => {
        const user: Categorized= getHasCategory({ code: CategoryCode.USER, description: 'user' })
        const categories: Categorized[] = [user];
        expect(constraint.validate(categories)).toBeFalsy()
    })

});

function getHasCategory({code, description}: {code: CategoryCode, description: string}): Categorized {
    return { category: { id: '', code, description}, }
}