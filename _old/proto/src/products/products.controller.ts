import {
    Body,
    Controller, Delete,
    Get,
    NotFoundException,
    Param,
    Post, UseGuards
} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {Product} from "./product.model";
import {CreateProductDTO, UpdateProductDTO} from "./product.dto";
import {Error} from "mongoose";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    async addProduct(@Body() body: CreateProductDTO) {
        return await this.productsService.create(body);
    }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return await this.productsService.findOne({_id: id});
    }

    @Post(':id')
    async updateProduct(@Body() body: UpdateProductDTO,
                        @Param('id') id: string): Promise<Product> {
        return await this.productsService.update(id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id') id: string)  {
        return await this.productsService.deleteOne(id);
    }

}
