import React from "react";
import { SeasonPoster } from "./poster";

const PosterSection: React.FC = () => (
  <main id="poster" className="flex min-h-screen flex-col items-center justify-between lg:p-24 max-lg:p-8 bg-neutral-200 dark:bg-neutral-800">

    <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm flex max-lg:pt-4">
      <img className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        src="/assets/dragon.svg" alt="LBB Logo" width={40} height={40} />
      <h2 className="text-2xl font-bold tracking-tight">&nbsp; Posters &nbsp;</h2>
    </div>

    <div className="w-full max-w-[75%] grid 2xl:grid-cols-4 xl:grid-cols-2 lg:grid-cols-2 gap-4">
      <SeasonPoster
        imageSrc="/posters/Season 1 Poster Full.webp"
        title="Season 1 Poster"
        description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
      />
      <SeasonPoster
        imageSrc="/posters/Season 2 Poster Full.webp"
        title="Season 2 Poster"
        description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
      />
      <SeasonPoster
        imageSrc="/posters/Season 3 Poster Full.webp"
        title="Season 3 Poster"
        description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
      />
      <SeasonPoster
        imageSrc="/posters/Season 4 Poster Full.webp"
        title="Season 4 Poster"
        description="The print version is a 2.16 radius unsharp mask of the digital image based on a viewing distance of 1 foot and 450 DPI. Perfect for 11x14 photo frame (4911x6250)."
      />
    </div>

    <div className="text-left w-full max-w-[75%]">
      Click on a poster to view and download the full size image for digital or print.
    </div>

  </main>
)

export default PosterSection;