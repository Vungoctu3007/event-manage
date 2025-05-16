import React from "react";
import Sidebar from "./OrganizerSidebar";
import Header from "./OrganizerHeader";
import { Toaster } from "@/components/ui/toaster";
interface OrganizerLayoutProps {
    children: React.ReactNode;
}

const OrganizerLayout: React.FC<OrganizerLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <Toaster />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default OrganizerLayout;
