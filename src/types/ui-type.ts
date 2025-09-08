export interface MenuItem {
    name: string;
    href: string;
    icon: React.ComponentType<any>;
    badge?: string | number;
}

export interface SidebarSection {
    title?: string;
    items: MenuItem[];
}

