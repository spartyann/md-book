import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WikiPage {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	parentId: number;

	@Column()
	ordering: number;

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
