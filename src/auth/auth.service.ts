import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createUserDTO } from 'src/users/dto/CreateUserDTO';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/loginDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private userService: UsersService) { }

    async register(body: createUserDTO) {

        const user = await this.userService.findUserByEmail(body.email);
        if (user) {
            throw Error("This user alread exists.")
        } else {
            const newUser = await this.userService.createUser(body);
            const payload = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
            return await this.jwtService.signAsync({ payload });
        }

    }

    async login(body: LoginDTO){

        const user = await this.userService.findUserByEmail(body.email);
        if(!user) throw new NotFoundException("wrong credentials.")
        
        const isMatch = await bcrypt.compare(body.password, user.passwordHash)

        if(isMatch){
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            return await this.jwtService.signAsync({ payload });
        } else {
            throw Error("wrong credentials.")
        }

    }

}
