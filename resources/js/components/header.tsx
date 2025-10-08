import AppLogo from '@/components/app-logo';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="mb-10 w-full py-4 text-sm not-has-[nav]:hidden">
            <div className="container m-auto flex items-center justify-between">
                <a
                    href={route('home')}
                    className="peer/menu-button flex h-12 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-[#1b1b18] ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground dark:text-[#EDEDEC] [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0"
                >
                    <AppLogo />
                </a>
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
