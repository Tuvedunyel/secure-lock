import TopActions from '@/components/top-actions';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { withAppLayout } from '@/layouts/app-layout';
import type { BreadcrumbItem, Secret } from '@/types';
import { useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    secret: Secret;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secrets',
        href: '/dashboard/secrets',
    },
    {
        title: 'Éditer',
        href: '',
    },
];
export default withAppLayout<Props>(breadcrumbs, ({ secret }) => {
    const { data, setData, post, processing, reset, errors } = useForm<
        Required<{ name: string; title: string; recipient: string; message: string; secret: string }>
    >({
        name: '',
        title: '',
        recipient: '',
        message: '',
        secret: '',
    });

    const handleCreate: FormEventHandler = (e) => {
        e.preventDefault();

        post(
            route('secret.store', {
                preserveScroll: true,
                onFinish: () => reset('name', 'title', 'recipient', 'message', 'secret'),
            }),
        );
    };

    return (
        <form onSubmit={handleCreate} className="space-y-4">
            <FormField label="Nom" htmlFor="name" error={errors['name']}>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    name="name"
                    defaultValue={secret.name}
                    aria-invalid={!!errors['name']}
                    placeholder="Jon Doe"
                />
            </FormField>
            <FormField label="Titre" htmlFor="title" error={errors['title']}>
                <Input
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    defaultValue={secret.title}
                    aria-invalid={!!errors['title']}
                    placeholder="Mon super secret"
                />
            </FormField>
            <FormField label="Destinataire" htmlFor="recipient" error={errors['recipient']}>
                <Input
                    type="email"
                    id="recipient"
                    name="recipient"
                    value={data.recipient}
                    onChange={(e) => setData('recipient', e.target.value)}
                    defaultValue={secret.recipient}
                    aria-invalid={!!errors['recipient']}
                    placeholder="jondoe@email.com"
                />
            </FormField>
            <FormField label="Message" htmlFor="message" error={errors['message']}>
                <Textarea
                    id="message"
                    name="message"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    defaultValue={secret.message}
                    aria-invalid={!!errors['message']}
                    placeholder="Tapez votre message ici"
                />
            </FormField>
            <FormField label="Secret" htmlFor="secret" error={errors['secret']}>
                <Textarea
                    id="secret"
                    name="secret"
                    value={data.secret}
                    onChange={(e) => setData('secret', e.target.value)}
                    defaultValue={secret.secret}
                    aria-invalid={!!errors['secret']}
                    placeholder="Tapez votre secret ici"
                />
            </FormField>
            <TopActions>
                <Button disabled={processing}>
                    <Save /> Enregistrer
                </Button>
            </TopActions>
        </form>
    );
});

// import InputError from '@/components/input-error';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import AppLayout from '@/layouts/app-layout';
// import { BreadcrumbItem } from '@/types';
// import { Head, useForm } from '@inertiajs/react';
// import { ChevronsLeft, LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';
//
// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Secrets',
//         href: '/dashboard/secrets',
//     },
// ];
//
// export default function CreateSecret() {
//     const { data, setData, post, processing, errors, reset } = useForm<
//         Required<{ title: string; name: string; message: string; recipient: string; secret: string }>
//     >({
//         title: '',
//         name: '',
//         recipient: '',
//         message: '',
//         secret: '',
//     });
//
//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//
//         post(route('secret.store'), {
//             onFinish: () => reset('title', 'name', 'recipient', 'message', 'secret'),
//         });
//     };
//     return (
//         <>
//             <AppLayout breadcrumbs={breadcrumbs}>
//                 <Head title="Tableau de bord" />
//                 <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
//                     <div className="align-center flex justify-between px-2 py-4">
//                         <h1 className="text-4xl font-bold uppercase">Send a new secret</h1>
//                         <Button className="cursor-pointer" asChild>
//                             <a href={route('secret.create')}>
//                                 <ChevronsLeft />
//                                 Go back
//                             </a>
//                         </Button>
//                     </div>
//                     <div className="relative flex min-h-[100vh] flex-1 items-start justify-center overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
//                         <div className="flex w-full items-center justify-center gap-4 p-4">
//                             <form className="container m-auto w-full xl:w-fit xl:min-w-[500px]" onSubmit={submit}>
//                                 <div className="space-y-6">
//                                     <div className="grid gap-2">
//                                         <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="recipient">
//                                             Title
//                                         </Label>
//                                         <Input
//                                             id="recipient"
//                                             type="text"
//                                             name="recipient"
//                                             placeholder="My awesome password to share"
//                                             value={data.title}
//                                             autoFocus
//                                             onChange={(e) => setData('title', e.target.value)}
//                                             className="text-[#1b1b18] dark:text-[#EDEDEC]"
//                                         />
//
//                                         <InputError message={errors.title} />
//                                     </div>
//
//                                     <div className="grid gap-2">
//                                         <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="recipient">
//                                             Name of the receiver
//                                         </Label>
//                                         <Input
//                                             id="name"
//                                             type="text"
//                                             name="name"
//                                             placeholder="Jane Doe"
//                                             value={data.name}
//                                             autoFocus
//                                             onChange={(e) => setData('name', e.target.value)}
//                                             className="text-[#1b1b18] dark:text-[#EDEDEC]"
//                                         />
//
//                                         <InputError message={errors.name} />
//                                     </div>
//
//                                     <div className="grid gap-2">
//                                         <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="recipient">
//                                             Email of the receiver
//                                         </Label>
//                                         <Input
//                                             id="recipient"
//                                             type="email"
//                                             name="recipient"
//                                             placeholder="myreceiver@test.com"
//                                             value={data.recipient}
//                                             autoFocus
//                                             onChange={(e) => setData('recipient', e.target.value)}
//                                             className="text-[#1b1b18] dark:text-[#EDEDEC]"
//                                         />
//
//                                         <InputError message={errors.recipient} />
//                                     </div>
//
//                                     <div className="grid gap-2">
//                                         <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="message">
//                                             Message
//                                         </Label>
//                                         <Textarea
//                                             id="message"
//                                             name="message"
//                                             placeholder="Hello, here the password you ask for the server..."
//                                             value={data.message}
//                                             onChange={(e) => setData('message', e.target.value)}
//                                             className="text-[#1b1b18] dark:text-[#EDEDEC]"
//                                         />
//
//                                         <InputError message={errors.message} />
//                                     </div>
//
//                                     <div className="grid gap-2">
//                                         <Label className="text-[#1b1b18] dark:text-[#EDEDEC]" htmlFor="secret">
//                                             Secret
//                                         </Label>
//                                         <Textarea
//                                             id="secret"
//                                             name="secret"
//                                             placeholder="Your Secret"
//                                             value={data.secret}
//                                             onChange={(e) => setData('secret', e.target.value)}
//                                             className="text-[#1b1b18] dark:text-[#EDEDEC]"
//                                         />
//
//                                         <InputError message={errors.secret} />
//                                     </div>
//
//                                     <div className="flex items-center">
//                                         <Button className="w-full" disabled={processing}>
//                                             {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                                             Send
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </AppLayout>
//         </>
//     );
// }
