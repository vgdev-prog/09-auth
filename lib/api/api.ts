import axios from 'axios';
import {type Note} from "@/types/note";
import {CheckSessionRequest, LoginCredentials, RegisterData, User} from "@/types/user";
import {internalApi} from "@/lib/api/clientApi";

export interface ApiError {
    response?: {
        data?: {
            error?: string;
        };
        status?: number;
    };
    message: string;
    status: number;
}



interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export enum Sorting {
    CREATED = 'created',
}

export const getAllNotes = async (
    search: string,
    page: number = 1,
    sorting: Sorting = Sorting.CREATED,
    perPage: number = 10,
    tag?: string
): Promise<NoteResponse> => {
    const params = new URLSearchParams({
        page: String(page),
        sortBy: sorting,
        perPage: String(perPage),
        ...(search && { search }),
        ...(tag && { tag })
    });

    const response = await internalApi.get(`/notes?${params.toString()}`);
    return response.data;
}

export const getNoteById = async (id: string): Promise<Note> => {
    const response = await internalApi.get(`/notes/${id}`);
    return response.data;
}

export const deleteNote = async (id: string): Promise<void> => {
    await internalApi.delete(`/notes/${id}`);
}

export const createNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const response = await internalApi.post('/notes', noteData);
    return response.data;
}

export const registerUser = async (userData: RegisterData): Promise<User> => {
    const response = await internalApi.post<User>('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials: LoginCredentials):Promise<User> => {
    const response = await internalApi.post<User>('/auth/login', credentials);
    return response.data;
};

export const logoutUser = async (): Promise<void> => {
    await internalApi.post('/auth/logout')
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await internalApi.get('/users/me');
    return response.data;
};

export const checkSession = async () => {
    const res = await internalApi.get<CheckSessionRequest>('/auth/session');
    return res.data.success;
}

export const updateUser = async (userData: Partial<Pick<User, 'username'>>): Promise<User> => {
    const response = await internalApi.patch('/users/me', userData);
    return response.data;
}