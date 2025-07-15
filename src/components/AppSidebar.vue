<script setup lang="ts">
import NavFooter from './NavFooter.vue';
import NavMain from './NavMain.vue';
import NavUser from './NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import type { NavItem } from '../types/index.d.ts';
import { BookOpen, Folder, LayoutGrid, Bot,FileStack ,ChartCandlestick,TrendingUp   } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Bot',
        href: '/bot',
        icon: Bot,
    },
    {
        title: 'Analyse',
        href: '/analyse',
        icon: ChartCandlestick,
    },
    {
        title: 'Strategie',
        href: '/strategie',
        icon: FileStack ,
    },
    {
        title: 'Marché',
        href: '/marche',
        icon: TrendingUp ,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Github Repo',
        href: 'https://github.com/laravel/vue-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <router-link :to="{ name: 'dashboard' }">
                            <AppLogo />
                        </router-link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
