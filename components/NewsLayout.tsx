"use client";

import { ReactNode } from "react";

interface NewsLayoutProps {
    children: ReactNode;
    sidebar?: ReactNode;
}

export default function NewsLayout({ children, sidebar }: NewsLayoutProps) {
    return (
        <div className="w-full max-w-[1920px] mx-auto border-x-heavy border-editorial-border bg-editorial-paper min-h-screen">
            <div className="grid-newspaper">
                {/* Main Content Column */}
                <div className="bg-white min-h-[800px]">
                    {children}
                </div>

                {/* Sidebar Column */}
                <aside className="bg-editorial-paper min-h-[400px] border-l-heavy border-editorial-border md:border-l-0">
                    <div className="sticky top-0">
                        {sidebar || (
                            <div className="p-4 text-center text-editorial-gray text-sm italic">
                                Sidebar Content Area
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
