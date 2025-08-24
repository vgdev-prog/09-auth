'use client';

import css from './Header.module.css';
import Link from "next/link";
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/store/authStore';

interface Props {
    className?: string
}


const Header = ({}: Props) => {
    const { isAuthenticated } = useAuthStore();

    return (
        <header className={`${css.header}`}>
           <div className={`container ${css.headerRow}`}>
               <Link href='/'
                     area-label='Home'
               >NoteHub</Link>

               <nav aria-label='Main Navigation'>
                   <ul className={css.navigation}>
                       <li>
                           <Link href='/'>
                               Home
                           </Link>
                       </li>
                       {isAuthenticated && (
                           <li>
                               <TagsMenu />
                           </li>
                       )}
                       <AuthNavigation />
                   </ul>
               </nav>
           </div>
        </header>
    );

};
export default Header