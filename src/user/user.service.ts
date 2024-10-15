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

  async findAll() {
    return await this.usRep.find({
      relations:{
        posts:{
          comments:{user:true}
        }
      }
    })
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
      return { name: 'user not found ' };
    }
  }
}
