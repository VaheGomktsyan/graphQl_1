import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { HttpStatus, NotFoundException, Res } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      const data = await this.userService.create(createUserInput);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;
    } catch (error) {
      console.error('Error fetching entity:', error);
      throw error;
    }
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    try {
      const data = await this.userService.findAll();
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;
    } catch (error) {
      console.error('Error fetching entity:', error);
      throw error;
    }
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      const data = await this.userService.findOne(id);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;
    } catch (error) {
      console.error('Error fetching entity:', error);
      throw error;
    }
  }

  @Mutation(() => User, {name:"updateUserInpukkkkkkkk"})
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      const data = await this.userService.update(
        updateUserInput.id,
        updateUserInput,
      );
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;
    } catch (error) {
      console.error('Error fetching entity:', error);
      throw error;
    }
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    try {
      const data = await this.userService.remove(id);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;
    } catch (error) {
      console.error('Error fetching entity:', error);
      throw error;
    }
  }
}
