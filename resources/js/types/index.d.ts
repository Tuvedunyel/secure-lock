import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type PaginatedCollection<T> = {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: string;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
};

export interface Secret {
    id: number;
    name: string;
    message: string;
    recipient: string;
    status: 'sent' | 'deleted';
    title: string;
    secret: string;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    flash: {
        success?: string;
        error?: string;
    };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
