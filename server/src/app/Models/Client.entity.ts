import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consult } from "./Consult.entity";
import { User } from "./User.entity";

@Entity()
export class Client {
	
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	name: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	birthday: Date;

	@Column()
	gender: string;

	@Column()
	email: string;

	@Column()
	comment: string;

	@Column()
	mobilePhone: string;

	@Column()
	phone: string;

	@Column()
	address: string;

	@Column()
	cp: string;

	@Column()
	city: string;

	@Column()
	country: string;
	
	@Column({ type: 'json' })
	data: object;

	@Column()
	anonymitySensitive: boolean;
	
	/*@OneToMany(type => Consult, consult => consult.clientId)
  	consults: Consult[];

	@ManyToOne(type => User, user => user.id)
	user: User;*/
}
