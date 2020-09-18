import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {UserEntity} from "@crm/nest/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserDTO} from "@crm/shared";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
    super(repo);
  }


  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  create(user: UserDTO) {

  }
}
