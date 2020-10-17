import {Module} from '@nestjs/common';
import {ErrorService} from "../core/services/error.service";

@Module({
    providers: [ErrorService]
})
export class AuthnModule {}
