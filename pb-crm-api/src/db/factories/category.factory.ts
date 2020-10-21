import {CategoryEntity} from "../entities/category.entity";
import {define} from "typeorm-seeding";
import {CategoryCode} from "@hiddentemple/api-interfaces";
import FakerStatic = Faker.FakerStatic;

define(CategoryEntity, (faker: FakerStatic, context: {description: string, isPrimary?: boolean}) => {
   const category: CategoryEntity = new CategoryEntity();
   category.description = context.description;

   if (context.isPrimary) {
      category.code = CategoryCode.PRIMARY;
   } else {
      category.code = CategoryCode.USER;
   }

   return category;
});