import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatchEverythingFilter } from './common/ExceptionManagement/http-exception.filter';
import { AllExceptionsFilter } from './common/ExceptionManagement/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
