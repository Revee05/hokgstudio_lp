import { Head, usePage } from '@inertiajs/react';

export default function AuthLayout({ children, image }) {
    const { settings } = usePage().props;

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
            <Head>
                <link rel="icon" type="image/x-icon" href={settings.favicon} />
            </Head>
            <div className="bg-white w-full max-w-6xl rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl min-h-[600px]">
                {/* Left Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
                    {children}
                </div>

                {/* Right Side: Image */}
                <div className="hidden md:block w-1/2 p-4">
                    <div
                        className="w-full h-full rounded-[32px] bg-cover bg-center"
                        style={{ backgroundImage: `url('/images/auth_bg.png')` }}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
}
