import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ChevronsLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secrets',
        href: '/dashboard/secrets',
    },
];

export default function CreateSecret() {
    const { data, setData, post, processing, errors, reset } = useForm<
        Required<{ title: string; name: string; message: string; recipient: string; secret: string }>
    >({
        title: '',
        name: '',
        recipient: '',
        message: '',
        secret: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('secret.store'), {
            onFinish: () => reset('title', 'name', 'recipient', 'message', 'secret'),
        });
    };
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <div className="align-center flex justify-between px-2 py-4">
                        <h1 className="text-4xl font-bold uppercase">Send a new secret</h1>
                        <Button className="cursor-pointer" asChild>
                            <a href={route('secret.create')}>
                                <ChevronsLeft />
                                Go back
                            </a>
                        </Button>
                    </div>
                    <div className="relative flex min-h-[100vh] flex-1 items-start justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <div className="flex w-full items-center justify-center gap-4 p-4">
                            <form className="container m-auto w-full xl:w-fit xl:min-w-[500px]" onSubmit={submit}>
                                <div className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="recipient">
                                            Title
                                        </Label>
                                        <Input
                                            id="recipient"
                                            type="text"
                                            name="recipient"
                                            placeholder="My awesome password to share"
                                            value={data.title}
                                            autoFocus
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="text-[#1b1b18] dark:text-[#EDEDEC]"
                                        />

                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="recipient">
                                            Name of the receiver
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Jane Doe"
                                            value={data.name}
                                            autoFocus
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="text-[#1b1b18] dark:text-[#EDEDEC]"
                                        />

                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="recipient">
                                            Email of the receiver
                                        </Label>
                                        <Input
                                            id="recipient"
                                            type="email"
                                            name="recipient"
                                            placeholder="myreceiver@test.com"
                                            value={data.recipient}
                                            autoFocus
                                            onChange={(e) => setData('recipient', e.target.value)}
                                            className="text-[#1b1b18] dark:text-[#EDEDEC]"
                                        />

                                        <InputError message={errors.recipient} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="message">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Hello, here the password you ask for the server..."
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="text-[#1b1b18] dark:text-[#EDEDEC]"
                                        />

                                        <InputError message={errors.message} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="secret">
                                            Secret
                                        </Label>
                                        <Textarea
                                            id="secret"
                                            name="secret"
                                            placeholder="Your Secret"
                                            value={data.secret}
                                            onChange={(e) => setData('secret', e.target.value)}
                                            className="text-[#1b1b18] dark:text-[#EDEDEC]"
                                        />

                                        <InputError message={errors.secret} />
                                    </div>

                                    <div className="flex items-center">
                                        <Button className="w-full" disabled={processing}>
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
