import {
  Controller,
  Patch,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User, AuthUser } from '../auth/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('avatar')
  @UseGuards(JwtAuthGuard)
  updateAvatar(@Body('avatarUrl') avatarUrl: string, @User() user: AuthUser) {
    return this.usersService.updateAvatar(user.id, avatarUrl);
  }

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User() user: AuthUser,
  ) {
    return this.usersService.uploadAvatar(user.id, file);
  }
}
