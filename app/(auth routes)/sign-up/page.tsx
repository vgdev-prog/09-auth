'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './page.module.css';
import {ApiError, registerUser} from "@/app/api/api";
import {useAuthStore} from "@/store/authStore";

const SignUpPage = () => {
    const {setUser} = useAuthStore();
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setError('');
        setIsLoading(true);

        const userData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
           const res =  await registerUser(userData);
           if (res) {
               setUser(res)
               router.push('/profile');
           } else {
               setError('Invalid email or password');
           }
        } catch (err) {
            setError(
                (err as ApiError).response?.data?.error ??
                (err as ApiError).message ??
                'Oops... some error'
            )
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} action={handleSubmit}>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton} disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
};

export default SignUpPage;