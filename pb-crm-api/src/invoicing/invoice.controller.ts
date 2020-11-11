import { Body, Controller, Get, Logger, Param, Post, Req } from '@nestjs/common';
import { GetAllContactsResponse } from '@hiddentemple/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../db/entities/invoice.entity';
import { Repository } from 'typeorm';
import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  GetInvoiceResponse,
} from '@hiddentemple/api-interfaces/dist/invoicing/invoice.contract';
import { InvoiceService } from './services/invoice.service';

@Controller('invoice')
export class InvoiceController {
  private readonly logger = new Logger("InvoiceLog:")
  
  constructor(private invoiceService: InvoiceService) {
  }
  
  @Get()
  getAll(): Promise<InvoiceEntity[]> {
    return this.invoiceService.getAll()
  }
  
  @Get(':id')
  async getOne(@Param() id: string): Promise<GetInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.getById(id)
    return {invoice};
  }
  
  @Post()
  async create(@Body() invoiceDTO: CreateInvoiceRequest): Promise<CreateInvoiceResponse> {
    const invoice: InvoiceEntity = await this.invoiceService.create(invoiceDTO)
    return {invoice}
  }
  
}
