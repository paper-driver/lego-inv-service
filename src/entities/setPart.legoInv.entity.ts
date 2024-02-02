import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.legoInv.entity";
import { Part } from "./part.legoInv.entity";
import { LegoSet } from "./set.legoInv.entity";

@Entity({
    name: "Set_Parts"
})
export class LegoSetPart {

    @ManyToOne(() => Part, (Part) => Part.legoElmId, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "lego_element_id", referencedColumnName: "legoElmId"})
    @PrimaryColumn({ name: "lego_element_id" })
    legoElmId: number

    @ManyToOne(() => LegoSet, (LegoSet) => LegoSet.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "lego_set_id", referencedColumnName: "id"})
    @PrimaryColumn({name: "lego_set_id" })
    legoSetId: number;

    @Column({name: "amount_need"})
    amount: number;

}