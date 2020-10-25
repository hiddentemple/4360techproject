import {Body, Controller, Delete, Get, Param, Post, Res} from "@nestjs/common";
import {CategoryService} from "../services/category.service";
import {
    CreateCategoryRequest,
    CreateCategoryResponse,
    GetAllCategoriesResponse,
    GetCategoryResponse,
    GetPrimaryCategoryResponse
} from "@hiddentemple/api-interfaces";
import {CategoryEntity} from "../../db/entities/category.entity";
import {Response} from 'express';

;


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
    async createOne(@Res() res: Response, @Body() dto: CreateCategoryRequest): Promise<any> {
        const responseObject: CreateCategoryResponse = await this.categoryService.createOne(dto);
        const responseCode = responseObject.wasCreated ? 201 : 200;
        return res.status(responseCode).json(responseObject)
    }

    @Delete(':id')
    async deleteOne(@Param() id: string): Promise<any> {
        return this.categoryService.deleteOne(id)
    }
}