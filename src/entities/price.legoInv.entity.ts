import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, Long, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Part } from "./part.legoInv.entity";
import { Source } from "./source.legoInv.entity";

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

    @Column({name: "price", type: "float"})
    price: number;

    @Column({name: "updated_date", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    priceDate: Date;

}   

export enum Condition {
    NEW = "new",
    USED = "used"
}