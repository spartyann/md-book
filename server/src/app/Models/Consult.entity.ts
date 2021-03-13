import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client.entity";

@Entity()
export class Consult {
	
	@PrimaryGeneratedColumn()
	id: Number;

	@Column()
	userId: Number;

	@Column()
	clientId: Number;

	@Column()
	date: Date;

	@Column()
	preConsult: string;

	@Column()
	hypothesis: string;

	@Column()
	report: string;

	@Column()
	reportClient: string;

	@Column()
	reportClientPostConsult: string;

	@Column()
	data: string;


	@ManyToOne(type => Client, client => client.id)
	client: Client;
}
