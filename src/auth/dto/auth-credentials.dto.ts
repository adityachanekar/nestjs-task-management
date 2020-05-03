import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { Unique } from "typeorm";

export class AuthCredentialsDto{

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password is too weak'})
    //one upper case, one lower case and one special character
    password: string;
}