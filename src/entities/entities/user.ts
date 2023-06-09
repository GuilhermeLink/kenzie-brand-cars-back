import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { Address } from "./address";
import { Announce } from "./announce";
import { Comment } from "./comment";

import { Exclude } from "class-transformer";
import { getRounds, hashSync } from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  reset_token: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column({ default: false })
  admin?: boolean;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Announce, (announce) => announce.owner, { cascade: true })
  announces?: Announce[];

  @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
  comments: Comment[];

  @BeforeInsert()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
