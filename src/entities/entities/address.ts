import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./user";
import { Exclude } from "class-transformer";
@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  @Exclude()
  id?: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement: string;

  @Column()
  zipCode: string;

  @OneToOne(() => User, (user) => user.address)
  user?: User;
}
