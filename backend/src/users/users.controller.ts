import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User, AuthUser } from '../auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('avatar')
  @UseGuards(JwtAuthGuard)
  updateAvatar(@Body('avatarUrl') avatarUrl: string, @User() user: AuthUser) {
    return this.usersService.updateAvatar(user.id, avatarUrl);
  }
}
