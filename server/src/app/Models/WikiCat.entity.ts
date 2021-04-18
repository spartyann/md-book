import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WikiCat {
	
	@PrimaryGeneratedColumn()
	id: Number;

	@Column()
	userId: Number;
	
	@Column()
	ordering: Number;

	@Column()
	parentId: Number;

	@Column()
	name: string;
}
