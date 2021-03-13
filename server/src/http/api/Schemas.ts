import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";

export class ClientCreate {
	
	@ApiProperty({ description: 'Prénom' }) @IsString() @MinLength(2)
	firstName: string;

	@ApiProperty({ description: 'Nom' }) @IsString() @MinLength(2)
	lastName: string;

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



