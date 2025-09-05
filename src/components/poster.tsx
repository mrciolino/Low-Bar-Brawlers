
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Button } from "./ui/button";

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

export function SeasonPoster({ title, description, imageSrc }: SeasonPosterProps): React.JSX.Element {

    return (
        <Dialog>
            <DialogTrigger>
                <div className="p-4 w-full aspect-[4/5] relative rounded-md object-cover  hover:scale-105 drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                    <div className="relative w-full h-full">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="rounded-sm object-cover w-full h-full"
                        />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-4 sm:p-6 flex flex-col overflow-hidden">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex-1 flex justify-center items-center min-h-0 overflow-hidden">
                    <div className="relative max-w-full max-h-full aspect-[4/5] flex justify-center items-center">
                        <img
                            src={imageSrc}
                            alt="Image"
                            className="max-w-full max-h-full object-contain rounded-md shadow-lg dark:drop-shadow-lg"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4 flex-shrink-0 gap-2 flex-wrap">
                    <Button aria-label="Download for Digital" onClick={() => handleDownload(imageSrc, title, "digital")}>Download for Digital</Button>
                    <Button aria-label="Download for Print" onClick={() => handleDownload(imageSrc, title, "print")}>Download for Print</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

