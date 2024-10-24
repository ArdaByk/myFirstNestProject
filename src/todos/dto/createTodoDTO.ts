import { IsNotEmpty } from "class-validator";

export class createTodoDTO {
    @IsNotEmpty()
    todo: string;
    @IsNotEmpty()
    completed: boolean;
}