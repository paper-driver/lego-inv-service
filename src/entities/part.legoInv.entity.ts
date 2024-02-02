import { AutoMap } from "@automapper/classes";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.legoInv.entity";

@Entity({
    name: "Parts"
})
export class Part {
    @PrimaryColumn({name: "lego_element_id"})
    legoElmId: number;

    @Column({name: "lego_design_id"})
    legoDesignId: number;

    @PrimaryColumn({name: "bricklink_id"})
    bircklinkId: string;

    @Column({name: "color"})
    color: string;

    @Column({name: "description"})
    descr: string;

}