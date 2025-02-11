"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { Link } from "@inertiajs/react";

import {
  LayoutDashboard
} from "lucide-react";

export function NavMain({
  items,
  currentPath,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    visible?:boolean;
    items?: {
      title: string;
      url: string;
      visible?:boolean
    }[];
  }[];
  currentPath: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={route('dashboard')}>
            <SidebarMenuButton tooltip="Dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {items.map((item) => {
          if (item.visible === false) return null;
          // Check if any subitem URL matches the current window location
          const isCollapsibleOpen = item.items?.some(
            (subItem) => window.location.href === subItem.url
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isCollapsibleOpen || item.isActive} // Open if any subitem matches the URL or item is active
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                      if (subItem.visible === false) return null; // Skip item if visible is false

                      const isActive = window.location.href === subItem.url;
                      return (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className={isActive ? "active" : ""}
                        >
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url} preserveState={true}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
