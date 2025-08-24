import { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
    title: "Profile - NoteHub",
    description: "Manage your NoteHub profile. View and edit your account information, settings, and preferences.",
    openGraph: {
        title: "Profile - NoteHub",
        description: "Manage your NoteHub profile. View and edit your account information, settings, and preferences.",
        url: "https://08-zustand-henna.vercel.app/profile",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub - Profile Page",
            },
        ],
    },
    robots: {
        index: false,
        follow: false,
    },
};

const ProfilePage = () => {
    return <ProfileClient />;
};

export default ProfilePage;