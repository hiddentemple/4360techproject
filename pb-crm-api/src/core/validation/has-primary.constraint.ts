import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {CategoryModel, containsExactlyOnePrimary} from "@hiddentemple/api-interfaces";


@ValidatorConstraint({ name: 'hasPrimary', async: false })
export class HasPrimary implements ValidatorConstraintInterface {
    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Does not have primary category";
    }

    validate(value: CategoryModel[], validationArguments?: ValidationArguments): boolean {
        if (value === []) return true;
        return containsExactlyOnePrimary(value);
    }

}