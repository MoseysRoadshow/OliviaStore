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
            price: '100',
            featured: true,
        },
        {
            name: 'Another couch',
            price: '100',
            featured: false,
        },
        {
            name: 'Yet another couch',
            price: '100',
            featured: false,
        },
        {
            name: 'Best couch',
            price: '100',
            featured: false,
        },
        {
            name: 'Buy this couch',
            price: '100',
            featured: false,
        },
        {
            name: 'Make out couch',
            price: '100',
            featured: false,
        },
        {
            name: 'Sexy couch',
            price: '100',
            featured: false,
        },
    ];
}
