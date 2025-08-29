import Footer from '@/components/footer';
import Header from '@/components/header';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import HomeLayout from '@/layouts/home-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function CreateSecret() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ title: string; recipient: string; secret: string }>>({
        title: '',
        recipient: '',
        secret: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('secret.store'), {
            onFinish: () => reset('title', 'recipient', 'secret'),
        });
    };
    return (
        <>
            <Head title="Share a secret">
                <meta name="description" content="Share a secret with someone securely." />
                <meta name="keywords" content="share, secret, secure, message" />
                <meta name="robots" content="index, follow" />
            </Head>
            <HomeLayout>
                <Header />
                <main>
                    <form className="container m-auto" onSubmit={submit}>
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label className="text-white" htmlFor="recipient">
                                    Title
                                </Label>
                                <Input
                                    id="recipient"
                                    type="text"
                                    name="recipient"
                                    placeholder="The recipient of the secret"
                                    value={data.title}
                                    autoFocus
                                    onChange={(e) => setData('title', e.target.value)}
                                />

                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-white" htmlFor="recipient">
                                    Who will receive this secret ?
                                </Label>
                                <Input
                                    id="recipient"
                                    type="email"
                                    name="recipient"
                                    placeholder="The recipient of the secret"
                                    value={data.recipient}
                                    autoFocus
                                    onChange={(e) => setData('recipient', e.target.value)}
                                />

                                <InputError message={errors.recipient} />
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-white" htmlFor="secret">
                                    Secret
                                </Label>
                                <Textarea
                                    id="secret"
                                    name="secret"
                                    placeholder="Your Secret"
                                    value={data.secret}
                                    onChange={(e) => setData('secret', e.target.value)}
                                />

                                <InputError message={errors.secret} />
                            </div>

                            <div className="flex items-center">
                                <Button className="w-full" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Share this secret
                                </Button>
                            </div>
                        </div>
                    </form>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
