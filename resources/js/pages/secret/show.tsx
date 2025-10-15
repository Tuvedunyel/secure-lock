import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/layouts/home-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Show({ title, secret, id, status }: { title: string; secret: string; id: number; status: string }) {
    const { delete: destroy } = useForm();
    const initialMessage = secret;
    const handleDelete = () => {
        destroy(route('secret.destroySecret', id), {
            onSuccess: () => {
                console.log('Secret deleted');
            },
        });
    };

    if (status !== 'deleted') {
        setTimeout(() => {
            handleDelete();
        }, 60000);
    }

    return (
        <>
            <Head title="Studio Fleutoya - Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Studio Fleutoya, site personnel" />
            </Head>
            <HomeLayout>
                <Header />
                <main>
                    <main>
                        <div className="container m-auto flex h-full min-h-[75vh] flex-col items-center justify-center gap-4">
                            <h1 className="mb-4 text-2xl font-bold text-foreground">{title}</h1>
                            <p className="mb-2 text-xl text-foreground">{initialMessage}</p>
                        </div>
                    </main>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
