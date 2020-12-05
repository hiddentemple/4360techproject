import {define, factory} from "typeorm-seeding";
import {InvoiceEntity} from "../entities/invoice.entity";
import {InvoiceType} from "@hiddentemple/api-interfaces";
import {BillerEntity} from "../entities/biller.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {LineItemEntity} from "../entities/line-item.entity";


define(InvoiceEntity, (faker) => {
    const invoice = new InvoiceEntity();

    invoice.date = faker.date.past().toISOString()
    invoice.type = faker.random.arrayElement(Object.values(InvoiceType))
    invoice.invoiceNumber = String(faker.random.number())

    invoice.customer = factory(CustomerEntity)().create() as any;
    invoice.biller = factory(BillerEntity)().create() as any;

    const lineItemCount = faker.random.number(10);
    invoice.lineItems = factory(LineItemEntity)().createMany(lineItemCount) as any;

    return invoice;
});
