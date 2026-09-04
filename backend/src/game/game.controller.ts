import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('rawg/:id')
  async getRawgDetails(@Param('id') id: string) {
    const apiKey = process.env.RAWG_KEY;

    const res = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${apiKey}`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await res.json();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@User() user: any) {
    return this.gameService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: any) {
    return this.gameService.findOne(Number(id), user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any, @User() user: any) {
    return this.gameService.create(data, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @User() user: any) {
    return this.gameService.delete(Number(id), user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/description')
  updateDescription(
    @Param('id') id: string,
    @Body('description') description: string,
    @User() user: any,
  ) {
    return this.gameService.updateDescription(Number(id), description, user.id);
  }

  // personal rating endpoint
  @UseGuards(JwtAuthGuard)
  @Patch(':id/personal-rating')
  updatePersonalRating(
    @Param('id') id: string,
    @Body('personalRating') personalRating: number,
    @User() user: any,
  ) {
    return this.gameService.updatePersonalRating(
      Number(id),
      personalRating,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      user.id,
    );
  }
}
