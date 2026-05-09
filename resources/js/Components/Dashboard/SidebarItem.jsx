import { Link } from '@inertiajs/react';

export default function SidebarItem({ href, active, children, icon: Icon }) {
    return (
        <a
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                active 
                    ? 'bg-orange-50 text-[#FF7A00] font-bold shadow-sm shadow-orange-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <div className={`transition-transform duration-200 group-hover:scale-110 ${active ? 'text-[#FF7A00]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                {Icon}
            </div>
            <span className="text-sm tracking-wide">{children}</span>
            {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF7A00]"></div>
            )}
        </a>
    );
}
