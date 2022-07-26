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
            slug: 'cc',
            price: 100,
            images: ['test_photo.webp', 'stuff.jpeg'],
            featuredImage: 'test_photo.webp',
            description: 'A cool couch',
            details: 'Details details details',
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
        {
            name: 'Another couch',
            slug: 'ac',
            price: 100,
            featuredImage: 'stuff.jpeg',
            images: ['test_photo.webp', 'stuff.jpeg'],
            description: 'A cool couch',
            details: 'Details details details',
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
        {
            name: 'Yet another couch',
            slug: 'yac',
            price: 100,
            featuredImage: 'stuff.jpeg',
            description: 'A cool couch',
            details: 'Details details details',
            images: ['test_photo.webp', 'stuff.jpeg'],
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
        {
            name: 'Best couch',
            slug: 'bc',
            price: 100,
            featuredImage: 'stuff.jpeg',
            description: 'A cool couch',
            details: 'Details details details',
            images: ['test_photo.webp', 'stuff.jpeg'],
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
        {
            name: 'Buy this couch',
            slug: 'btc',
            price: 100,
            featuredImage: 'stuff.jpeg',
            description: 'A cool couch',
            details: 'Details details details',
            images: ['test_photo.webp', 'stuff.jpeg'],
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
        {
            name: 'Make out couch',
            slug: 'moc',
            price: 100,
            featuredImage: 'stuff.jpeg',
            description: 'A cool couch',
            details: 'Details details details',
            images: ['test_photo.webp', 'stuff.jpeg'],
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
        {
            name: 'Sexy couch',
            slug: 'sc',
            price: 100,
            featuredImage: 'stuff.jpeg',
            description: 'A cool couch',
            details: 'Details details details',
            images: ['test_photo.webp', 'stuff.jpeg'],
            category: {
                connect: {
                    id: 'cl5yhmr2o01480sdj8nzivewf',
                },
            },
        },
    ];
}
