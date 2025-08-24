import { NextRequest, NextResponse } from 'next/server'
import { type Note } from '@/types/note'
import { externalApi } from '@/lib/api/serverApi'
import { cookies } from 'next/headers'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const cookieStore = await cookies()
        const response = await externalApi.get(`/notes/${id}`, {
            headers: {
                'Cookie': cookieStore.toString()
            }
        })

        const data = response.data as Note
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching note:', error)
        return NextResponse.json(
            { error: 'Failed to fetch note' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    try {
        const cookieStore = await cookies()
        await externalApi.delete(`/notes/${id}`, {
            headers: {
                'Cookie': cookieStore.toString()
            }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting note:', error)
        return NextResponse.json(
            { error: 'Failed to delete note' },
            { status: 500 }
        )
    }
}