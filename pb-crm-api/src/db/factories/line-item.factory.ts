import {define} from "typeorm-seeding";
import {LineItemEntity} from "../entities/line-item.entity";


define(LineItemEntity, (faker) => {
   const lineItem = new LineItemEntity();

   lineItem.name = faker.commerce.productName();
   lineItem.quantity = faker.random.number(10);
   lineItem.itemCategory = faker.commerce.department();
   lineItem.unitPrice = Number(faker.commerce.price());

   return lineItem;
});
