import { Body, Controller, HttpStatus, Post, Req, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { createUserDTO } from 'src/users/dto/CreateUserDTO';
import { AuthService } from './auth.service';
import { BaseResponse } from 'src/common/response/BaseResponse';
import { LoginDTO } from './dto/loginDTO';
import { CatchEverythingFilter } from 'src/common/ExceptionManagement/http-exception.filter';

@Controller('auth')
@UseFilters(CatchEverythingFilter)
export class AuthController {

    constructor(readonly authService: AuthService) { }

    @Post("register")
    @UsePipes(ValidationPipe)
    async register(@Body() body: createUserDTO, @Res() res: Response, @Req() req: Request) {
        const token = await this.authService.register(body);
        res
            .status(HttpStatus.CREATED)
            .json(new BaseResponse(true, "User registered.", token))
    }

    @Post("login")
    @UsePipes(ValidationPipe)
    async login(@Body() body: LoginDTO, @Res() res: Response, @Req() req: Request) {
        const token = await this.authService.login(body);
        res
            .status(HttpStatus.OK)
            .json(new BaseResponse(true, "Logged in.", token))
    }


}
