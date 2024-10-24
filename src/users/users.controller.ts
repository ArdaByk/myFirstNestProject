import { Controller, Get, HttpStatus, Param, Res, UseFilters} from '@nestjs/common';
import { UsersService } from './users.service';
import { BaseResponse } from 'src/common/response/BaseResponse';
import { Response } from 'express';
import { CatchEverythingFilter } from 'src/common/ExceptionManagement/http-exception.filter';

@UseFilters(CatchEverythingFilter)
@Controller('users')
export class UsersController {
    constructor(readonly userService: UsersService) { }
    @Get(":id")
    async findUserById(@Param("id") id: number, @Res() res: Response) {
        const user = await this.userService.findUserById(id);
        res
        .status(HttpStatus.OK)
        .json(new BaseResponse(true, "User listed.", user));
    }
}
