import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Announce } from "./announce";
import { Exclude } from "class-transformer";



@Entity()
export class Year {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: string;
    @Column()
    year: string;
    @OneToMany(() => Announce, (announce)=> announce.year)
    announces: Announce[];
}