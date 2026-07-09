import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Dacă vrei un user default:
  await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "hashed-password", // pune ceva temporar
    },
  });

  // Dacă NU vrei user default, lasă main gol:
  // (și creezi user-ul din /auth/register)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
