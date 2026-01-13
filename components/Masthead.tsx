"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Masthead() {
    const { language, setLanguage, t } = useLanguage();
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const toggleLanguage = () => {
        setLanguage(language === 'ko' ? 'en' : 'ko');
    };

    return (
        <header className="boxed-container border-t-[1px] border-transparent">
            {/* Optimized Responsive Header - Unified grid at 'lg' breakpoint */}
            <div className="flex flex-col lg:grid lg:grid-cols-[150px_1fr_300px] lg:divide-x divide-editorial-border border-b-[1px] border-editorial-border items-stretch">

                {/* 1. Brand/Logo Hub (+ Mobile Toggle) */}
                <div className="p-4 px-5 lg:p-8 flex items-center justify-between lg:justify-center border-b-[1px] lg:border-b-0 border-editorial-border">
                    <Link href="/" className="hover:opacity-70 transition-opacity">
                        <h1 className="type-header text-sm lg:text-base leading-none">KANG GRAPHIC</h1>
                    </Link>
                    {/* Mobile Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="lg:hidden type-mono border border-black px-2 py-0.5 text-[9px] font-bold"
                    >
                        {language === 'ko' ? 'EN' : 'KO'}
                    </button>
                </div>

                {/* 2. Primary Navigation */}
                <div className="p-3 px-5 lg:p-8 flex items-center bg-white">
                    <nav className="flex flex-wrap gap-x-5 lg:gap-x-10 gap-y-1 type-header text-[11px] lg:text-[13px]">
                        <Link href="/" className="hover:underline underline-offset-4 decoration-1">{t("작업", "WORKS")}</Link>
                        <Link href="/archive" className="hover:underline underline-offset-4 decoration-1">{t("기록", "ARCHIVE")}</Link>
                        <Link href="/article" className="hover:underline underline-offset-4 decoration-1">{t("글", "ARTICLE")}</Link>
                        <Link href="/about" className="hover:underline underline-offset-4 decoration-1">{t("소개", "ABOUT")}</Link>
                    </nav>
                </div>

                {/* 3. Meta Hub - Only visible on LG+ screens */}
                <div className="hidden lg:flex p-8 items-center justify-between bg-white overflow-hidden">
                    <div className="space-y-1">
                        <p className="type-mono opacity-40 font-bold uppercase text-[9px]">{t("업데이트", "UPDATED")}</p>
                        <p className="type-mono font-bold text-[10px]">{currentDate}</p>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        className="type-mono hover:bg-black hover:text-white px-3 py-1.5 border-[1px] border-black transition-all font-bold text-[10px]"
                    >
                        {language === 'ko' ? 'EN' : 'KO'}
                    </button>
                </div>
            </div>
        </header>
    );
}
