import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  // Returnează DOAR jocurile userului logat
  findAll(userId: number) {
    return this.prisma.game.findMany({
      where: { userId },
      orderBy: { id: 'desc' } // opțional, cele mai noi primele
    });
  }

  // Returnează un singur joc (doar dacă aparține userului)
  findOne(id: number, userId: number) {
    return this.prisma.game.findFirst({
      where: {
        id,
        userId
      }
    });
  }

  // Creează jocul pentru userul logat
  create(data: any, userId: number) {
    return this.prisma.game.create({
      data: {
        title: data.title,
        coverUrl: data.coverUrl,
        description: data.description,
        genre: data.genre,
        platform: data.platform,
        releaseDate: data.releaseDate,
        rating: data.rating,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  // Șterge jocul DOAR dacă aparține userului logat
  delete(id: number, userId: number) {
    return this.prisma.game.deleteMany({
      where: {
        id,
        userId
      }
    });
  }
}
