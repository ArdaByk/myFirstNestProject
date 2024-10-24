import { Controller, Get, Post, Body, Param, UseGuards, Req, Res, Request, HttpStatus, UseFilters } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { createTodoDTO } from './dto/createTodoDTO';
import { Response } from 'express';
import { BaseResponse } from 'src/common/response/BaseResponse';
import { CatchEverythingFilter } from 'src/common/ExceptionManagement/http-exception.filter';

@UseFilters(CatchEverythingFilter)
@Controller('todos')
export class TodosController {

    constructor(readonly todoService: TodosService) { }

    @UseGuards(AuthGuard)
    @Post("add")
    async createTodo(@Body() body: createTodoDTO, @Request() req: any, @Res() res: Response) {

        const userId = req.user.payload.id;
        const todo = await this.todoService.createTodo(body, userId);
        res
            .status(HttpStatus.CREATED)
            .json(new BaseResponse(true, "Todo is created.", todo))
    }

    @UseGuards(AuthGuard)
    @Get("my-todos")
    async getMyTodos(@Request() req: any, @Res() res: Response) {
        const userId = req.user.payload.id;
        const todos= await this.todoService.getTodos(userId);
        res
            .status(HttpStatus.OK)
            .json(new BaseResponse(true, "Todos listed.", todos))
    }

    @Get(":id")
    async getTodoById(@Param("id") id: number, @Res() res: Response) {
        const todo = await this.todoService.getTodoById(id);
        res
            .status(HttpStatus.OK)
            .json(new BaseResponse(true, "Todo listed.", todo))
    }

    @UseGuards(AuthGuard)
    @Post("change-complete-status/:id")
    async changeCompleteStatus(@Param("id") id: number, @Request() req: any, @Res() res: Response) {
        await this.todoService.changeCompleteStatus(id, req.user.payload.id);
        res
        .status(HttpStatus.OK)
        .json(new BaseResponse(true, "Todo is updated."))
    }

}
