'use client';

import css from './page.module.css';
import {useAuthStore} from "@/lib/store/authStore";
import Link from 'next/link';
import Image from 'next/image';

const ProfileClient = () => {
    const {user} = useAuthStore();

    return (
        <div className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <Image
                        src={user?.avatar || "/default-avatar.png"}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username || 'N/A'}
                    </p>
                    <p>
                        Email: {user?.email || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileClient;