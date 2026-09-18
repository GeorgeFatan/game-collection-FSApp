/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // profile pic
  async updateAvatar(userId: number, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
      select: {
        id: true,
        email: true,
        avatarUrl: true,
      },
    });
  }

  async uploadAvatar(userId: number, file: Express.Multer.File) {
    const fileName = `avatar-${userId}-${Date.now()}.jpg`;

    const { data, error } = await this.supabase.storage
      .from('profile-picture')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });
    const publicUrl = this.supabase.storage
      .from('profile-picture')
      .getPublicUrl(fileName).data.publicUrl;

    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: publicUrl },
    });

    return { url: publicUrl };
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        avatarUrl: true,
      },
    });
  }
}
