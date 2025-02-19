import { PropsWithChildren, useState } from "react";
import { Head } from "@inertiajs/react";
import { User } from "@/types";
import { AppSidebar } from "@/Components/app-sidebar";
import { Breadcrumbs } from "@/Components/Breadcrumb";
import { Separator } from "@/Components/ui/separator";
import { ModeToggle } from "@/Components/ThemeToggle";
import Chat from "@/Components/Chat";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/sonner";
import { motion } from "framer-motion";

export default function Authenticated({ auth_user, header, children }: PropsWithChildren<{ auth_user: User; header?: string }>) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <SidebarProvider>
      <Head title={header} />
      <AppSidebar user={auth_user} />
      <SidebarInset className="!mt-0 flex flex-col h-full">
        <header className="flex sticky top-0 z-10 gap-2 items-center h-16 border-b shrink-0 bg-background">
          <div className="flex gap-2 items-center px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs user={auth_user} />
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 pt-8">{children}</div>
        <Toaster />
      </SidebarInset>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isChatOpen && (
        <motion.div
        initial={{ opacity: 0, y: -50, x:-30 }}
        animate={{ opacity: 1, y: -3, x:-30 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "relative",
          backgroundColor: "#2563eb", // Tailwind's bg-blue-600
          color: "white",
          fontSize: "1rem",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        Hi! I'm Marwen
      </motion.div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
        >
          {/* Robot Face SVG */}
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">

          <rect x="20" y="20" width="160" height="160" rx="30" ry="30" fill="#a6d5f7" stroke="#333333" stroke-width="5"/>


          <circle cx="70" cy="80" r="20" fill="#ffffff" stroke="#333333" stroke-width="3"/>
          <circle cx="130" cy="80" r="20" fill="#ffffff" stroke="#333333" stroke-width="3"/>
          <circle cx="70" cy="80" r="10" fill="#333333"/>
          <circle cx="130" cy="80" r="10" fill="#333333"/>

          <path d="M60 130 Q100 170 140 130" stroke="#333333" stroke-width="5" fill="transparent" stroke-linecap="round"/>

          <line x1="100" y1="20" x2="100" y2="10" stroke="#333333" stroke-width="5"/>
          <circle cx="100" cy="10" r="8" fill="#ff6f61"/>


          <circle cx="50" cy="110" r="10" fill="#ff6f61" opacity="0.8"/>
          <circle cx="150" cy="110" r="10" fill="#ff6f61" opacity="0.8"/>
        </svg>
        </button>
      </div>

      {/* Animated Chat Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isChatOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-16 right-6 w-[1000px] h-[800px] bg-white shadow-xl rounded-lg p-4 border flex flex-col ${
          isChatOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-semibold text-gray-700">Marwen AI Chat</span>
          <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-red-500">
            ✖
          </button>
        </div>
        <Chat />
      </motion.div>
    </SidebarProvider>
  );
}
