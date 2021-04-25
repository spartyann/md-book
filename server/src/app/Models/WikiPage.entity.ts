import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WikiPage {
	
	@PrimaryGeneratedColumn()
	id: Number;

	@Column()
	userId: Number;

	@Column()
	parentId: Number;

	@Column()
	ordering: Number;

	@Column()
	shareAlias: string;

	@Column()
	title: string;

	@Column()
	subTitle: string;

	@Column()
	summary: string;
	
	@Column({ type: 'json' })
	keyWords: object;

	@Column({ type: 'json' })
	content: object;

	@Column({ type: 'json' })
	image: string;
}
