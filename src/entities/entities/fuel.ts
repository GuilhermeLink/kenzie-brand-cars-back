import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";

@Entity()
export class Fuel {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Announce, (announce) => announce.fuel)
  announces: Announce[];
}
