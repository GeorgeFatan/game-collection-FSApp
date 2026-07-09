import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { GameService } from "./game/game.service";
import { GameController } from "./game/game.controller";

@Module({
  imports: [],
  controllers: [GameController],
  providers: [PrismaService, GameService],
})
export class AppModule {}
