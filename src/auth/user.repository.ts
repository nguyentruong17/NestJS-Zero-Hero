import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<boolean> {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();

        const user = new User();
        user.username = username;
        user.password = await bcrypt.hash(password, salt);
        user.salt = salt; //should the 'salt' be kept outside of this table?

        try {
            await user.save();
        } catch(e) {    
            if (e.code === '23505') {
                throw new ConflictException(`Username ${username} already exists!`)
            } else {
                //return false;
                throw new InternalServerErrorException();
            }
        }       
        return true;
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const found = await this.findOne({ username });

        if (found && await found.validatePassword(password)) {
            return username;
        } else {
            return null;
        }
    }
}