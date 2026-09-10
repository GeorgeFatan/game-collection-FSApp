import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Request() req) {
    return {
      id: req.user.id,
      email: req.user.email,
    };
  }
}
