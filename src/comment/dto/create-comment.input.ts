import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  text: string;
  @Field()
  userId: number;
  @Field()
  postId: number;
}
