import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";
import { iUserRequest } from "../../interfaces/user";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: string;

  @Column()
  text: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Announce, (announce) => announce.comments)
  announces: Announce;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'author_id' })
  author: User;
}
