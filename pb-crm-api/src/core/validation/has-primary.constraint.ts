import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {containsExactlyOnePrimary, HasCategory} from "@hiddentemple/api-interfaces";


@ValidatorConstraint({ name: 'hasPrimary', async: false })
export class HasPrimary implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Does not have primary category";
    }

    validate(withCategory: HasCategory[], validationArguments?: ValidationArguments): boolean {
        if ( (!withCategory) || withCategory.length === 0) return false;
        const categories = withCategory.map(model => model.category)
        return containsExactlyOnePrimary(categories);
    }

}