import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    );
}