import Sidebar from '@/Components/Dashboard/Sidebar';
import TopNavbar from '@/Components/Dashboard/TopNavbar';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { settings } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex">
            <Head>
                <link rel="icon" type="image/x-icon" href={settings.favicon} />
            </Head>
            {/* Sidebar Component (Desktop & Mobile) */}
            <Sidebar 
                logo={settings.logo} 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
            />
            
            {/* Mobile Overlay Background */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area Container */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
                {/* Top Modular Navbar */}
                <TopNavbar onMenuButtonClick={() => setSidebarOpen(true)} />
                
                {/* Header Section (Dynamic) */}
                {header && (
                    <header className="bg-white border-b border-gray-50">
                        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
                            {header}
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-12">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
