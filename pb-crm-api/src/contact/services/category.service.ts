import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    ValidationError
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryEntity} from "../../db/entities/category.entity";
import {Repository} from "typeorm";
import {CategoryCode, CreateCategoryRequest, CreateCategoryResponse} from "@hiddentemple/api-interfaces";


@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name)
    private _primary: CategoryEntity;

    constructor(@InjectRepository(CategoryEntity) private repo: Repository<CategoryEntity>) {
        this.loadPrimary();
    }

    async getOne(id: string): Promise<CategoryEntity | undefined> {
        const category = await this.repo.findOne(id);
        if (!category) {
            const errMsg = `Failed to find a category`
            this.logger.error(errMsg)
            throw new NotFoundException(errMsg);
        }
        this.logger.log(`Found category: ${JSON.stringify(category)}`)
        return category;
    }

    async getPrimary(): Promise<CategoryEntity> {
        await this.loadPrimary();
        return this._primary;
    }

    async getAll(): Promise<CategoryEntity[]> {
        return this.repo.find();
    }

    async createOne({category}: CreateCategoryRequest): Promise<CreateCategoryResponse> {
        if (category.description.toLowerCase().trim() === 'primary') {
            this.logger.warn("Tried to create primary when it already existed.")
            return {category: this._primary, wasCreated: false};
        }

        const alreadyPersisted: CategoryEntity = await this.getByDescription(category.description);
        if (alreadyPersisted) {
            this.logger.warn("Tried to create a category when one already existed.")
            return {category: alreadyPersisted, wasCreated: false};
        }

        this.logger.log(`Creating a category from dto ${JSON.stringify(category)}`)
        const entity = new CategoryEntity();
        entity.description = category.description.trim();
        entity.code = CategoryCode.USER;
        const savedCategory: CategoryEntity = await this.repo.save(entity);

        this.logger.log(`Created new category: ${JSON.stringify(savedCategory)}`)
        return {category: savedCategory, wasCreated: true}
    }

    async deleteOne(id: string): Promise<any> {
        const category = await this.getOne(id); // throws NotFound if no category with that ID
        this.logger.log(`Attempting deletion of category: ${JSON.stringify(category)}`)

        if (category.code == CategoryCode.PRIMARY) {
            this.logger.error(`Cannot delete primary, throwing error`)
            throw new BadRequestException("Cannot delete primary category");
        }

        const {affected} = await this.repo.delete(category);
        if (affected !== 1) {
            const errMsg: string = `Failed to delete category with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }

        this.logger.log(`Successfully deleted category with id ${id}`)
    }

    async verifyCategory(categoryId: string): Promise<CategoryEntity> {
        try {
            return this.getOne(categoryId);
        } catch (err) {
            const errMsg: string = `Failed to verify category: ${err.message}`
            this.logger.error(errMsg)
            throw new BadRequestException(errMsg)
        }
    }

    async containsExactlyOnePrimary(categoryIds: string[]): Promise<boolean> {
        if (!categoryIds || categoryIds.length === 0) return false;

        const primary: CategoryEntity = await this.getPrimary()
        const primaryId = primary.id;
        const filtered: string[] = categoryIds.filter(id => id === primaryId);
        return filtered.length === 1;
    }

    async requireExactlyOnePrimary(entityName: string, categoryIds: string[]): Promise<boolean> {
        const valid: boolean = await this.containsExactlyOnePrimary(categoryIds);
        if (!valid) {
            const errMsg = `${entityName} did not contain exactly one primary`
            this.logger.error(errMsg)
            throw new BadRequestException(errMsg)
        }
        return true;
    }

    private async loadPrimary() {
        if (!this._primary) {
            const [categories, categoryCount] = await this.repo.findAndCount({ code: CategoryCode.PRIMARY });

            if (categoryCount > 1) {
                const errMsg = `More than one primary category - database is invalid. Found ${JSON.stringify(categories)}`;
                this.logger.error(errMsg);
                throw new Error(errMsg);
            }
            else if (categoryCount === 1) {
                this.logger.warn("Found previous primary")
                this._primary = categories[0];
            }
            else {
                this.logger.log('Creating new primary')
                this._primary = this.repo.create({code: CategoryCode.PRIMARY, description: 'primary'});
                await this.repo.save(this._primary);
            }

            this.logger.log('Primary: ' + JSON.stringify(this._primary));
        }
    }

    private async getByDescription(description: string): Promise<CategoryEntity> {
        return this.repo.findOne({description});
    }
}