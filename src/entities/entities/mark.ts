import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";
@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Announce, (announce) => announce.mark)
  announces: Announce[];
}
