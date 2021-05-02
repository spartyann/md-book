import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recovery {
	
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column()
	object: string;

	@Column()
	date: Date;

	@Column({ type: 'json' })
	data: object;
}
