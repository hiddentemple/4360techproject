import { Body, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../../db/entities/account.entity';
import { DeleteResult, EntityManager, getConnection, Repository, UpdateResult } from 'typeorm';
import {
    CreateContactRequest,
    CreateInvoiceRequest,
    UpdateContactRequest,
    UpdateInvoiceRequest,
} from '@hiddentemple/api-interfaces';
import { UploadService } from '../../upload/upload.service';
import {ContactEntity} from "../../db/entities/contact.entity";
import {CreateAccountRequest, UpdateAccountRequest} from "@hiddentemple/api-interfaces/dist/invoicing/account.contract";
import {InvoiceEntity} from "../../db/entities/invoice.entity";
import {EmailService} from "../../contact/services/email.service";
import {PhoneService} from "../../contact/services/phone.service";
import {AddressService} from "../../contact/services/address.service";
import {WebpageService} from "../../contact/services/webpage.service";
import { InvoiceService } from './invoice.service';
import { CustomerService } from './customer.service';

@Injectable()
export class AccountService {
    private readonly logger = new Logger(AccountService.name)

    constructor(
        @InjectRepository(AccountEntity) private accountRepo: Repository<AccountEntity>,
        private invoiceService: InvoiceService,
        private customerService: CustomerService
    ) {}


    async getAll(): Promise<AccountEntity[]> {
        return this.accountRepo.find();
    }
    

    async getById(id: string): Promise<AccountEntity> {
        const account: AccountEntity = await this.accountRepo.findOne(id);
        if (!account) {
            throw new NotFoundException();
        }
        return account;
    }

    async create(req: CreateAccountRequest): Promise<AccountEntity> {
        this.logger.log(`Creating account from request ${JSON.stringify(req)}`)
        const {account} = req;
        let savedAccount: AccountEntity = null;
        await getConnection().transaction(async (entityManager: EntityManager) => {
            const newAccount = await entityManager.create<AccountEntity>( AccountEntity, {
                acctNumber: account.acctNumber,
                customer: account.customer,
                paymentInfo: account.paymentInfo,
                notes: account.notes,
                invoices: account.invoices
            });
            savedAccount = await entityManager.save(newAccount); // Populates ID
        });
        const createdAccount = await this.getById(savedAccount.id)
        this.logger.log(`Saved new account as ${JSON.stringify(createdAccount)}`)
        return createdAccount;
    }

    async createMany(requests: CreateAccountRequest[]): Promise<AccountEntity[]>{
        let accounts: AccountEntity[] = []
        for(let req of requests){
            let account: AccountEntity = await this.create(req)
            accounts.push(account)
        }
        return accounts;
    }

    async update(id: string, dto: UpdateAccountRequest): Promise<AccountEntity> {
        this.logger.log(`Attempting to update account with id ${id} with DTO ${JSON.stringify(dto)}`)
        const account: AccountEntity = await this.getById(id);
        
        const acc: Partial<AccountEntity> = {};
        const reducer = (acc, [key, value]) => {
            if (value && value !== '' && key !== 'invoices' && key !== 'customer' && key !== 'paymentInfo') {
                return {...acc, [key]: value};
            } else {
                return acc;
            }
        };
        
        const filtered: Partial<AccountEntity> = Object.entries(dto.account).reduce(reducer, acc);
        this.logger.log(`Reduced DTO to simple properties: ${JSON.stringify(filtered)}`)

        Object.assign(account, filtered);
        // this.logger.log(`Updated account with simple properties: ${JSON.stringify(account)}`)

        await getConnection().transaction(async entityManger => {
            // let updateInvoiceReqs: UpdateInvoiceRequest[] = []
            // for(const invoice of dto.account.invoices){
            //     const tempInvoice = new CreateInvoiceRequest();
            //     tempInvoice.invoice = invoice;
            //     updateInvoiceReqs.push(tempInvoice);
            // }
            //await this.invoiceService.updateMany(account, updateInvoiceReqs)
            await this.customerService.update(account, dto.account.customer, entityManger)
            const {affected}  = await entityManger.update<AccountEntity>(AccountEntity, id, filtered)

        });

        return this.getById(id);
    }

    async delete(id: string): Promise<any> {
        this.logger.log(`Attempting delete of account with id ${JSON.stringify(id)}`)
        const account: AccountEntity = await this.getById(id);
        this.logger.log(`Found account to delete: ${JSON.stringify(account)}`)

        await getConnection().transaction(async entityManger => {
            // await this.emailService.deleteMany(contact.emails, entityManger);
            // await this.phoneService.deleteMany(contact.phones, entityManger);
            // await this.addressService.deleteMany(contact.addresses, entityManger)
            // await this.webpageService.deleteMany(contact.webpages, entityManger)
            const { affected }: DeleteResult = await entityManger.delete<AccountEntity>(AccountEntity, id);
            if (affected === 0) {
                const errMsg = `Could not delete account: ${JSON.stringify(account)}`;
                this.logger.error(errMsg);
                throw new InternalServerErrorException(errMsg);
            }
        });

        this.logger.log(`Deleted account with id ${JSON.stringify(id)}`);
    }
}

