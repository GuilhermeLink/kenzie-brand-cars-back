import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";
@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Announce, (announce) => announce.color)
  announces: Announce[];
}
