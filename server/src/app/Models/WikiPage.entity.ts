import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WikiPage {
	
	@PrimaryGeneratedColumn()
	id: Number;

	@Column()
	userId: Number;

	@Column()
	shareAlias: string;

	@Column()
	title: string;

	@Column({ type: 'json' })
	content: object;

	@Column()
	image: string;

}
