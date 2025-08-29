import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';

export default function Show({ title, secret }: { title: string; secret: string }) {
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
                    <h1 className="text-[#1b1b18] dark:text-[#EDEDEC]">{title}</h1>
                    <p className="text-[#1b1b18] dark:text-[#EDEDEC]">{secret}</p>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
