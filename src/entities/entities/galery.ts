import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @Column("simple-array")
  images: string[];

  @OneToOne(() => Announce, (announce) => announce.gallery)
  announces: Announce;
}
