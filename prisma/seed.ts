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

    // 3. Create Spaces (Matching UI Mockup) - With attractive Unsplash images
    const spaceData = [
        { name: 'Tabu Studio Bar', category: 'Electronica', capacity: 200, price: 20000, images: JSON.stringify(['https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600&h=800&fit=crop']), location: 'Cra 27 # 52-24' },
        { name: 'Toni-k Bar', category: 'Champeta', capacity: 150, price: 20000, images: JSON.stringify(['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop']), location: 'Cra 27 # 52-36' },
        { name: 'Cacao Blunt Bar', category: 'Reggaeton', capacity: 300, price: 20000, images: JSON.stringify(['https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&h=800&fit=crop']), location: 'Cr 50 # 12-63' },
        { name: 'Octava Club', category: 'House', capacity: 500, price: 40000, images: JSON.stringify(['https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=800&fit=crop']), location: 'Cra 8 # 63-41' },
        { name: 'Salvador', category: 'Electronica', capacity: 250, price: 30000, images: JSON.stringify(['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=800&fit=crop']), location: 'Cl 85 # 12-71' },
    ]

    const createdSpaces = []
    for (const s of spaceData) {
        const space = await prisma.space.create({
            data: {
                name: s.name,
                description: `El mejor ambiente de ${s.category}`,
                capacity: s.capacity,
                category: s.category,
                status: 'active',
                images: s.images,
                // Start adding price/location to schema if needed or just description
            }
        })
        createdSpaces.push(space)
    }

    const space1 = createdSpaces[0] // Tabu
    const space2 = createdSpaces[1] // Toni-k

    // 4. Create Events - With attractive Unsplash images
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
            images: JSON.stringify(['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop']),
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
            images: JSON.stringify(['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=800&fit=crop']),
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
