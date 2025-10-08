import Footer from '@/components/footer';
import Header from '@/components/header';
import HomeLayout from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';
import { TrafficCone } from 'lucide-react';

export default function Welcome() {
    return (
        <>
            <Head title="Fleuttoya  - Accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Fleuttoya , the solution to exchange secret informations with minimum risk " />
            </Head>
            <HomeLayout>
                <Header />
                <main>
                    <div className="container m-auto flex h-full min-h-[75vh] items-center justify-center gap-4">
                        <TrafficCone className="stroke-[#1b1b18] dark:stroke-[#EDEDEC]" />
                        <h1 className="text-2xl font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">Under construction</h1>
                    </div>
                </main>
                <Footer />
            </HomeLayout>
        </>
    );
}
