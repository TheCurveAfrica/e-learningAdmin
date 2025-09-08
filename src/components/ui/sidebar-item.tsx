import { SidebarSection } from "@/types/ui-type";
import {
    Home,
    Users as Students,
    Video,
    Compass,
    BookOpenCheck,
    Trophy,
    Settings,
    Calendar,
    Megaphone,
    FileCog,
    UserRound
} from "lucide-react";

export const sidebarSections: SidebarSection[] = [
    {
        items: [
            { name: 'Home', href: '/dashboard', icon: Home },
            { name: 'Students', href: '/dashboard/students', icon: Students },
        ]
    },
    {
        title: 'TOOLS',
        items: [
            { name: 'Classes', href: '/dashboard/classes', icon: Video },
            { name: 'Learning path', href: '/dashboard/learning-path', icon: Compass },
            { name: 'Assessment', href: '/dashboard/assessment', icon: BookOpenCheck },
            { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
            { name: 'Leader Board', href: '/dashboard/leaderboard', icon: Trophy },
            { name: 'Announcements', href: '/dashboard/announcements', icon: Megaphone }
        ]
    },
    {
        title: 'ACCOUNT',
        items: [
            { name: 'Users', href: '/dashboard/users', icon: UserRound },
            { name: 'Audit Trail', href: '/dashboard/audit-trail', icon: FileCog },
            { name: 'Settings', href: '/dashboard/settings', icon: Settings },
        ]
    }
];