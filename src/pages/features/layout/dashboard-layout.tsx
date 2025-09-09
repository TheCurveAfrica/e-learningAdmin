import { useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Header from './header';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    const handleNotificationClick = () => {
        console.log('Notification clicked');
    };

    const handleProfileClick = () => {
        console.log('Profile clicked');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebar}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={closeMobileSidebar}
            />

            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                <Header
                    onNotificationClick={handleNotificationClick}
                    onProfileClick={handleProfileClick}
                    onMobileMenuClick={toggleMobileSidebar}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
