import { PrismaClient } from "@prisma/client";

export class Database {

  private static prismaClient: PrismaClient | null = null;

  static get() {
    if (Database.prismaClient === null) {
      Database.prismaClient = new PrismaClient();
    }
    return Database.prismaClient;
  }

}