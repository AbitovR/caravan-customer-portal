import { PrismaClient } from '@prisma/client'
import { hashPassword, generateReferralCode } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@caravantransport.io' },
    update: {},
    create: {
      email: 'admin@caravantransport.io',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      emailVerified: true,
    },
  })

  // Create test customer
  const customerPassword = await hashPassword('customer123')
  const customer = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '(555) 123-4567',
      role: 'CUSTOMER',
      emailVerified: true,
    },
  })

  // Create referral for customer
  await prisma.referral.create({
    data: {
      referrerId: customer.id,
      referredEmail: '',
      code: generateReferralCode(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    },
  })

  // Create test quote
  const quote = await prisma.quote.create({
    data: {
      userId: customer.id,
      pickupLocation: 'Los Angeles, CA',
      deliveryLocation: 'New York, NY',
      vehicleMake: 'Toyota',
      vehicleModel: 'Camry',
      vehicleYear: 2022,
      vehicleType: 'Sedan',
      transportType: 'open',
      preferredDate: new Date('2024-02-01'),
      flexibleDates: false,
      price: 1250,
      distance: 2800,
      estimatedDays: 7,
      notes: 'Please handle with care',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  })

  // Create test order
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      quoteId: quote.id,
      orderNumber: 'ORD-2024-001',
      trackingNumber: 'TRK1234567890',
      status: 'IN_TRANSIT',
      pickupAddress: '123 Main St, Los Angeles, CA 90210',
      deliveryAddress: '456 Broadway, New York, NY 10001',
      pickupDate: new Date('2024-01-15'),
      deliveryDate: new Date('2024-01-22'),
      actualPickupDate: new Date('2024-01-15'),
      carrierName: 'Express Transport LLC',
      carrierPhone: '(555) 987-6543',
      driverName: 'Mike Johnson',
      driverPhone: '(555) 123-9876',
      totalAmount: 1250,
      depositAmount: 250,
      balanceAmount: 1000,
      notes: 'Standard transport service',
    },
  })

  // Create tracking updates
  const trackingUpdates = [
    {
      orderId: order.id,
      status: 'Order Confirmed',
      location: 'Los Angeles, CA',
      description: 'Your order has been confirmed and assigned to a carrier',
      createdAt: new Date('2024-01-15T08:00:00Z'),
    },
    {
      orderId: order.id,
      status: 'Vehicle Picked Up',
      location: 'Los Angeles, CA',
      description: 'Vehicle picked up from pickup location',
      createdAt: new Date('2024-01-15T14:00:00Z'),
    },
    {
      orderId: order.id,
      status: 'In Transit',
      location: 'Phoenix, AZ',
      description: 'Vehicle is in transit through Arizona',
      createdAt: new Date('2024-01-17T10:00:00Z'),
    },
    {
      orderId: order.id,
      status: 'In Transit',
      location: 'Denver, CO',
      description: 'Vehicle passed through Colorado',
      createdAt: new Date('2024-01-19T15:00:00Z'),
    },
  ]

  for (const update of trackingUpdates) {
    await prisma.trackingUpdate.create({
      data: update,
    })
  }

  // Create test payment
  await prisma.payment.create({
    data: {
      userId: customer.id,
      orderId: order.id,
      amount: 250,
      status: 'COMPLETED',
      method: 'card',
      description: 'Deposit payment',
      processedAt: new Date('2024-01-15T09:00:00Z'),
    },
  })

  // Create test support ticket
  const ticket = await prisma.supportTicket.create({
    data: {
      userId: customer.id,
      subject: 'Question about delivery time',
      description: 'Hi, I wanted to check on the expected delivery date for my vehicle. Can you provide an update?',
      category: 'shipping',
      priority: 'medium',
      status: 'OPEN',
    },
  })

  // Create ticket message
  await prisma.ticketMessage.create({
    data: {
      ticketId: ticket.id,
      senderId: customer.id,
      message: 'Hi, I wanted to check on the expected delivery date for my vehicle. Can you provide an update?',
    },
  })

  // Create notification
  await prisma.notification.create({
    data: {
      userId: customer.id,
      title: 'Order Status Update',
      message: 'Your vehicle is now in transit and on its way to the destination.',
      type: 'order_update',
      metadata: { orderId: order.id },
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('👤 Admin user: admin@caravantransport.io / admin123')
  console.log('👤 Customer user: john@example.com / customer123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })