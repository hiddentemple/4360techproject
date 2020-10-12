import {BadRequestException, Injectable, NotFoundException, ValidationError} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryEntity} from "../db/entities/category.entity";
import {Repository} from "typeorm";
import {CategoryCode, CreateCategoryRequest, UpdateCategoryRequest} from "@hiddentemple/api-interfaces";
import {ContactEntity} from "../db/entities/contact.entity";
import {validate} from "class-validator";



@Injectable()
export class CategoryService {
    private _primary: CategoryEntity;

    constructor(@InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>) {
        this.loadPrimary();
    }

    async getOne(id: string): Promise<CategoryEntity | undefined> {
        const contact = this.repo.findOne(id);
        if (!contact) throw new NotFoundException();
        return contact;
    }

    async getPrimary(): Promise<CategoryEntity> {
        await this.loadPrimary();
        return this._primary;
    }

    async getAll(): Promise<CategoryEntity[]> {
        return this.repo.find();
    }

    async createOne({category}: CreateCategoryRequest): Promise<CategoryEntity> {
        if (category.description.toLowerCase().trim() === 'primary') {
            console.warn("Tried to create primary when it already existed.")
            return this._primary;
        }

        const alreadyPersisted: CategoryEntity = await this.getByDescription(category.description);
        if (alreadyPersisted) {
            console.warn("Tried to create a category when one already existed.")
            return alreadyPersisted;
        }

        const entity = new CategoryEntity();
        entity.description = category.description.trim();
        entity.code = CategoryCode.USER;
        return this.repo.save(entity);
    }

    async deleteOne(id: string): Promise<any> {
        const category = await this.getOne(id); // throws NotFound if no category with that ID

        if (category.code == CategoryCode.PRIMARY) {
            throw new BadRequestException("Cannot delete primary category");
        }

        return this.repo.delete({ id });
    }

    private async loadPrimary() {
        if (!this._primary) {
            console.group('Initialize Primary Category');
            const [categories, categoryCount] = await this.repo.findAndCount({ code: CategoryCode.PRIMARY });
            if (categoryCount > 1) {
                throw new Error(`More than one primary category - database is invalid. Found ${categories}`);
            }
            else if (categoryCount == 1) {
                console.log('Found previous primary');
                this._primary = categories[0];
            }
            else {
                console.log('Creating new primary')
                this._primary = this.repo.create({code: CategoryCode.PRIMARY, description: 'primary'});
                await this.repo.save(this._primary);
            }
            console.log('Primary: ', this._primary);
            console.groupEnd();
        }
    }

    private async getByDescription(description: string): Promise<CategoryEntity> {
        return this.repo.findOne({description});
    }
}