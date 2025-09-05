

import React from "react";
import { GitPullRequestArrow, File, Clapperboard, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Toaster, toast } from 'sonner';
import { ModeToggle } from "./mode-toggle";
import DrawingPad from "./drawing_pad";

const SplashSection: React.FC = () => (
    <>
        <Toaster />
        <div className="fixed top-5 left-5 z-50">
            <ModeToggle />
        </div>
        <main className="flex min-h-screen flex-col items-center justify-between bg-neutral-100 dark:bg-neutral-900 px-4 pb-4 relative">
            <div className="flex flex-col items-center w-full mb-4 mt-6">

                {/* Header */}
                <img
                    className="drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/assets/dragon.svg"
                    alt="LBB Logo"
                    width={64}
                    height={64}
                />
                <h1 className="text-5xl font-extrabold tracking-tight text-center leading-tight mb-2">
                    Low Bar Brawlers
                </h1>
                <h2 className="text-lg font-medium text-center text-neutral-600 dark:text-neutral-300 mb-4">
                    Eleven adventurers ventured out into an unknown world on a dangerous quest.<br />This is the story of their chaotic journey.
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-2 px-2">
                    <a
                        aria-label="Wiki Page"
                        href="https://wiki.lowbarbrawlers.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="flex flex-row w-[14rem] items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition p-4 group gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                        <File className="h-6 w-6 text-neutral-700 dark:text-neutral-300  transition" />
                        <span className="text-base font-medium  transition">Wiki</span>
                    </a>
                    <Popover>
                        <PopoverTrigger >
                            <a className="flex flex-row w-[14rem] items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition p-4 group gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                style={{ cursor: "pointer" }}
                            >
                                <GitPullRequestArrow className="h-6 w-6 text-neutral-700 dark:text-neutral-300 transition" />
                                <span className="text-base font-medium  transition">GitHub</span>
                            </a>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="flex flex-col gap-2">
                                <a
                                    href="https://github.com/LowBarBrawlers/wiki-backup"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition font-medium"
                                >
                                    <GitPullRequestArrow className="h-5 w-5" />
                                    Wiki Backup
                                </a>
                                <a
                                    href="https://github.com/LowBarBrawlers/lowbarbrawlers.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition font-medium"
                                >
                                    <GitPullRequestArrow className="h-5 w-5" />
                                    This Page
                                </a>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <a
                        aria-label="Low Bar Brawler's Session Videos"
                        onClick={() => toast("Contact the Admin for access to session videos.")}
                        className="flex flex-row w-[14rem] items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition p-4 group gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        style={{ cursor: "pointer" }}
                    >
                        <Clapperboard className="h-6 w-6 text-neutral-700 dark:text-neutral-300 transition group-hover:animate-pulse" />
                        <span className="text-base font-medium transition">Sessions</span>
                    </a>

                </div>
            </div>

            {/* Parchment Drawing Pad Section */}
            <div className="hidden lg:flex flex-col items-center justify-center w-full my-8">
                <DrawingPad />
            </div>

            {/* Navigation Buttons */}
            <div className="w-full flex flex-row items-center justify-center gap-6 mb-4">
                <a
                    aria-label="Poster Section"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('poster')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col h-[6rem] w-[16rem] items-center justify-center relative rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition p-4 group w-44 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    style={{ cursor: "pointer" }}
                >
                    <span className="text-lg font-semibold mb-1  transition">Posters</span>
                    <span className="text-xs text-neutral-500 pb-4">View and download season posters</span>
                    <ChevronDown className="h-6 w-6 pt-3 text-neutral-400 animate-bounce absolute bottom-2 left-1/2 -translate-x-1/2" />
                </a>
                <a
                    aria-label="Character Section"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('character')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col h-[6rem] w-[16rem] items-center justify-center relative rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-md transition p-4 group w-44 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    style={{ cursor: "pointer" }}
                >    <span className="text-lg font-semibold mb-1  transition">Characters</span>
                    <span className="text-xs text-neutral-500 pb-4">Meet the cast of brawlers</span>
                    <ChevronDown className="h-6 w-6 pt-3 text-neutral-400 animate-bounce absolute bottom-2 left-1/2 -translate-x-1/2" />
                </a>
            </div>
        </main>
    </>
);

export default SplashSection;