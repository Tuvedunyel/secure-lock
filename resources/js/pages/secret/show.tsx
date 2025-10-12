import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/layouts/home-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Show({ title, secret, id, status }: { title: string; secret: string; id: number; status: string }) {
    const { delete: destroy } = useForm();
    const handleDelete = () => {
        console.log('deleting');
        destroy(route('secret.destroySecret', id), {
            onSuccess: () => {
                console.log('Secret deleted');
            },
        });
    };

    useEffect(() => {
        console.log('useEffect called');
        if (status !== 'deleted') {
            handleDelete();
        }
    });

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
                            <h1 className="mb-4 text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">{title}</h1>
                            <p className="mb-2 text-xl text-[#1b1b18] dark:text-[#EDEDEC]">{secret}</p>
                        </div>
                    </main>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
