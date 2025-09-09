import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
    title?: string;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
    onMobileMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
    onNotificationClick,
    onProfileClick,
    onMobileMenuClick
}) => {
    return (
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-2">
            <div className="flex items-center justify-between">
                <div className="lg:hidden">
                    <button
                        onClick={onMobileMenuClick}
                        className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 flex justify-end">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onNotificationClick}
                            className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={onProfileClick}
                                className="flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-8 h-8 bg-[#FB8500] rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
