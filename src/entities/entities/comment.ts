import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Announce, (announce) => announce.comments)
  announce: Announce;
}
