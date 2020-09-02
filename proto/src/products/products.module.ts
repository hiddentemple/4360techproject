import {Module} from "@nestjs/common";
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./product.model";


@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        MongooseModule.forFeature([
            {name: Product.name, schema: ProductSchema}
        ])]
})
export class ProductsModule {}
