import { IsNotEmpty, Length, Matches } from "class-validator";

export class createUserDTO {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @Matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        { message: 'Invalid email format' },
    )
    email: string;
    @IsNotEmpty()
    @Length(6, 10)
    password: string;
}