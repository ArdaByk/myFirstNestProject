import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';

@Module({
  imports: [UsersModule, AuthModule, TodosModule, ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>("HOST"),
        port: configService.get<number>("PORT"),
        username: "root",
        password: configService.get<string>("PASSWORD"),
        database: configService.get<string>("DATABASE"),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    })
  ]
})
export class AppModule { }
