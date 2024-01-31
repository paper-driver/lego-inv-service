import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./Part.legoInv.entity";
import { Source } from "./Source.legoInv.entity";

@Entity({
    name: "Prices"
})
export class Price {
    @ManyToOne(() => Part, (Part) => Part.legoElmId, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "lego_element_id", referencedColumnName: "legoElmId" })
    @PrimaryColumn({name: "lego_element_id"})
    legoElmId: number;

    @ManyToOne(() => Source, (Source) => Source.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: "source_id", referencedColumnName: "id" })
    @PrimaryColumn({name: "source_id"})
    sourceId: number;

    @PrimaryColumn({name: "condition"})
    condition: Condition;

    @Column({name: "price"})
    price: string;

}   

export enum Condition {
    NEW = "new",
    USED = "used"
}