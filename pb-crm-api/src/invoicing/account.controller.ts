import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { InvoiceEntity } from '../db/entities/invoice.entity';
import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  GetInvoiceResponse, UpdateInvoiceRequest, UpdateInvoiceResponse,
} from '@hiddentemple/api-interfaces/dist/invoicing/invoice.contract';
import { InvoiceService } from './services/invoice.service';
import { AccountEntity } from '../db/entities/account.entity';
import { AccountService } from './services/account.service';
import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountResponse,
  UpdateAccountRequest, UpdateAccountResponse,
} from '@hiddentemple/api-interfaces';

@Controller('account')
export class AccountController {
  constructor(
    private invoiceService: InvoiceService,
    private accountService: AccountService
  ) {
  }

  /*
* ========================================================
* ================= ACCOUNT CONTROLLER ===================
* ========================================================
*/
  
  @Get()
  getAllAccounts(): Promise<AccountEntity[]> {
    return this.accountService.getAll();
  }
  
  @Get(':id')
  async getOneAccount(@Param() id: string): Promise<GetAccountResponse> {
    const account: AccountEntity = await this.accountService.getById(id);
    return {account}
  }
  
  @Post()
  async createAccount(@Body() accountDTO: CreateAccountRequest): Promise<CreateAccountResponse> {
    const account: AccountEntity = await this.accountService.create(accountDTO)
    return {account}
  }

  @Put(':id')
  async updateAccount(@Param() id: string, @Body() dto: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    const account: AccountEntity = await this.accountService.update(id, dto);
    return {account};
  }

  @Delete(':id')
  async deleteAccount(@Param() id: string): Promise<any> {
    return this.accountService.delete(id)
  }
  
  /*
  * ========================================================
  * ================= INVOICE CONTROLLER ===================
  * ========================================================
  */
  
  @Get('invoice')
  getAllInvoices(): Promise<InvoiceEntity[]> {
    return this.invoiceService.getAll()
  }
  
  @Get('invoice/:id')
  async getOneInvoice(@Param() id: string): Promise<GetInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.getById(id)
    return {invoice};
  }
  
  @Post('invoice')
  async createInvoice(@Body() invoiceDTO: CreateInvoiceRequest): Promise<CreateInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.create(invoiceDTO)
    return {invoice}
  }
  
  @Put('invoice/:id')
  async updateInvoice(@Param() id: string, @Body() dto: UpdateInvoiceRequest): Promise<UpdateInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.update(id, dto);
    return {invoice};
  }
  
  @Delete('invoice/:id')
  async deleteInvoice(@Param() id: string): Promise<any> {
    return this.invoiceService.delete(id)
  }
}
