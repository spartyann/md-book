import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Configuration {
	
	@PrimaryColumn()
	name: number;
	
	@Column({ type: 'json' })
	value: any;

	@Column()
	comment: string;
}
