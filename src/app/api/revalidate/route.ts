// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  revalidatePath('/blog')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}