import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity.interface";
import { Todo } from "./Todo";

@Entity()
export class User extends BaseEntity {
    @Column({type: "varchar", nullable: false})
    username: string
    @Column({type: "varchar", nullable: false})
    email: string
    @Column({type: "varchar", nullable: false})
    passwordHash: string
}