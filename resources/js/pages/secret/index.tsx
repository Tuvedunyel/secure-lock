import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

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
    const setStatusColor = (status: string): 'destructive' | 'default' | 'outline' | 'secondary' | null | undefined => {
        switch (status) {
            case 'sent':
                return 'outline';
            case 'deleted':
                return 'destructive';
            default:
                return 'default';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="align-center flex justify-between px-2 py-4">
                    <h1 className="text-4xl font-bold uppercase">Secrets</h1>
                    <Button className="cursor-pointer" asChild>
                        <a href={route('secret.create')}>
                            <Plus />
                            Send a new
                        </a>
                    </Button>
                </div>
                <div className="relative flex min-h-[100vh] flex-1 items-start justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                        {secrets.length > 0 ? (
                            secrets.map((secret) => (
                                <div
                                    key={secret.id}
                                    className="relative flex flex-col items-center justify-start gap-4 rounded-lg border border-gray-200 p-4 text-center shadow-sm dark:border-gray-700"
                                >
                                    <h2 className="text-2xl font-semibold">{secret.title}</h2>
                                    <a className="text-md font-bold" href={`mailto:${secret.recipient}`}>
                                        {secret.recipient}
                                    </a>
                                    <div className="flex items-center gap-2">
                                        <small>Status :</small>
                                        <Badge variant={setStatusColor(secret.status)} className="py-0.5 text-sm font-semibold capitalize">
                                            {secret.status}
                                        </Badge>
                                    </div>
                                    {secret.status === 'deleted' && <p className="text-sm text-gray-600 dark:text-gray-400">{secret.secret}</p>}
                                    <Link
                                        className="absolute top-5 right-5 h-[35px] w-[35px] cursor-pointer rounded-full bg-[#82181a] p-2"
                                        href={route('secret.destroy', secret.id)}
                                        method="delete"
                                    >
                                        <span className="sr-only">{`Delete ${secret.title}`}</span>
                                        <Trash2 className="h-[20px] w-[20px] cursor-pointer" />
                                    </Link>
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
