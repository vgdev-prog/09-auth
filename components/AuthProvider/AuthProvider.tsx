"use client"

import {ReactNode, useEffect} from "react";
import {useAuthStore} from "@/lib/store/authStore";
import {checkSession, getCurrentUser} from "@/lib/api/api";

interface Props {
    children: ReactNode
}

const AuthProvider = ({children}: Props) => {
    const {setUser,clearIsAuthenticated,isAuthenticated,user} = useAuthStore()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const isAuthenticated = await checkSession();
                if (isAuthenticated) {
                    const user = await getCurrentUser();
                    if (user) setUser(user);
                } else {
                    clearIsAuthenticated()
                }
            } catch (error) {
                clearIsAuthenticated()
            }
        }
        fetchUser();
    }, [setUser, clearIsAuthenticated])

    return children;
}

export default AuthProvider;