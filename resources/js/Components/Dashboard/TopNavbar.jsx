import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';

export default function TopNavbar({ onMenuButtonClick }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between">
            {/* Left side: Mobile menu toggle & Title */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuButtonClick}
                    className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-600 hover:text-[#FF7A00] transition-all"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                </button>
                <div className="hidden md:flex items-center gap-4">
                    <h1 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-r border-gray-100 pr-4">Dashboard Area</h1>
                    <a 
                        href="/" 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-500 hover:text-orange-100 bg-orange-100 hover:bg-[#FF7A00] transition-all font-bold text-xs uppercase tracking-wider"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                        Home
                    </a>
                </div>
            </div>

            {/* Right side: Search, Notifications, Profile */}
            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden sm:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-transparent focus-within:border-orange-200 focus-within:bg-white transition-all group">
                    <svg className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF7A00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input type="text" placeholder="Search anything..." className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 placeholder-gray-400 w-32 md:w-48" />
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2.5 rounded-full text-gray-400 hover:bg-gray-50 hover:text-[#FF7A00] transition-all relative">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>

                <div className="relative">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group">
                                <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#FF7A00] font-bold text-sm shadow-sm group-hover:scale-105 transition-transform overflow-hidden border border-orange-200">
                                    {user.mentor?.avatar_url ? (
                                        <img src={user.mentor.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </div>
                                <span className="hidden md:block text-sm font-bold text-gray-700">{user.name}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <div className="px-4 py-3 border-b border-gray-50">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Signed in as</p>
                                <p className="text-sm font-black text-[#FF7A00] uppercase truncate leading-none">{user.role_label}</p>
                            </div>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
}
