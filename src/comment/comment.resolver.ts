import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { HttpStatus, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Res() res: Response,
  ) {
    try {
      const data = await this.commentService.create(createCommentInput);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;    
    } catch (error) {
        console.error('Error fetching entity:', error);
        throw error; 
    }
  }

  @Query(() => Comment, { name: 'commentsByPostId' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.commentService.findOne(id);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;    
    } catch (error) {
        console.error('Error fetching entity:', error);
        throw error; 
    }
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @Res() res: Response,
  ) {
    try {
      const data = await this.commentService.update(
        updateCommentInput.id,
        updateCommentInput,
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

  @Mutation(() => Comment)
  async removeComment(
    @Args('id', { type: () => Int }) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await await this.commentService.remove(id);
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
