import { Body, Controller, Get, Param, Post, Delete } from "@nestjs/common";
import { GameService } from "./game.service";

@Controller("games")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gameService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: any){
    return this.gameService.create(data);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.gameService.delete(Number(id));
  }
}
