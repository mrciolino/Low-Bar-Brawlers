"use client"

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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

export function SeasonPoster({ title, description, imageSrc }: SeasonPosterProps): JSX.Element {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="p-4 w-full aspect-[4/5] relative rounded-md object-cover transition-transform hover:scale-125 drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                    <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="w-[300px] relative p-4 flex justify-center items-center mx-auto">
                    <AspectRatio ratio={4 / 5}>
                        <Image src={imageSrc} alt="Image" className="rounded-md object-cover shadow-lg dark:drop-shadow-[0_0_0.3rem_#ffffff70]" fill={true} />
                    </AspectRatio>
                </div>
                <div className="flex justify-center mt-4">
                    <button aria-label="Download for Digital" onClick={() => handleDownload(imageSrc, title, "digital")} className="mr-2 px-4 py-2 bg-gray-800 text-white dark:text-black rounded-md dark:bg-gray-100 hover:dark:bg-gray-300 hover:bg-gray-600 hover:scale-105">Download for Digital</button>
                    <button aria-label="Download for Print" onClick={() => handleDownload(imageSrc, title, "print")} className="ml-2 px-4 py-2 bg-gray-800 text-white dark:text-black rounded-md dark:bg-gray-100 hover:dark:bg-gray-300 hover:bg-gray-600 hover:scale-105">Download for Print</button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

