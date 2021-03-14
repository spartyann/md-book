import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsObject, IsOptional, IsString, Min, MinLength, ValidateIf } from "class-validator";

export class ClientCreate {
	
	@ApiProperty({ description: 'Prénom' }) @IsString() @MinLength(2)
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString() @MinLength(2)
	lastName: string;

}

export class ClientUpdate {
	
	id: number;

	@ApiProperty({ description: 'Nom complet' }) @IsString() @MinLength(2)
	name: string;

	@ApiProperty({ description: 'Prénom' }) @IsString()
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString()
	lastName: string;

	@ApiProperty({ description: 'Email' }) @IsEmail() @ValidateIf(o => o.email !== '')
	email: string;

	@ApiProperty({ description: 'Commentaire' }) @IsString()
	comment: string;

	@ApiProperty({ description: 'Téléphone mobile' }) @IsString()
	mobilePhone: string;

	@ApiProperty({ description: 'Téléphone fixe' }) @IsString()
	phone: string;

	@ApiProperty({ description: 'Adresse' }) @IsString()
	address: string;

	@ApiProperty({ description: 'Copde postal' }) @IsString()
	cp: string;

	@ApiProperty({ description: 'Ville' }) @IsString()
	city: string;

	@ApiProperty({ description: 'Pays' }) @IsString()
	country: string;

}

export class UserUpdate {
	
	@ApiProperty({ description: 'Id'}) @IsInt() @Min(1)
	id: number;

	@ApiProperty({ description: 'Prénom' }) @IsString() @MinLength(2)
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString() @MinLength(2)
	lastName: string;

	@ApiProperty({ description: 'Email' }) @IsEmail({}, {message: "Veuillez saisir un email valide."})
	email: string;

	@ApiProperty({ description: 'Mot de passe' }) @IsOptional() @IsString()
	pwd: string;
}


export class ConsultCreate {
	
	@ApiProperty({ description: 'Id du client' }) @IsInt() @Min(1)
	clientId: number;

	@ApiProperty({ description: 'Date' }) @IsOptional() @IsDate()
    @Type(() => Date)
	date: Date;
}


export class ConsultUpdate {
	
	id: number;

	@ApiProperty({ description: 'Date' }) @IsOptional() @IsDate()
    @Type(() => Date)
	date: Date;

	@ApiProperty({ description: 'Nom' }) @IsOptional() @IsString()
	preConsult: string;

	@ApiProperty({ description: 'Etat actuel du client - Niveau' }) @IsOptional() @IsInt()
	currentClientLevel: number;

	@ApiProperty({ description: 'Email' }) @IsOptional() @IsString()
	hypothesis: string;

	@ApiProperty({ description: 'Rapport de séance' }) @IsOptional() @IsString()
	report: string;

	@ApiProperty({ description: 'Retour immédiat du client' }) @IsOptional() @IsString()
	reportClient: string;

	@ApiProperty({ description: 'Retour immédiat du client - Niveau' }) @IsOptional() @IsInt()
	reportClientLevel: number;

	@ApiProperty({ description: 'Retour du client post-séance' }) @IsOptional() @IsString()
	reportClientPostConsult: string;

	@ApiProperty({ description: 'Retour du client post-séance - Niveau' }) @IsOptional() @IsInt()
	reportClientPostConsultLevel: number;


	@ApiProperty({ description: 'Données' }) @IsOptional() @IsObject()
	data: object;
}
