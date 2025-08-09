import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations'
import { z } from 'zod'
import * as bcrypt from 'bcryptjs'

// Demo users for testing (in production, use a real database)
const demoUsers = [
  {
    id: 'demo1',
    email: 'demo@example.com',
    password: '$2a$10$K7L1OVwPQhPCy1h3eP/XZO90H2QxJMvZ5CKm0ZG7yxHKfDmZlS8FK', // password: demo123
    firstName: 'Demo',
    lastName: 'User',
    phone: '(555) 123-4567',
    role: 'customer',
  },
  {
    id: 'admin1',
    email: 'admin@caravantransport.io',
    password: '$2a$10$K7L1OVwPQhPCy1h3eP/XZO90H2QxJMvZ5CKm0ZG7yxHKfDmZlS8FK', // password: demo123
    firstName: 'Admin',
    lastName: 'User',
    phone: '(555) 987-6543',
    role: 'admin',
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = loginSchema.parse(body)
    
    // Find user in demo users
    const user = demoUsers.find(u => u.email === validatedData.email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // For demo, accept any password or check against demo password
    // In production, properly verify the password
    const isValidPassword = validatedData.password === 'demo123' || 
                           await bcrypt.compare(validatedData.password, user.password).catch(() => false)
    
    if (!isValidPassword && validatedData.password !== 'demo123') {
      return NextResponse.json(
        { error: 'Invalid email or password. Hint: Use password "demo123"' },
        { status: 401 }
      )
    }
    
    // Generate simple JWT token for demo
    const token = Buffer.from(JSON.stringify({ 
      userId: user.id, 
      email: user.email,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    })).toString('base64')
    
    // Create response with token in cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      message: 'Login successful! (Demo Mode)',
    })
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    console.log('User logged in (demo):', user.email)
    
    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}