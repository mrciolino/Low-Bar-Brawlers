import Image from "next/image";
import Link from 'next/link';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { CharacterProfile } from "@/components/character";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { SeasonPoster } from "@/components/poster";
import { ModeToggle } from "@/components/switch";
import { Button } from "@/components/ui/button";
import { World } from "@/components/world";

import playerData from '../app/data_player.json';


export default function Home() {

  return (

    <div className="absolute top-0 left-0 w-full h-full divide-y snap-y snap-mandatory overflow-y-scroll h">

      {/* splash page */}
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-0 bg-neutral-100 dark:bg-neutral-900">

        <div className="z-10 w-full xl:max-w-[50%] lg:max-w-[75%] items-center justify-around font-mono text-sm flex p-5">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h1 className="text-2xl font-bold tracking-tight">&nbsp; Low Bar Brawlers &nbsp;</h1>
          <ModeToggle />
          <Link aria-label="Low Bar Brawler's Github Repo" href="https://github.com/mrciolino/Low-Bar-Brawlers" rel="noopener noreferrer" target="_blank">
            <Button aria-label="Github Repo" variant="outline" size="icon">
              <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </Link>
        </div>

        <div className="text-center w-full xl:max-w-[50%] max-lg:max-w-[75%] p-5">
          Eleven adventures ventured out into an unknown world on a dangerous quest, this is the story of their chaotic journey.
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full xl:max-w-[50%] lg:max-w-[75%] lg:grid-cols-3 lg:text-left divide-x">
          <Link aria-label="Poster Section" href="#poster" scroll={true} className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
            <h2 className="mb-3 text-2xl font-semibold">
              Posters{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              View and download season posters for digital or print.
            </p>
          </Link>
          <Link aria-label="Character Section" href="#character" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Characters{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Meet the cast of characters that make up the Low Bar Brawlers.
            </p>
          </Link>
          <Link aria-label="Map Section" href="#maps" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Maps{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Collection of maps we have invented and discovered on our journey.
            </p>
          </Link>
        </div>
      </main >

      {/* poster page */}
      < main id="poster" className="flex min-h-screen flex-col items-center justify-between lg:p-24 max-lg:p-8 bg-neutral-200 dark:bg-neutral-800">

        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm flex max-lg:pt-4">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Posters &nbsp;</h2>
        </div>

        <div className="w-full max-w-[75%] grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-4">
          <SeasonPoster
            imageSrc="/Season 1 Poster Full.webp"
            title="Season 1 Poster"
            description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
          />
          <SeasonPoster
            imageSrc="/Season 2 Poster Full.webp"
            title="Season 2 Poster"
            description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
          />
          <SeasonPoster
            imageSrc="/Season 3 Poster Full.webp"
            title="Season 3 Poster"
            description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
          />
          <SeasonPoster
            imageSrc="/Season 4 Poster Full.webp"
            title="Season 4 Poster"
            description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
          />
        </div>

        <div className="text-left w-full max-w-[75%]">
          Click on a poster to view and download the full size image for digital or print.
        </div>

      </main >

      {/* character page */}
      < main id="character" className="flex min-h-screen flex-col items-center justify-between lg:p-24 max-lg:p-8 bg-neutral-300 dark:bg-neutral-700" >

        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm flex max-lg:pt-4">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Characters &nbsp;</h2>
        </div>

        <div className="w-full max-w-[75%] mx-auto py-4">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4">
              {playerData.map((player, index) => (
                <CarouselItem key={index} className="pl-4">
                  <CharacterProfile
                    name={player.name}
                    full_title={player.full_title}
                    description={player.description}
                    class_name={player.class_name}
                    subclass={player.subclass}
                    background={player.background}
                    icon_path={player.icon_path}
                    race={player.race}
                    alignment={player.alignment}
                    level={player.level}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="text-left w-full max-w-[75%]">
          Scroll through the characters to learn more about the cast of the Low Bar Brawlers.
        </div>
      </main >

      {/* map page */}
      < main id="maps" className="flex min-h-screen flex-col items-center justify-between lg:p-24 max-lg:p-8 bg-neutral-200 dark:bg-neutral-800">

        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm flex max-lg:pt-4">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Maps &nbsp;</h2>
        </div>

        {/* the entire map section */}
        <World />

        <div className="text-left w-full max-w-[75%]">
          Explore the map to find out more about the world.
        </div>

      </main >


      {/* footer */}
      <footer className="flex items-center justify-center p-4 bg-neutral-400 dark:bg-neutral-500">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Made with</span>
          <div className="relative w-4 h-4">
            <Image src="/nextjs.svg" alt="Next.js" fill />
          </div>
          <span className="text-sm">Next.js</span>
          <div className="relative w-4 h-4">
            <Image src="/tailwindcss.svg" alt="Tailwind CSS" fill />
          </div>
          <span className="text-sm">Tailwind</span>
          <div className="relative w-4 h-4">
            <Image src="/shadcnui.svg" alt="shadcn/ui" fill />
          </div>
          <span className="text-sm">shadcn/ui</span>
          &nbsp; 🍃 <span className="text-sm">Leaflet</span>
          <div className="relative w-4 h-4">
            <Image src="/portfolio.webp" alt="Bazzert" fill />
          </div>
          <span className="text-sm">by Bazzert</span>
        </div>
      </footer>

    </div >
  );
}
