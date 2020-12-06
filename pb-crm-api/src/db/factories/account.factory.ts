import {define, factory} from "typeorm-seeding";
import {AccountEntity} from "../entities/account.entity";
import {InvoiceEntity} from "../entities/invoice.entity";


define(AccountEntity, faker => {
    const account = new AccountEntity();

    account.name = faker.company.companyName();
    account.acctNumber = faker.random.uuid();

    const invoiceCount = faker.random.number(100)
    account.invoices = factory(InvoiceEntity)().createMany(invoiceCount) as any;
    return account;
})
