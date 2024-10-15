import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private repoCom: Repository<Comment>,
    @InjectRepository(Post) private repoPost: Repository<Post>,
    @InjectRepository(User) private repoUser: Repository<User>,
  ) {}
  async create(createCommentInput: CreateCommentInput) {
    const { text, userId, postId } = createCommentInput;
    const user = await this.repoUser.findOneBy({ id: userId });
    const post = await this.repoPost.findOneBy({ id: postId });
    if (user && post) {
      const comment = this.repoCom.create({ text, post, user });
      return await this.repoCom.save(comment);
    } else {
      return { message: 'user or post not found' };
    }
  }

  async findOne(id: number) {
    const data = await this.repoCom.findOneBy({ id });
    return data ? data : { message: 'comment not found ' };
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    const data = await this.repoCom.findOneBy({ id });
    if (data) {
      await this.repoCom.update(id, updateCommentInput);
      return await this.repoCom.findOneBy({ id });
    } else {
      return { message: 'comment not found ' };
    }
  }

  async remove(id: number) {
    const data = await this.repoCom.findOneBy({ id });
    if (data) {
      await this.repoCom.delete(id);
      return data;
    } else return { message: 'comment not found ' };
  }
}
