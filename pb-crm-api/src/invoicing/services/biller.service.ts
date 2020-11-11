import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BillerEntity } from '../../db/entities/biller.entity';
import { BillerDTO } from '@hiddentemple/api-interfaces/dist/invoicing/biller.dto';
import { InvoiceEntity } from '../../db/entities/invoice.entity';

@Injectable()
export class BillerService{
  private readonly logger = new Logger(BillerService.name)

  constructor(
    @InjectRepository(BillerEntity) private repo: Repository<BillerEntity>
  ) {}

  async getById(id: string): Promise<BillerEntity > {
    const biller: BillerEntity  = await this.repo.findOne({id});
    if (!biller) throw new NotFoundException();
    return biller;
  }

  async create(invoice: InvoiceEntity, dto: BillerDTO, entityManager: EntityManager): Promise<BillerEntity > {
    this.logger.log(`Creating a new biller for invoice with id ${invoice.id} from DTO: ${JSON.stringify(dto)}`)
    const newBiller: BillerEntity = entityManager.create<BillerEntity>(BillerEntity, {...dto})
    const savedBiller: BillerEntity  = await entityManager.save(newBiller);
    this.logger.log(`Saved biller: ${JSON.stringify(savedBiller)}`);
    return newBiller;
  }
  
}
