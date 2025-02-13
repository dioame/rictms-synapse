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
  Shield,
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



interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: any;
}


export function AppSidebar({ user, ...props }: AppSidebarProps) {
const hasRole = (role: string) => user.roles.some((r: any) => r.name === role);

console.log(user.roles);
console.log(hasRole('user'));

  const data = {
    user: {
      name: user.username,
      email: "m@example.com",
      avatar: user.avatar,
    },
    teams: [
      {
        name: 'SyNAPS',
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
        title: "Software Deployment",
        url: "#",
        icon: Dock,
        isActive: false,
        items: [
      
          {
            title: "Requests",
            url: route('application-request.index'),
          },
          {
            title: "Applications",
            url: route('application.index'),
          },
          {
            title: "For PIA",
            url: "#",
            visible: !hasRole('user'),
          },
          {
            title: "SQA Test Cases",
            url: route('application.sqa.test-case.index'),
            visible: !hasRole('user'),
          },
          {
            title: "SQA UAT",
            url: route('application.sqa.uat.index'),
            visible: !hasRole('user'),
          },
          {
            title: "Database Section",
            url: "#",
            visible: !hasRole('user'),
          },
          {
            title: "Server Section",
            url: "#",
            visible: !hasRole('user'),
          },
          
          // {
          //   title: "Pending",
          //   url:route('application.pending'),
          // },
          // {
          //   title: "Approved",
          //   url:route('application.approved'), 
          // },
          // {
          //   title: "Cancelled",
          //   url:route('application.cancelled'), 
          // },
        ],
      },
      // {
      //   title: "SQA",
      //   url: "#",
      //   icon: ShieldCheck,
      //   isActive: false,
      //   items: [
      //     {
      //       title: "Test Cases",
      //       url: route('application.sqa.test-case.index'),
      //     },
      //     {
      //       title: "UAT",
      //       url: route('application.sqa.uat.index'),
      //     },
      //   ],
      // },
      {
        title: "Inventory",
        url: "#",
        icon: Construction,
        isActive: false,
        items: [
          {
            title: "Software Subscription",
            url: route('software-subscription.index'),
          },
          {
            title: "ICT Equipments",
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
        visible: !hasRole('user'),
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
        visible: !hasRole('user'),
        items: [
          {
            title: "Deployment Requirements",
            url: route('lib-deployment-req.index'),
          },
        ],
      },
      {
        title: "Security/Assessment",
        url: "#",
        icon: Shield,
        isActive: false,
        items: [
          {
            title: "Security",
            url: route('security.index'),
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        isActive: false,
        visible: !hasRole('user'),
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
