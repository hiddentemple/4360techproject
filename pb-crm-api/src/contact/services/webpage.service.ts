import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebpageEntity } from '../../db/entities/webpage.entity';
import { EntityManager, Repository } from 'typeorm';
import { ContactEntity } from '../../db/entities/contact.entity';
import { WebpageDTO } from '@hiddentemple/api-interfaces';



@Injectable()
export class WebpageService {
  private readonly logger = new Logger(WebpageService.name)
  constructor(
    @InjectRepository(WebpageEntity) private repo: Repository<WebpageEntity>
  ) {}

  async getById(id: string): Promise<WebpageEntity>{
    const webpage: WebpageEntity = await this.repo.findOne({id})
    if(!webpage) throw new NotFoundException();
    return webpage;
  }

  private async create(contact: ContactEntity, dto: WebpageDTO, entityManager: EntityManager): Promise<WebpageEntity>{
    const newWebpage: WebpageEntity = entityManager.create<WebpageEntity>(WebpageEntity, {...dto, contact});
    const savedWebpage = await entityManager.save(newWebpage)
    this.logger.log(`Saved webpage: ${JSON.stringify(savedWebpage)}`);
    return newWebpage
  }

  async createMany(contact: ContactEntity, webpageDTOs: WebpageDTO[], entityManager: EntityManager): Promise<WebpageEntity[]> {
    if(!webpageDTOs || webpageDTOs == []) return [];

    this.logger.log(`Creating ${webpageDTOs.length} webpage(s): ${JSON.stringify(webpageDTOs)}`)

    const newWebpages: WebpageEntity[] = [];
    for(const webpageDTO of webpageDTOs){
      const newWebpage: WebpageEntity = await this.create(contact, webpageDTO, entityManager);
      newWebpages.push(newWebpage);
    }
    this.logger.log(`Created ${newWebpages.length} webpage(s): ${JSON.stringify(newWebpages)}`)
    return newWebpages;
  }

  async updateMany(contact: ContactEntity, webpageDTOs: WebpageDTO[], entityManager: EntityManager): Promise<WebpageEntity[]> {
    if (!webpageDTOs || webpageDTOs.length === 0) return;
    this.logger.log(`Updating ${webpageDTOs.length} webpage(s) from DTO: ${JSON.stringify(webpageDTOs)}`)
    await this.deleteMany(contact.webpages, entityManager);
    const updatedWebpages: WebpageEntity[] = await this.createMany(contact, webpageDTOs, entityManager);
    this.logger.log(`Updated ${webpageDTOs.length} webpage(s)`);
    return updatedWebpages;
  }

  async delete(id: string, entityManager: EntityManager): Promise<any> {
    this.logger.log(`Attempting delete webpage with id ${id}`)
    const webpage: WebpageEntity = await this.getById(id);
    const {affected} = await entityManager.delete(WebpageEntity, webpage);
    if (affected !== 1) {
      const errMsg = `Failed to delete webpage with id ${id}`
      this.logger.error(errMsg)
      throw new InternalServerErrorException(errMsg)
    }
    this.logger.log(`Delete webpage success. ID: ${id}`)
  }

  async deleteMany(webpages: WebpageEntity[], entityManger: EntityManager): Promise<any> {
    if (!webpages || webpages.length == 0) return
    this.logger.log(`Attempting to delete ${webpages.length} webpage(s) with entities: ${JSON.stringify(webpages)}`)
    if (!webpages || webpages.length === 0) return;
    for (const webpage of webpages) {
      if( webpage != null) {
        await this.delete(webpage.id, entityManger)
      }
    }
  }

}
