import Image from "next/image";
import { ModeToggle } from "@/components/switch";
import { SeasonPoster } from "@/components/poster";

export default function Home() {
  return (

    <div className="absolute top-0 left-0 w-full h-full divide-y snap-y snap-mandatory overflow-y-scroll h">

      {/* splash page */}
      <main className="flex min-h-screen flex-col items-center justify-between p-24 snap-center snap-always">

        <div className="z-10 w-full max-w-5xl items-center justify-left font-mono text-sm lg:flex">
          <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Low Bar Brawlers &nbsp;</h2>
          <ModeToggle />
        </div>

        <div className="text-left w-full max-w-5xl ">
          <div className="w-1/2">
            Thirteen adventures ventured out into an unknown world on a dangerous quest, this is the story of their choatic journey.
          </div>
        </div>


        <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left divide-x">
          <a
            href="#poster"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Posters{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              View and download season posters for digital or print.
            </p>
          </a>

          <a
            href="#character"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Characters{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Meet the cast of characters that make up the Low Bar Brawlers.
            </p>
          </a>
        </div>

      </main>

      {/* poster page */}
      <main id="poster" className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-100 dark:bg-neutral-800 snap-center snap-always">

        <div className="z-10 w-full max-w-5xl items-center justify-left font-mono text-sm lg:flex">
          <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Posters &nbsp;</h2>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="gap-4">
            <SeasonPoster
              imageSrc="/Season 1 Poster Full.webp"
              title="Season 1 Poster"
              description="The print version is a 1.44 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 300 DPI."
            />
            <SeasonPoster
              imageSrc="/Season 2 Poster Full.webp"
              title="Season 2 Poster"
              description="The print version is a 1.44 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 300 DPI."
            />
            <SeasonPoster
              imageSrc="/Season 3 Poster Full.webp"
              title="Season 3 Poster"
              description="The print version is a 1.44 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 300 DPI."
            />
            <SeasonPoster
              imageSrc="/Season 4 Poster Full.webp"
              title="Season 4 Poster"
              description="The print version is a 1.44 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 300 DPI."
            />
          </div>
        </div>

        <div className="text-left w-full max-w-5xl">
          Click on a poster to view and download the full size image for digital or print.
        </div>

      </main>

      {/* character page */}
      <main id="character" className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-300 dark:bg-neutral-600 snap-center snap-always">

        <div className="z-10 w-full max-w-5xl items-center justify-left font-mono text-sm lg:flex">
          <Image className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Characters &nbsp;</h2>
        </div>

        <div className="text-left w-full max-w-5xl">
          <div className="w-1/2">
            Thirteen adventures ventured out into an unknown world on a dangerous quest, this is the story of their choatic journey.
          </div>
        </div>

      </main>
    </div >
  );
}
