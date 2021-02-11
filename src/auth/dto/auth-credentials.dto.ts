import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Column } from "typeorm";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password must contains at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character.'})
    password: string;
}