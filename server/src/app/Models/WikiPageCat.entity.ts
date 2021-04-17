import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WikiPageCat {
	
	@PrimaryColumn()
	catId: Number;

	@PrimaryColumn()
	pageId: Number;

}
