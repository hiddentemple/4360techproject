import {WebpageEntity} from "../entities/webpage.entity";
import {define} from "typeorm-seeding";
import {WebpageCategory} from "@hiddentemple/api-interfaces";


define(WebpageEntity, (faker) => {
    const webpage = new WebpageEntity();
    webpage.url = faker.internet.url()
    webpage.category = faker.random.arrayElement(Object.values(WebpageCategory))
    return webpage
})
