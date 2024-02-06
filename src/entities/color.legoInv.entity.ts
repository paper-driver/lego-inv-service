import { AutoMap } from "@automapper/classes";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.legoInv.entity";

@Entity({
    name: "Colors"
})
export class Color {
    @PrimaryColumn({name: "bricklink_color_id"})
    blColorId: number;

    @Column({name: "bricklink_color_name"})
    blColorName: string;

    @Column({name: "rebrickable_color_id", nullable: false, unique: true})
    rbColorId: number;

    @Column({name: "rebrickable_color_name"})
    rbColorName: string;

    @Column({name: "lego_color_id", nullable: false})
    legoColorId: number;

    @Column({name: "lego_color_name"})
    legoColorName: string

}