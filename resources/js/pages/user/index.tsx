import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type TUser = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/dashboard/users',
    },
];

export default function Index({ users }: { users: TUser[] }) {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="align-center flex justify-between px-2 py-4">
                    <h1 className="text-4xl font-bold uppercase">Users</h1>
                </div>
                <div className="relative flex min-h-[100vh] flex-1 items-start justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex flex-col items-center justify-start gap-4 rounded-lg border border-gray-200 p-4 text-center shadow-sm dark:border-gray-700"
                                >
                                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                                    <div className="flex items-center gap-4">
                                        <small>Status :</small>
                                        {!user.email_verified_at && (
                                            <Badge variant="destructive" className="py-0.5 text-sm font-semibold capitalize">
                                                Not Verified
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <strong>There's currently no users registered</strong>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
