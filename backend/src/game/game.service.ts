import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany();
  }

  findOne(id: number) {
    return this.prisma.game.findUnique({ where: { id } });
  }

  create(data: any)
  {
    return this.prisma.game.create({data});
  }

  delete(id: number){
    return this.prisma.game.delete({where: {id}});
  }

}
