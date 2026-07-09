import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.game.create({
        data: {
            title: "WWF RAW",
            coverUrl: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/cob22m.jpg",
            description: "WWF RAW este un joc de lupte profesional, lansat în 2005. Jocul combină elemente de wrestling, personaje celebre și o experiență de joc intensă.",
            genre: "Fighting",
            platform: "PC, PS2, Xbox",
            releaseDate: "2001",
            rating: "6 / 10",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });