import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usRep: Repository<User>) {}
  async create(createUserInput: CreateUserInput) {
    const { name, surname, email } = createUserInput;
    return await this.usRep.save({ name, surname, email });
  }

  findAll() {
    return [
      {
        id: 1,
        name: 'Anna',
        surname: 'Anyan',
      },
      {
        id: 2,
        name: 'Anna2',
        surname: 'Anyan2',
      },
      {
        id: 3,
        name: 'Anna3',
        surname: 'Anyan3',
      },
      {
        id: 4,
        name: 'Anna4',
        surname: 'Anya4',
      },
    ];
  }

  async findOne(id: number) {
    const data = await this.usRep.findOneBy({ id })
    return data ? data : { message: "user not found " }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const data = await this.usRep.findOneBy({ id });
    if (data) {
      await this.usRep.update(id, updateUserInput);
      return await this.usRep.findOneBy({ id });
    } else {
      return { message: 'user not found ' };
    }
  }

  async remove(id: number) {
    const data = await this.usRep.findOneBy({ id });
    if (data) {
      await this.usRep.delete(id);
      return data;
    } else {
      return { message: 'user not found ' };
    }
  }
}
