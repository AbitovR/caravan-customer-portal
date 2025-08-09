import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { registerSchema } from '@/lib/validations'

// Mock user storage (in production, use a real database)
const mockUsers: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists (mock)
    const existingUser = mockUsers.find(u => u.email === validatedData.email)
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }
    
    // Create mock user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
    }
    
    // Add to mock storage
    mockUsers.push(user)
    
    // Create mock token
    const token = Buffer.from(JSON.stringify({ 
      userId: user.id, 
      email: user.email 
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
      message: 'Registration successful (Demo Mode)',
    })
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    
    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}