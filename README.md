# NestJS Firebase Auth middleware

NestJS middleware to verify tokens from Firebase.

## Usage

```typescript
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FirebaseAuthMiddleware } from 'nestjs-firebase-auth-middleware';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseAuthMiddleware)
      .forRoutes(AppController);
  }
}
```

## Access the user

Once the token is validated, the user data will be added to the request. You can access it like so: 

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  index(@Req() request: Request) {
    console.log(request.user);
  }
}
```
