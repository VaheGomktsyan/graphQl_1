import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => String)
  text: string;

  @ManyToOne((type) => User, (user) => user.comments)
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne((type) => Post, (post) => post.comments)
  @Field(() => Post, { nullable: true })
  post: Post;
}
