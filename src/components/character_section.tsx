import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../components/ui/carousel"
import { CharacterProfile } from "./character";
import playerData from '../data/players.json';

// CharacterSection.tsx


const CharacterSection: React.FC = () => (
    <main id="character" className="flex min-h-screen flex-col items-center justify-between lg:p-24 max-lg:p-8 bg-neutral-300 dark:bg-neutral-700">
        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm flex max-lg:pt-4">
            <img
                className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                src="/assets/dragon.svg" alt="LBB Logo" width={40} height={40}
            />
            <h2 className="text-2xl font-bold tracking-tight">&nbsp; Characters &nbsp;</h2>
        </div>

        <div className="w-full max-w-[90%] mx-auto">
            <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent className="-ml-4">
                    {playerData.map((player, index) => (
                        <CarouselItem key={index} className="xl:basis-1/2 pl-4">
                            <CharacterProfile {...player} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

        <div className="text-left w-full max-w-[75%] mt-2 text-xs sm:text-sm">
            Scroll through the characters to learn more about the cast of the Low Bar Brawlers.
        </div>
    </main>
);

export default CharacterSection;