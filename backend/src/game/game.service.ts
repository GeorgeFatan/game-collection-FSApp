import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  
  findAll(userId: number) {
    return this.prisma.game.findMany({
      where: { userId },
      orderBy: { id: 'desc' }
    });
  }

  
  findOne(id: number, userId: number) {
    return this.prisma.game.findFirst({
      where: {
        id,
        userId
      }
    });
  }

  
  create(data: any, userId: number) {
    return this.prisma.game.create({
      data: {
        title: data.title,
        coverUrl: data.coverUrl,
        description: data.description,
        genre: data.genre,
        releaseDate: data.releaseDate,
        rating: data.rating,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  
  delete(id: number, userId: number) {
    return this.prisma.game.deleteMany({
      where: {
        id,
        userId
      }
    });
  }
}
