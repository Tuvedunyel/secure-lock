import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { withAppLayout } from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedCollection, Secret } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Plus, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secrets',
        href: '/dashboard/secrets',
    },
];

type Props = { collection: PaginatedCollection<Secret> };

export default withAppLayout(breadcrumbs, ({ collection }: Props) => {
    return (
        <>
            <Head title="Administration - Secret" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableCell colSpan={5}>
                        <Button asChild variant="outline" className="w-full">
                            <Link href={route('secret.create')}>
                                <Plus />
                                Envoyer un nouveau secret
                            </Link>
                        </Button>
                    </TableCell>
                    {collection.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.recipient}</TableCell>
                            <TableCell>
                                <Button variant={item.status === 'deleted' ? 'destructive' : 'outline'}>{item.status}</Button>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                    <Button asChild size="icon" variant="outline">
                                        <Link href="#">
                                            <Edit size={16} />
                                        </Link>
                                    </Button>
                                    <Button asChild size="icon" variant="destructive-outline">
                                        <Link href="#" onBefore={() => confirm('Voulez-vous vraiment supprimer ce secret ?')}>
                                            <Trash size={16} />
                                        </Link>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
});
