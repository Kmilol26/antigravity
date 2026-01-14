import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // 1. Create Business
    const business = await prisma.business.create({
        data: {
            name: 'Grupo El Fabuloso',
            contact: 'Juan Perez',
            phone: '+57 300 123 4567',
            website: 'www.grupoelfabuloso.com',
            instagram: '@grupoelfabuloso',
            address: 'Calle 85 # 11-53, Bogota',
            logo: 'https://placehold.co/200x200/ff7f50/white?text=Fabuloso',
            banner: 'https://placehold.co/1200x400/2a2a2a/white?text=Una+Sola+Experiencia',
            categoryMessage: 'Entretenimiento y Vida Nocturna',
        },
    })

    // 2. Create Plans
    const basicPlan = await prisma.plan.create({
        data: {
            name: 'Básico',
            price: 99.00,
            features: JSON.stringify(['Gestión de espacios', 'Eventos limitados', 'Soporte básico']),
            businesses: {
                connect: { id: business.id }
            }
        }
    })

    const proPlan = await prisma.plan.create({
        data: {
            name: 'Pro',
            price: 199.00,
            features: JSON.stringify(['Gestión ilimitada', 'Analítica avanzada', 'Soporte 24/7']),
        }
    })

    // 3. Create Spaces
    const space1 = await prisma.space.create({
        data: {
            name: 'El Fabuloso Rooftop',
            description: 'La mejor vista de la ciudad con coctelería de autor.',
            capacity: 300,
            category: 'Rooftop',
            status: 'active',
            images: JSON.stringify(['https://placehold.co/600x400/2a2a2a/white?text=Rooftop+View']),
        }
    })

    const space2 = await prisma.space.create({
        data: {
            name: 'Salón Principal',
            description: 'Espacio para grandes eventos y conciertos.',
            capacity: 800,
            category: 'Discoteca',
            status: 'active',
            images: JSON.stringify(['https://placehold.co/600x400/1a1a1a/white?text=Stage']),
        }
    })

    // 4. Create Events
    const event1 = await prisma.event.create({
        data: {
            title: 'Sunset Party',
            description: 'Música house al atardecer.',
            date: new Date('2025-06-15T16:00:00Z'),
            startTime: new Date('2025-06-15T16:00:00Z'),
            endTime: new Date('2025-06-16T02:00:00Z'),
            capacity: 200,
            price: 50.00,
            status: 'published',
            spaceId: space1.id,
            images: JSON.stringify(['https://placehold.co/600x400/orange/white?text=Sunset']),
        }
    })

    const event2 = await prisma.event.create({
        data: {
            title: 'Noche de Salsa',
            description: 'Los mejores clásicos de la salsa en vivo.',
            date: new Date('2025-06-20T21:00:00Z'),
            startTime: new Date('2025-06-20T21:00:00Z'),
            endTime: new Date('2025-06-21T04:00:00Z'),
            capacity: 500,
            price: 30.00,
            status: 'published',
            spaceId: space2.id,
            images: JSON.stringify(['https://placehold.co/600x400/red/white?text=Salsa']),
        }
    })

    // 5. Create Guests & Sales
    for (let i = 0; i < 20; i++) {
        await prisma.guest.create({
            data: {
                name: `Guest ${i + 1}`,
                email: `guest${i + 1}@example.com`,
                status: i % 3 === 0 ? 'approved' : 'pending',
                eventId: event1.id,
                qrCode: `QR-${event1.id}-${i}`,
            }
        })

        if (i % 2 === 0) {
            await prisma.sale.create({
                data: {
                    amount: 50.00,
                    status: 'completed',
                    buyerName: `Guest ${i + 1}`,
                    buyerEmail: `guest${i + 1}@example.com`,
                    eventId: event1.id,
                }
            })
        }
    }

    // 6. Connect Business to Invoice
    await prisma.invoice.create({
        data: {
            amount: 99.00,
            status: 'paid',
            dueDate: new Date('2025-05-01'),
            paidAt: new Date('2025-05-01'),
            businessId: business.id
        }
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
