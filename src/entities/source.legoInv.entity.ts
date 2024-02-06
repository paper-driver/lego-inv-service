import { AutoMap } from "@automapper/classes";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "Sources"
})
export class Source {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "source_name"})
    sourceName: string;

    @Column({name: "source_url", unique: true})
    sourceUrl: string;

}