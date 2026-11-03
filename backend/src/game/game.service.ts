/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.game.findMany({
      where: { userId },
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number, userId: number) {
    return this.prisma.game.findFirst({
      where: {
        id,
        userId,
      },
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
          connect: { id: userId },
        },
      },
    });
  }

  delete(id: number, userId: number) {
    return this.prisma.game.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
  async updateDescription(id: number, description: string, userId: number) {
    const result = await this.prisma.game.updateMany({
      where: { id, userId },
      data: { description },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: 'Game not found or unauthorized',
      };
    }

    return {
      success: true,
      message: 'Description updated successfully',
    };
  }

  // update personal rating
  async updatePersonalRating(
    id: number,
    personalRating: number,
    userId: number,
  ) {
    const result = await this.prisma.game.updateMany({
      where: { id, userId },
      data: { personalRating },
    });

    if (result.count === 0) {
      return {
        success: false,
        message: 'Game not found or unauthorized',
      };
    }

    return {
      success: true,
      message: 'Personal rating updated',
    };
  }

  // add games to favorite
  async updateFavorite(gameId: number, userId: number, isFavorite: boolean) {
    return this.prisma.game.updateMany({
      where: { id: gameId, userId },
      data: { isFavorite },
    });
  }

  // get counter favorite games
  async getFavoriteCount(userId: number) {
    return this.prisma.game.count({
      where: {
        userId,
        isFavorite: true,
      },
    });
  }

  // update hours played
  async updateHoursPlayed(id: number, userId: number, hoursPlayed: number){

    const game = await this.prisma.game.findFirst({
      where: { id, userId },
    });

    if (!game) return null;

    const previous = game.hoursPlayed ?? 0;
    const diff = hoursPlayed - previous;

    // if you dont played today, nu adaugam in history
    if (diff <= 0) {
      return this.prisma.game.update({
        where: { id },
        data: { hoursPlayed },
      });
    }

    const today = new Date().toISOString().slice(0, 10); // get only the date part
    const history = Array.isArray(game.playHistory) ? game.playHistory : []; // ensure its an array

    history.push({
      date: today,
      hours: diff,
    });

    return this.prisma.game.update({
      where: { id },
      data: {
        hoursPlayed,
        playHistory: history,
      },
    });
  }

  // update lastPlayed
  async updateLastPlayed(id: number, userId: number, lastPlayed: Date){
    return this.prisma.game.updateMany({
      where: { id, userId },
      data: { lastPlayed },
    });
  }

  // get weekly activity method
  async getWeeklyActivity(userId: number, days: number) {
    const games = await this.prisma.game.findMany({
      where: { userId },
    });

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const result: {
      title: string;
      total: number;
      daily: { date: string; hours: number }[];
    }[] = [];

    for (const game of games) {
      const history = Array.isArray(game.playHistory)
        ? (game.playHistory as { date: string; hours: number }[])
        : [];
      const filteredHistory = history.filter((entry) => {
        if (!entry || typeof entry.date !== 'string') return false;
        return new Date(entry.date) >= cutoff;
      });
      const total = filteredHistory.reduce((sum, entry) => {
        const hours = typeof entry.hours === 'number' ? entry.hours : 0;
        return sum + hours;
      }, 0);

      if (total > 0) {
        result.push({
          title: game.title ?? 'Unknown Title',
          total,
          daily: filteredHistory,
        });
      }
    }
    return result.sort((a, b) => b.total - a.total).slice(0, 10); // sort by total hours and return top 10
  }
}
