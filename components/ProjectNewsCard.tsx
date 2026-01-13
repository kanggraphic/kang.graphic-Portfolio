"use client";

import Link from "next/link";
import Image from "next/image";
import { Project, getSanityImageUrl } from "@/lib/sanity";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectNewsCardProps {
    project: Project;
    featured?: boolean;
}

export default function ProjectNewsCard({ project, featured = false }: ProjectNewsCardProps) {
    const { language, t } = useLanguage();

    const title = language === 'ko' ? project.title?.ko : project.title?.en;
    const description = language === 'ko' ? project.description?.ko : project.description?.en;
    const category = language === 'ko' ? project.category?.ko : project.category?.en;

    // Get first image or cover image
    const displayImage = project.coverImage || (project.images && project.images[0]);
    const imageUrl = displayImage ? getSanityImageUrl(displayImage, 800) : null;

    if (featured) {
        return (
            <article className="border-b-heavy border-editorial-border p-4 md:p-8 group hover:bg-editorial-paper transition-colors">
                <Link href={`/project/${project._id}`} className="block">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 border-b-[1px] pb-2 border-dashed border-gray-300">
                        <span className="headline-section text-sm">{category}</span>
                        <span className="text-caption-meta">{project.date}</span>
                    </div>

                    {/* Main Title - Huge */}
                    <h2 className="font-wanted font-black text-4xl md:text-6xl uppercase leading-[0.9] tracking-tighter mb-6 group-hover:underline decoration-4 underline-offset-4">
                        {title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image Area */}
                        <div className="relative aspect-[4/3] border-2 border-black overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={title || "Project Image"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="font-mono text-xs">NO IMAGE</span>
                                </div>
                            )}
                        </div>

                        {/* Text Area */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="text-body-dense line-clamp-6 mb-4 font-serif text-lg leading-relaxed">
                                    {description || t("설명이 없습니다.", "No description available.")}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold border-[1px] border-black px-1 uppercase hover:bg-black hover:text-white transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 text-right">
                                <span className="inline-block border-b-2 border-black font-bold uppercase text-sm">Read Full Story →</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </article>
        );
    }

    // Standard Compact Card
    return (
        <article className="border-b-[1px] border-editorial-border p-4 md:p-6 group hover:bg-editorial-paper transition-colors">
            <Link href={`/project/${project._id}`} className="grid grid-cols-[1fr_120px] md:grid-cols-[1fr_200px] gap-4 md:gap-8">
                <div>
                    <div className="mb-2">
                        <span className="text-[10px] font-bold bg-black text-white px-1 mr-2">{project.date}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{category}</span>
                    </div>
                    <h3 className="headline-title mb-2 group-hover:underline decoration-2 underline-offset-2 w-full truncate">
                        {title}
                    </h3>
                    <p className="text-xs md:text-sm line-clamp-2 md:line-clamp-3 text-justify font-serif leading-snug text-gray-700">
                        {description}
                    </p>
                </div>

                {/* Thumbnail */}
                <div className="relative aspect-square border-[1px] border-black overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={title || "Project Image"}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            </Link>
        </article>
    );
}
