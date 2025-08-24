import { NextRequest, NextResponse } from 'next/server'
import { type Note } from '@/types/note'
import { externalApi } from '@/app/api/serverApi'
import { cookies } from 'next/headers'

interface NoteResponse {
    notes: Note[]
    totalPages: number
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const cookieStore = await cookies()

        const response = await externalApi.get(`/notes?${searchParams.toString()}`, {
            headers: {
                'Cookie': cookieStore.toString()
            }
        })

        const data = response.data as NoteResponse
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching notes:', error)
        return NextResponse.json(
            { error: 'Failed to fetch notes' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const cookieStore = await cookies()
        
        const response = await externalApi.post('/notes', body, {
            headers: {
                'Cookie': cookieStore.toString()
            }
        })

        const data = response.data as Note
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error('Error creating note:', error)
        return NextResponse.json(
            { error: 'Failed to create note' },
            { status: 500 }
        )
    }
}
