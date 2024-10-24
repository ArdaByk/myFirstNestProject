import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity.interface";

@Entity()
export class Todo extends BaseEntity {
    @Column({type: "varchar", nullable: false})
    todo: string
    @Column({type: "bool", nullable: false, default: false})
    completed: boolean
    @Column({type: "int", nullable: false})
    userId: number

}