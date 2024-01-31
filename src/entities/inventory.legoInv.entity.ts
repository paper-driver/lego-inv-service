import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./Part.legoInv.entity";

@Entity({
    name: "Inventories"
})
export class Inventory {

    @ManyToOne(() => Part, (Part) => Part.legoElmId, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "lego_element_id", referencedColumnName: "legoElmId"})
    @PrimaryColumn({ name: "lego_element_id"})
    legoElmId: number;

    @Column({name: "amount_own"})
    own: number;

    @Column({name: "amount_used"})
    used: number;

}