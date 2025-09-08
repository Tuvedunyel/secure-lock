import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/layouts/home-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Show({ title, secret, id, status }: { title: string; secret: string; id: number; status: string }) {
    const { delete: destroy } = useForm();
    const handleDelete = () => {
        destroy(route('secret.destroy', id), {
            onSuccess: () => {
                console.log('Secret deleted');
            },
        });
    };

    useEffect(() => {
        if (status !== 'deleted')
            return () => {
                handleDelete();
            };
    }, []);

    return (
        <>
            <Head title="Secret Lock - Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Secret Lock, the solution to exchange secret informations with minimum risk " />
            </Head>
            <HomeLayout>
                <Header />
                <main>
                    <h1 className="mb-4 text-2xl font-bold text-[#1b1b18] dark:text-[#EDEDEC]">{title}</h1>
                    <p className="mb-2 text-xl text-[#1b1b18] dark:text-[#EDEDEC]">{secret}</p>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
