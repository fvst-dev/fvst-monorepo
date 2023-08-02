'use client';
import Link from 'next/link';
import { Logo } from './components/logo';
import { UserButton } from './components/user-button';
import { ListBulletIcon, LockOpenIcon, UserIcon } from '@heroicons/react/24/outline';
import { DropDownMenu } from './components/drop-down-menu';

const authRoutes = [
  {
    name: 'Sign in',
    description: 'Sign in through Clerk to have access to the todo app.',
    href: '/sign-in',
    icon: LockOpenIcon,
  },
  {
    name: 'Sign up',
    description: 'Sign up through Clerk to have access to the todo app.',
    href: '/sign-up',
    icon: LockOpenIcon,
  },
  {
    name: 'User profile',
    description: 'View your profile.',
    href: '/user-profile',
    icon: UserIcon,
  },
];

const apps = [
  {
    name: 'Todo App',
    description: 'Example graphql application.',
    href: '/todos',
    icon: ListBulletIcon,
  },
];

export const Header = () => {
  return (
    <div className="mx-auto mb-12 max-w-7xl font-light text-white">
      <div className="flex items-center justify-between gap-4">
        <div className="flex justify-start">
          <Link href="/">
            <span className="sr-only">https://fvst.dev/</span>
            <Logo className="h-20 w-20" />
          </Link>
        </div>

        <div className="flex gap-6">
          <DropDownMenu title={'Apps'} items={apps} />
          <DropDownMenu title={'Routes'} items={authRoutes} />
        </div>

        <div className="flex items-center justify-end">
          <UserButton />
        </div>
      </div>
    </div>
  );
};
