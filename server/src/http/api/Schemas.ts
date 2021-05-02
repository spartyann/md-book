import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEmail, IsInt, IsNumber, isObject, IsObject, IsOptional, IsString, Min, MinLength, ValidateIf } from "class-validator";

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

export class UserRegister {
	
	@ApiProperty({ description: 'Prénom' }) @IsString() @MinLength(2)
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString() @MinLength(2)
	lastName: string;

	@ApiProperty({ description: 'Email' }) @IsEmail({}, {message: "Veuillez saisir un email valide."})
	email: string;

	@ApiProperty({ description: 'Mot de passe' }) @IsString() @MinLength(6)
	pwd: string;

	@ApiProperty({ description: "Code d'invitation pour inscription" }) @IsOptional() @IsString()
	registrationCode: string;
}

export class ClientCreate {
	
	@ApiProperty({ description: 'Prénom' }) @IsString() @MinLength(2)
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString() @MinLength(2)
	lastName: string;

	@ApiProperty({ description: 'Genre (m: Homme,f: Femme, o: Autre)' }) @IsString() @ValidateIf(c =>  { return c.gender == 'm' || c.gender == 'f' || c.gender == 'o'; } )
	gender: string;
}

export class ClientUpdate {
	
	id: number;

	@ApiProperty({ description: 'Nom complet' }) @IsString() @MinLength(2)
	name: string;

	@ApiProperty({ description: 'Prénom' }) @IsString()
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString()
	lastName: string;

	@ApiProperty({ description: 'Date de naissance' }) @IsDate() @IsOptional()
	@Type(() => Date)
	birthday: Date;

	@ApiProperty({ description: 'Genre (m: Homme,f: Femme, o: Autre)' }) @IsString() @ValidateIf(c =>  { return c.gender == 'm' || c.gender == 'f' || c.gender == 'o'; } )
	gender: string;

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
	
	@ApiProperty({ description: 'Données' }) @IsOptional() @IsObject()
	data: object;

	@ApiProperty({ description: 'Sensible à l\'anonymat' }) @IsBoolean()
	anonymitySensitive: boolean;

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


export class WikiPageUpdate {
	
	id: number;

	@ApiProperty({ description: 'Page parent' }) @IsNumber() @IsOptional()
	parentId: number;

	@ApiProperty({ description: 'Ordre' }) @IsNumber() @IsOptional()
	ordering: number;

	@ApiProperty({ description: 'Titre' }) @IsString() @MinLength(2) @IsOptional()
	title: string;

	@ApiProperty({ description: 'Sous-titre' }) @IsString() @IsOptional()
	subTitle: string;
	
	@ApiProperty({ description: 'Résumé' }) @IsString() @IsOptional()
	summary: any;

	@ApiProperty({ description: 'Mots clés' }) @IsOptional() @IsArray()
	keyWords: any;

	@ApiProperty({ description: 'Content' }) @IsOptional() @IsObject()
	content: any;

	@ApiProperty({ description: 'Image' }) @IsOptional() @IsObject()
	image: string;
}

export class WikiPageCreate {
	
	@ApiProperty({ description: 'Page parent' }) @IsNumber() @IsOptional()
	parentId: number;

	@ApiProperty({ description: 'Titre' }) @IsString() @MinLength(2)
	title: string;
}