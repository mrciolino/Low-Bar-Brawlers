// pages/wiki.tsx
import React from 'react';
import { HomeIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ModeToggle } from "@/components/switch";

const Page = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full divide-y snap-y snap-mandatory overflow-y-scroll h">
            <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-0 bg-neutral-100 dark:bg-neutral-900">
                <div className="z-10 w-full xl:max-w-[50%] lg:max-w-[75%] items-center justify-around font-mono text-sm flex p-5">
                    <div className="flex items-center">
                        <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
                        <h1 className="text-2xl font-bold tracking-tight">&nbsp; Low Bar Brawlers Wiki &nbsp;</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <Link aria-label="Home Page" href="/" title="Home Page">
                            <Button aria-label="Home Page" variant="outline" size="icon">
                                <HomeIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                            </Button>
                        </Link>
                        <Link aria-label="Github Repo" href="https://github.com/mrciolino/Low-Bar-Brawlers" rel="noopener noreferrer" target="_blank" title="Github Repo">
                            <Button aria-label="Github Repo" variant="outline" size="icon">
                                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;