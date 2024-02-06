import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.legoInv.entity";
import { Color } from "./color.legoInv.entity";

@Entity({
    name: "Parts"
})
export class Part {
    @PrimaryColumn({name: "lego_element_id"})
    legoElmId: number;

    @Column({name: "lego_design_id"})
    legoDesignId: number;

    @PrimaryColumn({name: "bricklink_id"})
    bricklinkId: string;

    @ManyToOne(() => Color, (Color) => Color.blColorId, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "bricklink_color_id", referencedColumnName: "blColorId"})
    @PrimaryColumn({ name: "bricklink_color_id"})
    blColorId: number;

    @Column({name: "color"})
    color: string;

    @Column({name: "description", nullable: true})
    descr: string;

}