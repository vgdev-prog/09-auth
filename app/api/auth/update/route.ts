import { NextRequest, NextResponse } from 'next/server';
import { externalApi } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const cookieStore = await cookies();

        const response = await externalApi.put('/auth/update', body, {
            headers: {
                'Cookie': cookieStore.toString()
            }
        });

        const data = response.data as User;
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        );
    }
}