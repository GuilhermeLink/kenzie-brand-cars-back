import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Announce } from "./announce";

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  images: string[];

  @OneToOne(() => Announce, (announce) => announce.gallery)
  announce: Announce;
}
