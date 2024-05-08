"use client"

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReactNode } from "react";

type SeasonPosterProps = {
    title: string;
    description: string;
    imageSrc: string;
};

const handleDownload = (filePath: string, title: string, type: string) => {
    const link = document.createElement('a');
    link.href = filePath.replace('.webp', '.png');
    if (type === 'print') {
        title = `${title} Print`;
        link.href = link.href.replace('Full', 'Full Print');
    }
    link.download = title;
    link.click();
};

export function SeasonPoster({ title, description, imageSrc }: SeasonPosterProps): ReactNode {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="w-[250px] relative p-4">
                    <AspectRatio ratio={4 / 5}>
                        <Image src={imageSrc} alt="Image" className="rounded-md object-cover transition-transform hover:scale-125 shadow-lg dark:drop-shadow-[0_0_0.3rem_#ffffff70]" fill={true} />
                    </AspectRatio>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="w-[375px] relative p-4 flex justify-center items-center mx-auto">
                    <AspectRatio ratio={4 / 5}>
                        <Image src={imageSrc} alt="Image" className="rounded-md object-cover shadow-lg dark:drop-shadow-[0_0_0.3rem_#ffffff70]" fill={true} />
                    </AspectRatio>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={() => handleDownload(imageSrc, title, "digital")} className="mr-2 px-4 py-2 bg-gray-800 text-white dark:text-black rounded-md dark:bg-gray-100 hover:dark:bg-gray-300 hover:bg-gray-600 hover:scale-105">Download for Digital</button>
                    <button onClick={() => handleDownload(imageSrc, title, "print")} className="ml-2 px-4 py-2 bg-gray-800 text-white dark:text-black rounded-md dark:bg-gray-100 hover:dark:bg-gray-300 hover:bg-gray-600 hover:scale-105">Download for Print</button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

