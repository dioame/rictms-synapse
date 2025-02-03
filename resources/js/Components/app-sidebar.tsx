import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Dock,
  ShieldCheck,
  Construction,
  GitGraphIcon
} from "lucide-react"

import { NavMain } from "@/Components/nav-main"
import { NavProjects } from "@/Components/nav-projects"
import { NavUser } from "@/Components/nav-user"
import { TeamSwitcher } from "@/Components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar"

import { route } from "ziggy-js"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SyNAPSE",
      logo: GalleryVerticalEnd,
      plan: "Mabuhay!",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Software Development",
      url: "#",
      icon: Dock,
      isActive: false,
      items: [
        {
          title: "All Apps",
          url: route('application.index'),
        },
        {
          title: "Pending",
          url:route('application.pending'),
        },
        {
          title: "Approved",
          url:route('application.approved'), 
        },
        {
          title: "Cancelled",
          url:route('application.cancelled'), 
        },
      ],
    },
    {
      title: "SQA",
      url: "#",
      icon: ShieldCheck,
      isActive: false,
      items: [
        {
          title: "Test Cases",
          url: route('application.sqa.test-case.index'),
        },
        {
          title: "UAT",
          url: route('application.sqa.uat.index'),
        },
      ],
    },
    {
      title: "ICT Equipments",
      url: "#",
      icon: Construction,
      isActive: false,
      items: [
        {
          title: "Inventory",
          url: route('ict-inventory.index'),
        },
        {
          title: "CCTV",
          url: '#',
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: GitGraphIcon,
      isActive: false,
      items: [
        {
          title: "SQA Test Plan",
          url: route('reports.sqa-test-plan'),
        },
      ],
    },
    {
      title: "Libraries",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Deployment Requirements",
          url: route('lib-deployment-req.index'),
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "User",
          url: route('users.index'),
        },
      ],
    },
  ],
  projects: [
    {
      name: "Developers Area",
      url: "#",
      icon: Frame,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: any;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const currentPath = window.location.pathname;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
      <NavMain items={data.navMain} currentPath={currentPath} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
