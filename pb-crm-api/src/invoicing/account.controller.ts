import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { InvoiceEntity } from '../db/entities/invoice.entity';
import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  GetInvoiceResponse, UpdateInvoiceRequest, UpdateInvoiceResponse,
} from '@hiddentemple/api-interfaces/dist/invoicing/invoice.contract';
import { InvoiceService } from './services/invoice.service';

@Controller('account')
export class AccountController {
  constructor(private invoiceService: InvoiceService) {
  }
  
  @Get('invoice')
  getAll(): Promise<InvoiceEntity[]> {
    return this.invoiceService.getAll()
  }
  
  @Get('invoice/:id')
  async getOne(@Param() id: string): Promise<GetInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.getById(id)
    return {invoice};
  }
  
  @Post('invoice')
  async create(@Body() invoiceDTO: CreateInvoiceRequest): Promise<CreateInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.create(invoiceDTO)
    return {invoice}
  }
  
  @Put('invoice/:id')
  async update(@Param() id: string, @Body() dto: UpdateInvoiceRequest): Promise<UpdateInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.update(id, dto);
    return {invoice};
  }
  
  @Delete('invoice/:id')
  async delete(@Param() id: string): Promise<any> {
    return this.invoiceService.delete(id)
  }
  
}
