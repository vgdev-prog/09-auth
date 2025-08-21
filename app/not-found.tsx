import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
    title: "Page Not Found - NoteHub",
    description: "The page you are looking for does not exist on NoteHub. Please check the URL or return to the homepage.",
    openGraph: {
        title: "Page Not Found - NoteHub",
        description: "The page you are looking for does not exist on NoteHub. Please check the URL or return to the homepage.",
        url: "https://08-zustand-henna.vercel.app/404",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub - Page Not Found",
            },
        ],
    },
};

const NotFound = () => {
    return (
        <div className={css.containerWrapper}>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};
export default NotFound