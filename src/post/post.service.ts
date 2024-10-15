import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repoPost: Repository<Post>,
    @InjectRepository(User) private repoUser: Repository<User>,
  ) {}
  async create(createPostInput: CreatePostInput) {
    const { title, body, userId } = createPostInput;
    const user = await this.repoUser.findOneBy({ id: userId });
    if (user) {
      const post = this.repoPost.create({ title, body, user });
      return await this.repoPost.save(post);
    } else {
      return { message: 'user not found ' };
    }
  }

  async findAll() {
    return await this.repoPost.find({
      relations: {
        user: {
          comments: true,
        },
        comments: {
          user: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const data = await this.repoPost.findOneBy({ id });
    return data ? data : { message: 'post not found' };
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    const data = await this.repoPost.findOneBy({ id });
    if (data) {
      await this.repoPost.update(id, updatePostInput);
      return await this.repoPost.findOneBy({ id });
    } else return { message: 'post not found' };
  }

  async remove(id: number) {
    const data = await this.repoPost.findOneBy({ id });
    if (data) {
      await this.repoPost.delete(id);
      return await this.repoPost.findOneBy({ id });
    } else {
      return { message: 'post not found' };
    }
  }
}
