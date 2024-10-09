import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => String)
  name: string;
  
  @Column()
  @Field(() => String)
  surname: string;

  @Column()
  @Field(() => String)
  email: string;


  @OneToMany(type=>Post, post=>post.user)
  @Field(() => [Post], { nullable: true })
  posts:Post[]

  @OneToMany(ype=>Comment, comment=>comment.user)
  @Field(()=>[Comment], { nullable: true })
  comments:Comment[]
}
