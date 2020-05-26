import { Repository, EntityRepository } from 'typeorm';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { stringify } from 'querystring';
import { serialize } from 'v8';


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialsDto;

        
        
        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password,user.salt);
        

        try{
            await user.save();
        }
        catch(error){
            if(error.code === '23505'){ //duplicate username
                throw new ConflictException('Username already exists');
            } else{
                throw new InternalServerErrorException();
            }
        }
        
    }
    
    async validateUserPassword(authCredentialDto: AuthCredentialsDto): Promise<string>{
        
        const {username, password} = authCredentialDto;
        const user = await this.findOne({username});
        
        if (user && await user.validatePassword(password)) {
            return user.username;
        } 
        else {
            return null;
        }
        
        
    }

    private async hashPassword(password:string, salt: string):Promise<string> {
        return bcrypt.hash(password,salt);
    }

    

}