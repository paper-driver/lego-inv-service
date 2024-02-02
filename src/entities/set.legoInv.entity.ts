import { AutoMap } from "@automapper/classes";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price.legoInv.entity";

@Entity({
    name: "Sets"
})
export class LegoSet {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "lego_set_id", unique: true, nullable: true})
    legoSetId: number;

    @Column({name: "moc_id", unique: true, nullable: true})
    mocId: string;

    @Column({name: "set_name", nullable: true})
    setName: string;

    @Column({name: "num_of_copy", default: 0})
    numOfCopy: number;

    @Column({name: "num_of_copy_built", default: 0})
    numOfCopyBuilt: number;

}