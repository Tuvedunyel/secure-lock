import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type TSecret = {
    id: number;
    user_id: number;
    title: string;
    recipient: string;
    secret: string;
    status: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secrets',
        href: '/dashboard/secrets',
    },
];

export default function Index({ secrets }: { secrets: TSecret[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <h1>Secrets</h1>
                    </div>
                    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <a href={route('secret.create')}>Add a secret to share</a>
                    </div>
                </div>
                <div className="relative flex min-h-[100vh] flex-1 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                        {secrets.length > 0 ? (
                            secrets.map((secret) => (
                                <div
                                    key={secret.id}
                                    className="flex flex-col items-start justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <h2 className="text-lg font-semibold">{secret.title}</h2>
                                    <a className="mt-2 text-xs font-bold" href={`mailto:${secret.recipient}`}>
                                        {secret.recipient}
                                    </a>
                                    <small className="my-2 text-sm font-semibold text-gray-600 dark:text-gray-400">{secret.status}</small>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{secret.secret}</p>
                                </div>
                            ))
                        ) : (
                            <strong>There's currently no secrets</strong>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
