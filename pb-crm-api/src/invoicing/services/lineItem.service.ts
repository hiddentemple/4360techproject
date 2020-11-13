import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LineItemEntity } from '../../db/entities/line-item.entity';
import { EntityManager, Repository } from 'typeorm';
import { InvoiceEntity } from '../../db/entities/invoice.entity';
import { LineItemDTO } from '@hiddentemple/api-interfaces/dist/invoicing/line-item.dto';



@Injectable()
export class LineItemService{
  private readonly logger = new Logger(LineItemService.name)

constructor(
  @InjectRepository(LineItemEntity) private lineItemRepo: Repository<LineItemEntity>
) {}

async getById(id: string): Promise<LineItemEntity> {
    const lineItem: LineItemEntity = await this.lineItemRepo.findOne(id);
    if (!lineItem) throw new NotFoundException();
    return lineItem;
}

async create(invoice: InvoiceEntity, dto: LineItemDTO, entityManager: EntityManager): Promise<LineItemEntity> {
    this.logger.log(`Creating a new line item for invoice with id ${invoice.id} from DTO: ${JSON.stringify(dto)}`)
    const newLineItem: LineItemEntity = entityManager.create<LineItemEntity>(LineItemEntity, {...dto, invoice})
    const savedLineItem: LineItemEntity = await entityManager.save(newLineItem);
    this.logger.log(`Saved line item: ${JSON.stringify(savedLineItem)}`);
    return newLineItem
}

  async createMany(invoice: InvoiceEntity, lineItemDTOS: LineItemDTO[], entityManger: EntityManager): Promise<LineItemEntity[]> {
    if (!lineItemDTOS || lineItemDTOS === []) return [];
    this.logger.log(`Creating ${lineItemDTOS.length} line item(s): ${JSON.stringify(lineItemDTOS)}`)
    const newLineItems: LineItemEntity[] = [];
    for (const lineItemDTO of lineItemDTOS) {
      const newLineItem: LineItemEntity = await this.create(invoice, lineItemDTO, entityManger);
      newLineItems.push(newLineItem);
    }
    this.logger.log(`Created ${newLineItems.length} line item(s): ${JSON.stringify(newLineItems)}`)
    return newLineItems;
  }


  async updateMany(invoice: InvoiceEntity, lineItemDTOS: LineItemDTO[], entityManager: EntityManager): Promise<LineItemEntity[]> {
    if (!lineItemDTOS || lineItemDTOS.length === 0) return;
    this.logger.log(`Updating ${lineItemDTOS.length} line item(s) from DTO: ${JSON.stringify(lineItemDTOS)}`)
    await this.deleteMany(invoice.lineItems, entityManager);
    const updatedLineItems: LineItemEntity[] = await this.createMany(invoice, lineItemDTOS, entityManager);
    this.logger.log(`Finished ${lineItemDTOS.length} line item(s)`);
    return updatedLineItems;
  }

  async delete(id: string, entityManager: EntityManager): Promise<any> {
    this.logger.log(`Attempting delete line item with id ${id}`)
    const lineItem: LineItemEntity = await this.getById(id);
    const {affected} = await entityManager.delete(LineItemEntity, lineItem);
    if (affected !== 1) {
      const errMsg = `Failed to delete line item with id ${id}`
      this.logger.error(errMsg)
      throw new InternalServerErrorException(errMsg)
    }
    this.logger.log(`Delete line item success. ID: ${id}`)
  }

  async deleteMany(lineItems: LineItemEntity[], entityManger: EntityManager): Promise<any> {
    this.logger.log(`Attempting to delete ${lineItems.length} lineItem(s) with entities: ${JSON.stringify(lineItems)}`)
    if (!lineItems || lineItems.length === 0) return;
    for (const lineItem of lineItems) { await this.delete(lineItem.id, entityManger) }
  }
  
}
