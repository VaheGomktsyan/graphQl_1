import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { HttpStatus, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Res() res: Response,
  ) {
    
    try {
      const data = await this.postService.create(createPostInput);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;    
    } catch (error) {
        console.error('Error fetching entity:', error);
        throw error; 
    }
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll(@Res() res: Response) {

    try {
      const data = await this.postService.findAll();
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;    
    } catch (error) {
        console.error('Error fetching entity:', error);
        throw error; 
    }
  }

  @Query(() => Post, { name: 'post' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @Res() res: Response,
  ) {

    try {
      const data = await this.postService.findOne(id);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;    
    } catch (error) {
        console.error('Error fetching entity:', error);
        throw error; 
    }
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postService.update(updatePostInput.id, updatePostInput);
      if (!data) {
        throw new NotFoundException(`Entity with id $`);
      }
      return data;    
    } catch (error) {
        console.error('Error fetching entity:', error);
        throw error; 
    }
  }

  @Mutation(() => Post)
  async removePost(
    @Args('id', { type: () => Int }) id: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postService.remove(id);
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
