import React, { useState, useEffect } from 'react';
import { sidebarSections } from '@/components/ui/sidebar-item';
import { MenuItem, SidebarSection } from '@/types/ui-type';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface SidebarProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    isCollapsed = false,
    isMobileOpen = false,
    onMobileClose
}) => {
    const [activeItem, setActiveItem] = useState('/dashboard');
    const navigate = useNavigate();

    const handleItemClick = (href: string) => {
        setActiveItem(href);
        navigate(href);
        if (onMobileClose) {
            onMobileClose();
        }
    };

    const handleOverlayClick = () => {
        if (onMobileClose) {
            onMobileClose();
        }
    };

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileOpen]);

    return (
        <>
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    onClick={handleOverlayClick}
                />
            )}

            <div
                className={`
                    bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out z-50
                    
                    lg:relative lg:translate-x-0
                    
                    fixed left-0 top-0 w-64 
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <div className="p-4">
                    <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <img src="/Logo.png" alt="Logo" className=" w-auto" />
                            </div>

                        {onMobileClose && (
                            <button
                                onClick={onMobileClose}
                                className="lg:hidden p-2 rounded-md text-black hover:text-gray-600 hover:bg-gray-100"
                                aria-label="Close sidebar"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
                    {sidebarSections.map((section: SidebarSection, sectionIndex: number) => (
                        <div key={sectionIndex} className="space-y-2">
                            {section.title &&(
                                <div className="px-3 py-1">
                                    <h3 className="text-base font-medium text-[#A4A5A6] uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                </div>
                            )}
                            {section.items.map((item: MenuItem) => {
                                const IconComponent = item.icon;
                                return (
                                    <div key={item.href}>
                                        <button
                                            onClick={() => handleItemClick(item.href)}
                                            className={`
                                            w-full flex items-center space-x-3 p-3 rounded-lg font-[400] transition-all duration-200
                                            
                                            ${activeItem === item.href
                                                    ? 'bg-[#FFE8D7] text-[#2D2F30]'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:bg-gray-200'
                                                }
                                            ${isCollapsed ? 'justify-center' : 'justify-start'}
                                        `}
                                            title={isCollapsed ? item.name : undefined}
                                        >
                                            <span className="flex-shrink-0">
                                                <IconComponent size={20} />
                                            </span>

                                            <div className="flex items-center justify-between w-full">
                                                <span className="font-[400] text-[#2D2F30]">{item.name}</span>
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
