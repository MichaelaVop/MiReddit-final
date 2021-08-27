import { Field, ObjectType } from "type-graphql";
import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";


@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
  @Field()
  @Column()
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.updoots, { onDelete: "CASCADE" })
  post: Post;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}