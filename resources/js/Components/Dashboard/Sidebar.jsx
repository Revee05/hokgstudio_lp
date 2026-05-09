import { Link, usePage } from '@inertiajs/react';
import SidebarItem from './SidebarItem';

export default function Sidebar({ logo, isOpen, onClose }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const dashboardUrl = route('dashboard');

    return (
        <aside className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Logo Section */}
            <div className="h-20 flex items-center px-8 border-b border-gray-50">
                <a href="/" className="flex items-center group">
                    <img src={logo} alt="Logo" className="h-10 transition-transform group-hover:scale-105" />
                </a>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 overflow-y-auto px-4 py-8 space-y-2">
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4">Main Menu</p>
                
                <SidebarItem 
                    href={dashboardUrl} 
                    active={route().current('dashboard')}
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>}
                >
                    Dashboard
                </SidebarItem>

                {/* Mentor Specific Menu */}
                {user.role === 'mentor' && (
                    <>
                        <SidebarItem 
                            href={route('mentor.courses.index')} 
                            active={route().current('mentor.courses.*')}
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
                        >
                            Manage Courses
                        </SidebarItem>

                        <SidebarItem 
                            href={route('mentor.quizzes.index')} 
                            active={route().current('mentor.quizzes.*')}
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>}
                        >
                            Quiz Review
                        </SidebarItem>

                        <SidebarItem 
                            href={route('mentor.bundles.index')} 
                            active={route().current('mentor.bundles.*')}
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>}
                        >
                            Bundle Courses
                        </SidebarItem>
                    </>
                )}

                {/* Student Specific Menu (User/Member) */}
                {(user.role === 'user' || user.role === 'member') && (
                    <>
                        <SidebarItem 
                            href={dashboardUrl} 
                            active={route().current('dashboard')}
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
                        >
                            My Learning
                        </SidebarItem>

                        <SidebarItem 
                            href={route('courses.index')} 
                            active={route().current('courses.index')}
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>}
                        >
                            Browse Catalog
                        </SidebarItem>
                    </>
                )}

                <SidebarItem 
                    href={route('profile.edit')} 
                    active={route().current('profile.edit')}
                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                >
                    Profile
                </SidebarItem>
            </div>

            {/* Footer Section */}
            <div className="p-4 border-t border-gray-50">
                <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Logged in as:</p>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-[#FF7A00] font-bold text-xs uppercase overflow-hidden border border-orange-200">
                            {user.mentor?.avatar_url ? (
                                <img src={user.mentor.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                user.name.charAt(0)
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-gray-900 truncate leading-tight">{user.name}</span>
                            <span className="text-[10px] text-gray-500 truncate font-medium">
                                {user.mentor?.profession || 'Profesi belum diatur'}
                            </span>
                            <span className="text-[9px] text-gray-400 truncate">
                                {user.mentor?.city || 'Lokasi belum diatur'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
