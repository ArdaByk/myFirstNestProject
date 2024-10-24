import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { createUserDTO } from './dto/CreateUserDTO';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) {
            throw new NotFoundException("User not found.");
        }
        return user
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        return user
    }

    async createUser(body: createUserDTO){

        const password = await bcrypt.hash(body.password, 10);
        const newUser = await this.userRepository.save({
            username: body.username,
            email: body.email,
            passwordHash: password
        });
        
        return newUser
    }
}
