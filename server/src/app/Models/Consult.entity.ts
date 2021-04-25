import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client.entity";

@Entity()
export class Consult {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	clientId: number;

	@Column()
	date: Date;

	@Column()
	preConsult: string;

	@Column()
	currentClientLevel: number;

	@Column()
	hypothesis: string;

	@Column()
	report: string;

	@Column()
	reportClient: string;

	@Column()
	reportClientLevel: number;
	
	@Column()
	reportClientPostConsult: string;

	@Column()
	reportClientPostConsultLevel: number;

	@Column({ type: 'json' })
	data: object;


	@ManyToOne(type => Client, client => client.id)
	client: Client;
}
