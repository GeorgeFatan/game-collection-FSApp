import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}


  @Get('rawg/:id')
  async getRawgDetails(@Param('id') id: string){
    const apiKey = process.env.RAWG_KEY;

    const res = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${apiKey}`
    );
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

}
