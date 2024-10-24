import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createTodoDTO } from './dto/createTodoDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {

    constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) { }

    async createTodo(body: createTodoDTO, userId: number) {

        const todo = await this.todoRepository.save({
            todo: body.todo,
            completed: false,
            createdBy: userId
        });

        return todo
    }

    async getTodoById(id: number) {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) throw new NotFoundException();

        return todo
    }

    async getTodos(userId: number) {
        try {
            const todos = await this.todoRepository.findBy({ userId })
            return todos;
        } catch (error) {
            console.error(error)
        }

    }

    async changeCompleteStatus(id: number, userId: number) {
        const todo = await this.todoRepository.findOneBy({ id });
        if(!todo) throw new NotFoundException();

        if(userId != todo.userId) throw new UnauthorizedException();

        await this.todoRepository.update(id, {completed: todo.completed == true ? false : true});

    }
}
