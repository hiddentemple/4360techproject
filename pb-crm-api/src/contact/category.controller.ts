import {Body, Controller, Delete, Get, Param, Post, ValidationPipe} from "@nestjs/common";
import {CategoryService} from "./category.service";
import {
    CreateCategoryRequest,
    CreateCategoryResponse,
    GetAllCategoriesResponse,
    GetCategoryResponse,
    GetPrimaryCategoryResponse
} from "@hiddentemple/api-interfaces";
import {CategoryEntity} from "../db/entities/category.entity";
import {IsUUID} from "class-validator";


@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {
    }

    @Get()
    async getAll(): Promise<GetAllCategoriesResponse> {
        const categories: CategoryEntity[] = await this.categoryService.getAll();
        return {categories};
    }

    @Get('primary')
    async getPrimary(): Promise<GetPrimaryCategoryResponse> {
        const category: CategoryEntity = await this.categoryService.getPrimary();
        return {category}
    }

    @Get(':id')
    async getOne(@Param() id: string): Promise<GetCategoryResponse> {
        const category: CategoryEntity = await this.categoryService.getOne(id);
        return {category};
    }

    @Post()
    async createOne(@Body() dto: CreateCategoryRequest): Promise<CreateCategoryResponse> {
        const category: CategoryEntity = await this.categoryService.createOne(dto);
        return {category}
    }

    @Delete(':id')
    async deleteOne(@Param() id: string): Promise<any> {
        return this.categoryService.deleteOne(id)
    }
}