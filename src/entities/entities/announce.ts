import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from "typeorm";
import { User } from "./user";
import { Mark } from "./mark";
import { Model } from "./model";
import { Fuel } from "./fuel";
import { Color } from "./color";
import { Gallery } from "./galery";
import { Comment } from "./comment";
import { Exclude } from "class-transformer";
@Entity()
export class Announce {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: false })
  year: number;

  @Column()
  km: number;

  @Column()
  price_fipe: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ default: false })
  withinFipe: boolean;

  @ManyToOne(() => User, (user) => user.announces)
  owner: User;

  @ManyToOne(() => Mark, (mark) => mark.announces)
  mark: Mark;

  @ManyToOne(() => Model, (model) => model.announces)
  model: Model;

  @ManyToOne(() => Fuel, (fuel) => fuel.announces)
  fuel: Fuel;

  @ManyToOne(() => Color, (color) => color.announces)
  color: Color;

  @OneToOne(() => Gallery, (gallery) => gallery.announce, { cascade: true })
  @JoinColumn()
  gallery: Gallery;

  @OneToMany(() => Comment, (comment) => comment.announce)
  comments: Comment[];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ default: true })
  publishedAt: boolean;

  @BeforeInsert()
  checkFipeRange(): void {
    const maxPrice = this.price_fipe * 1.05;
    this.withinFipe = this.price <= maxPrice;
  }
}
