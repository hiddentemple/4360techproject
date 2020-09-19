import {
    BadRequestException,
    Injectable,
    NotFoundException
} from "@nestjs/common";
import {Product} from "./product.model";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {CreateProductDTO, UpdateProductDTO} from "./product.dto";
import {User} from "../users/user.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {
    }

    async create(createDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel({...createDTO});
        const result = await product.save();
        console.log("Create Result", result);
        return result
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(props: FilterQuery<Product>): Promise<Product> {
        const product = await this.productModel.findOne(props);
        console.log('Found', product);

        if (product) return product;
        else {
            console.error("Failed props", props);
            throw new NotFoundException(`Could not find a product.`);
        }

    }

    async update(id: string, {description, price, title}: UpdateProductDTO): Promise<Product> {
        const product: Product = await this.findOne({id});

        if (description) product.description = description;
        if (price) product.price = price;
        if (title) product.title = title;

        try {
            const updated = await product.save();
            console.log('Updated product', updated);
            return updated;
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async deleteOne(id: string): Promise<boolean> {
        let deleted;

        try {
            deleted = await this.productModel.findByIdAndDelete(id);
        } catch (e) {
            throw new BadRequestException(e);
        }

        console.log('After Delete', deleted)

        return Boolean(deleted);
    }

}
