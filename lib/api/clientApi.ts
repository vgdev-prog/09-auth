import {type Note} from "@/types/note";
import {User} from "@/types/user";
import {CheckSessionRequest, LoginCredentials, RegisterData, RefreshTokenResponse} from "@/types/auth";
import {ApiError, NoteResponse, Sorting, clientApi} from "@/lib/api/api";

export type { ApiError };

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

    const response = await clientApi.get(`/notes?${params.toString()}`);
    return response.data;
}

export const getNoteById = async (id: string): Promise<Note> => {
    const response = await clientApi.get(`/notes/${id}`);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await clientApi.delete(`/notes/${id}`);
    return response.data;
}

export const createNote = async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const response = await clientApi.post('/notes', noteData);
    return response.data;
}

export const registerUser = async (userData: RegisterData): Promise<User> => {
    const response = await clientApi.post<User>('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
    const response = await clientApi.post<User>('/auth/login', credentials);
    return response.data;
};

export const logoutUser = async (): Promise<void> => {
    await clientApi.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await clientApi.get('/users/me');
    return response.data;
};

export const checkSession = async (): Promise<CheckSessionRequest> => {
    const response = await clientApi.get<CheckSessionRequest>('/auth/session');
    return response.data;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const response = await clientApi.post<RefreshTokenResponse>('/auth/refresh');
    return response.data;
}

export const updateUser = async (userData: Partial<Pick<User, 'username'>>): Promise<User> => {
    const response = await clientApi.patch('/users/me', userData);
    return response.data;
}