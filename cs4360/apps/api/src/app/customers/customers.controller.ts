import { Controller} from '@nestjs/common'
import { Crud } from '@nestjsx/crud'
import { CustomersService } from './customers.service'
import { CustomersEntity } from './customers.entity'
@Crud({
    model: {
        type: CustomersEntity
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    }
})
@Controller('pokemon')
export class CustomersController {
    constructor (public service: CustomersService) {}
}