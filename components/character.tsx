"use client";

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


type Character = {
    name: string;
    full_title: string;
    subclass: string;
    background: string;
    description: string;
    race: string;
    alignment: string;
    level: string;
    icon_path: string;
    class_name: string;
};


export function CharacterProfile({ name, full_title, class_name, subclass, background, description, race, alignment, level, icon_path }: Character): JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center py-8 rounded-[20px] bg-gray-200 dark:bg-neutral-800 bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:shadow-none">
            <div className="relative flex lg:flex-row max-lg:flex-col items-center max-w-[95%] mx-auto pt-3">
                <div className="w-2/3 relative p-4 divide-y divide-gray-500">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 p-1">{name}</h2>
                    <div className="p-4 w-full aspect-[4/5] relative rounded-md object-cover transition-transform drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                        <img src={icon_path} alt={name} className="w-full h-full object-cover object-top" />
                    </div>
                </div>
                <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                        {full_title}
                    </h4>
                    <p className="mt-2 px-2 text-base text-gray-800 dark:text-gray-200 max-lg:hidden xl:block">
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">CLASS</p>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                            {class_name}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">SUBCLASS</p>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                            {subclass}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">BACKGROUND</p>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                            {background}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">RACE</p>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                            {race}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">ALIGNMENT</p>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                            {alignment}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-sm text-gray-600 dark:text-gray-300">LEVEL</p>
                        <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                            {level}
                        </p>
                    </div>
                </div>
            </div>
            <Accordion type="single" collapsible className="w-full text-center">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Player Profile</AccordionTrigger>
                    <AccordionContent>
                        <CharacterHighlights name={name} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >
    );
};

function CharacterHighlights(name: any): JSX.Element {
    const [visibleImage, setVisibleImage] = useState(1);

    // reach into dict
    name = name["name"]
    let armorHighlights = null

    // armour highlights
    if (name == "Spoops") {
        armorHighlights = <>
            <div className="absolute top-[35%] left-[40%] spoops-clip-path-shield" onMouseEnter={() => setVisibleImage(2)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[28%] left-[39%] spoops-clip-path-sword" onMouseEnter={() => setVisibleImage(3)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[12%] left-[40%] spoops-clip-path-armor" onMouseEnter={() => setVisibleImage(4)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[43%] left-[46%] w-[8%] h-[6%]" onMouseEnter={() => setVisibleImage(5)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[18%] left-[41%] spoops-clip-path-robe" onMouseEnter={() => setVisibleImage(6)} onMouseLeave={() => setVisibleImage(1)} />
        </>
    }

    if (name == "Bazzdos") {
        armorHighlights = <>
            <div className="absolute top-[13%] left-[38%] bazzdos-clip-path-shield" onMouseEnter={() => setVisibleImage(2)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[12%] left-[37%] bazzdos-clip-path-belt" onMouseEnter={() => setVisibleImage(3)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[5%] left-[37%] bazzdos-clip-path-armor" onMouseEnter={() => setVisibleImage(4)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[14%] left-[37%] bazzdos-clip-path-gauntlets" onMouseEnter={() => setVisibleImage(5)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[19%] left-[37%] bazzdos-clip-path-boots" onMouseEnter={() => setVisibleImage(6)} onMouseLeave={() => setVisibleImage(1)} />
        </>
    }

    if (name == "Breezy-E") {
        armorHighlights = <>
            <div className="absolute top-[4%] left-[30%] breezy-clip-path-crown" onMouseEnter={() => setVisibleImage(2)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[3%] left-[31%] breezy-clip-path-leather" onMouseEnter={() => setVisibleImage(3)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[8%] left-[32%]  breezy-clip-path-sword" onMouseEnter={() => setVisibleImage(4)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[9%] left-[32%] breezy-clip-path-bow" onMouseEnter={() => setVisibleImage(5)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[7%] left-[32%] breezy-clip-path-robe" onMouseEnter={() => setVisibleImage(6)} onMouseLeave={() => setVisibleImage(1)} />
        </>
    }

    // text box highlights
    let textHighlights = (
        <>
            <div className="absolute top-[10%] left-[5%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(2)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute bottom-[22%] left-[5%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(3)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute top-[2%] right-[8%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(4)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute bottom-[45%] right-[8%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(5)} onMouseLeave={() => setVisibleImage(1)} />
            <div className="absolute bottom-[15%] right-[8%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(6)} onMouseLeave={() => setVisibleImage(1)} />
        </>
    )

    if (name == "Breezy-E") {
        textHighlights = (
            <>
                <div className="absolute top-[10%] left-[5%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(2)} onMouseLeave={() => setVisibleImage(1)} />
                <div className="absolute bottom-[22%] left-[5%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(4)} onMouseLeave={() => setVisibleImage(1)} />
                <div className="absolute top-[2%] right-[8%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(5)} onMouseLeave={() => setVisibleImage(1)} />
                <div className="absolute bottom-[45%] right-[8%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(6)} onMouseLeave={() => setVisibleImage(1)} />
                <div className="absolute bottom-[45%] left-[4%] w-1/4 h-1/5" onMouseEnter={() => setVisibleImage(3)} onMouseLeave={() => setVisibleImage(1)} />
            </>
        )
    }

    // download character icon
    let imageUrl = `/${name}/icon.png`
    let filename = `${name} Icon.png`;
    function downloadImage() {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        a.click();
    }

    return (
        <>
            <div className="p-4 w-full h-1/2 aspect-[16/9] relative rounded-md aspect-[16/9] ">

                <Image className={`transition-opacity object-cover relative ${visibleImage === 1 ? '' : 'hidden'}`} src={`/${name}/Frame 1.png`} alt={`${name} 1`} priority fill />
                <Image className={`transition-opacity object-cover relative ${visibleImage === 2 ? '' : 'hidden'}`} src={`/${name}/Frame 2.png`} alt={`${name} 2`} priority fill />
                <Image className={`transition-opacity object-cover relative ${visibleImage === 3 ? '' : 'hidden'}`} src={`/${name}/Frame 3.png`} alt={`${name} 3`} priority fill />
                <Image className={`transition-opacity object-cover relative ${visibleImage === 4 ? '' : 'hidden'}`} src={`/${name}/Frame 4.png`} alt={`${name} 4`} priority fill />
                <Image className={`transition-opacity object-cover relative ${visibleImage === 5 ? '' : 'hidden'}`} src={`/${name}/Frame 5.png`} alt={`${name} 5`} priority fill />
                <Image className={`transition-opacity object-cover relative ${visibleImage === 6 ? '' : 'hidden'}`} src={`/${name}/Frame 6.png`} alt={`${name} 6`} priority fill />

                {/* text box highlights */}
                {textHighlights}

                {/*spoops armour piece highlights */}
                {armorHighlights}

            </div>
            {/* download button for charactor icon */}
            <div className="relative bottom-0 right-0 -mt-4">
                <Button size="sm" onClick={downloadImage}>Download Character Icon</Button>
            </div>
        </>
    );
}
