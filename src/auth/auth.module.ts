import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, ConfigModule,JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get<string>("SECRET_KEY"),
      signOptions: { expiresIn: '20m' },
    }),
    inject: [ConfigService]
  })],
  exports: [AuthService],
})
export class AuthModule { }
