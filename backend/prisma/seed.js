const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.deck.create({
        data: {
            userId: 1,  // Ganti dengan ID user valid
            name: "My First Deck",
            description: "Deck pertama saya"
        },
    });

    console.log("Deck berhasil dimasukkan!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
