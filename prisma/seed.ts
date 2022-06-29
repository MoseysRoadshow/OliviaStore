import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getProducts().map((product) => {
            return db.product.create({ data: product });
        }),
    );
}

seed();

function getProducts() {
    return [
        {
            name: 'Cool couch',
            price: 100,
            image: 'test_photo.webp',
        },
        {
            name: 'Another couch',
            price: 100,
            image: 'stuff.jpeg',
        },
        {
            name: 'Yet another couch',
            price: 100,
            image: 'stuff.jpeg',
        },
        {
            name: 'Best couch',
            price: 100,
            image: 'stuff.jpeg',
        },
        {
            name: 'Buy this couch',
            price: 100,
            image: 'stuff.jpeg',
        },
        {
            name: 'Make out couch',
            price: 100,
            image: 'stuff.jpeg',
        },
        {
            name: 'Sexy couch',
            price: 100,
            image: 'stuff.jpeg',
        },
    ];
}
