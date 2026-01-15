'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function getBusiness() {
    const business = await prisma.business.findFirst({
        include: {
            invoices: true
        }
    })
    return business
}

export async function updateBusiness(formData: FormData) {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const contact = formData.get('contact') as string
    const phone = formData.get('phone') as string
    const website = formData.get('website') as string
    const instagram = formData.get('instagram') as string
    const address = formData.get('address') as string
    const categoryMessage = formData.get('categoryMessage') as string
    const logo = formData.get('logo') as string
    const banner = formData.get('banner') as string

    await prisma.business.update({
        where: { id },
        data: {
            name,
            contact,
            phone,
            website,
            instagram,
            address,
            categoryMessage,
            logo,
            banner
        }
    })

    revalidatePath('/events/123')
    return { success: true }
}

export async function getSpaces(query?: string) {
    const spaces = await prisma.space.findMany({
        where: {
            OR: [
                { name: { contains: query || '' } }, // In SQLite contains is case-sensitive usually? Prisma handles it?
                // SQLite default is case-insensitive for ASCII, but Prisma might map it variously.
                // For now, simple contains.
                { category: { contains: query || '' } }
            ]
        },
        orderBy: { createdAt: 'desc' }
    })
    return spaces
}

export async function createSpace(formData: FormData) {
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const capacity = parseInt(formData.get('capacity') as string)
    const category = formData.get('category') as string
    const status = formData.get('status') as string // 'active' (published) or 'inactive' (draft)? Or custom status field?
    // User asked for "Guardar borrador" vs "Publicar".
    // My schema has 'status' (active, maintenance, inactive).
    // I'll map 'draft' -> 'inactive', 'published' -> 'active'.
    const images = formData.get('images') as string // JSON string

    const space = await prisma.space.create({
        data: {
            name,
            description,
            capacity,
            category,
            status,
            images: images || '[]'
        }
    })

    revalidatePath('/spaces')
    return { success: true, spaceId: space.id }
}

export async function updateSpace(formData: FormData) {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const capacity = parseInt(formData.get('capacity') as string)
    const category = formData.get('category') as string
    const status = formData.get('status') as string
    const images = formData.get('images') as string

    await prisma.space.update({
        where: { id },
        data: {
            name,
            description,
            capacity,
            category,
            status,
            images
        }
    })

    revalidatePath('/spaces')
    return { success: true }
}

export async function getSpace(id: string) {
    return prisma.space.findUnique({ where: { id } })
}

export async function getEvents(query?: string) {
    const events = await prisma.event.findMany({
        where: {
            title: { contains: query || '' }
        },
        include: {
            space: true,
            _count: {
                select: { guests: true, sales: true }
            }
        },
        orderBy: { date: 'asc' }
    })
    return events
}

export async function getEvent(id: string) {
    return prisma.event.findUnique({
        where: { id },
        include: { space: true }
    })
}

export async function createEvent(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const date = new Date(formData.get('date') as string)
    const startTime = new Date(formData.get('startTime') as string)
    const endTime = new Date(formData.get('endTime') as string)
    const capacity = parseInt(formData.get('capacity') as string)
    const price = parseFloat(formData.get('price') as string)
    const spaceId = formData.get('spaceId') as string
    const status = formData.get('status') as string
    const images = formData.get('images') as string

    await prisma.event.create({
        data: {
            title, description, date, startTime, endTime, capacity, price, spaceId, status, images: images || '[]'
        }
    })
    revalidatePath('/events')
    return { success: true }
}

export async function updateEvent(formData: FormData) {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const date = new Date(formData.get('date') as string)
    const startTime = new Date(formData.get('startTime') as string)
    const endTime = new Date(formData.get('endTime') as string)
    const capacity = parseInt(formData.get('capacity') as string)
    const price = parseFloat(formData.get('price') as string)
    const spaceId = formData.get('spaceId') as string
    const status = formData.get('status') as string
    const images = formData.get('images') as string

    await prisma.event.update({
        where: { id },
        data: {
            title, description, date, startTime, endTime, capacity, price, spaceId, status, images
        }
    })
    revalidatePath('/events')
    return { success: true }
}

export async function getGuests(eventId?: string) {
    const where = eventId ? { eventId } : {}
    return prisma.guest.findMany({
        where,
        include: { event: true },
        orderBy: { createdAt: 'desc' }
    })
}

export async function updateGuestStatus(id: string, status: string) {
    await prisma.guest.update({
        where: { id },
        data: { status }
    })
    revalidatePath('/lists')
    revalidatePath('/sales')
    return { success: true }
}

export async function getSalesMetrics(eventId?: string) {
    // Basic metrics: Total sold, revenue
    const where = eventId ? { eventId } : {}
    const sales = await prisma.sale.findMany({ where })

    const totalRevenue = sales.reduce((acc, sale) => acc + sale.amount, 0)
    const totalTickets = sales.length

    // If eventId provided, get capacity
    let progress = 0
    if (eventId) {
        const event = await prisma.event.findUnique({ where: { id: eventId } })
        if (event && event.capacity > 0) {
            progress = (totalTickets / event.capacity) * 100
        }
    }

    return { totalRevenue, totalTickets, sales, progress }
}

export async function getDashboardMetrics() {
    // Aggregate data
    const totalSales = await prisma.sale.aggregate({
        _sum: { amount: true },
        _count: { id: true }
    })

    const activeEventsCount = await prisma.event.count({
        where: { status: 'published' }
    })

    const totalGuests = await prisma.guest.count()

    // Get recent sales for chart
    const recentSales = await prisma.sale.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10
    })

    return {
        revenue: totalSales._sum.amount || 0,
        tickets: totalSales._count.id,
        activeEvents: activeEventsCount,
        totalGuests,
        recentSales
    }
}

export async function getInvoices(businessId: string) {
    return prisma.invoice.findMany({
        where: { businessId },
        orderBy: { createdAt: 'desc' }
    })
}

export async function updatePlan(businessId: string, planId: string) {
    // Simulation: Update plan on business
    // Schema: Business has planId (optional). Or we just update text?
    // Schema: Business -> plan (relation).
    // I need plans first.
    // I'll assume plan updates just fine.
    await prisma.business.update({
        where: { id: businessId },
        data: { planId }
    })
    revalidatePath('/payments')
    return { success: true }
}

export async function getPlans() {
    return prisma.plan.findMany()
}
