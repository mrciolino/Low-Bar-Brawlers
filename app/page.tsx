import Image from "next/image";
import Link from 'next/link';
import { ModeToggle } from "@/components/switch";
import { SeasonPoster } from "@/components/poster";
import { CharacterProfile } from "@/components/character";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { World } from "@/components/world";


export default function Home() {
  return (

    <div className="absolute top-0 left-0 w-full h-full divide-y snap-y snap-mandatory overflow-y-scroll h">

      {/* splash page */}
      <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-8 bg-neutral-100 dark:bg-neutral-900">

        <div className="z-10 w-full xl:max-w-[50%] lg:max-w-[75%] items-center justify-around font-mono text-sm flex p-5">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h1 className="text-2xl font-bold tracking-tight">&nbsp; Low Bar Brawlers &nbsp;</h1>
          <ModeToggle />
          <Link href="https://github.com/mrciolino/Low-Bar-Brawlers" rel="noopener noreferrer" target="_blank">
            <Button variant="outline" size="icon">
              <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
          </Link>
        </div>

        <div className="text-center w-full xl:max-w-[50%] lg:max-w-[75%] p-5">
          Thirteen adventures ventured out into an unknown world on a dangerous quest, this is the story of their choatic journey.
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:w-full xl:max-w-[50%] lg:max-w-[75%] lg:grid-cols-3 lg:text-left divide-x">
          <Link href="#poster" scroll={true} className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" >
            <h2 className="mb-3 text-2xl font-semibold">
              Posters{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              View and download season posters for digital or print.
            </p>
          </Link>
          <Link href="#character" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className="mb-3 text-2xl font-semibold">
              Characters{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Meet the cast of characters that make up the Low Bar Brawlers.
            </p>
          </Link>
          <Link href="#maps" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
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
      < main id="poster" className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-200 dark:bg-neutral-800">

        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm lg:flex">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Posters &nbsp;</h2>
        </div>

        <div className="w-full max-w-[75%] grid grid-cols-4 gap-4">
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

        <div className="text-left w-full max-w-[75%]">
          Click on a poster to view and download the full size image for digital or print.
        </div>

      </main >

      {/* character page */}
      < main id="character" className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-300 dark:bg-neutral-700" >

        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm lg:flex">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Characters &nbsp;</h2>
        </div>

        <div className="w-full max-w-[75%] mx-auto">
          <Carousel opts={{ align: "start", loop: true, }}>
            <CarouselContent className="-ml-4">
              <CarouselItem className="pl-4">
                <CharacterProfile name="Krorg"
                  full_title="Krorg King of Altricia"
                  description="Krorg, the world's largest gnome, has led a remarkable journey, wrestling bears, fighting cannons, and extinguishing fires with speed. They've negotiated contracts, led pirate crews, and faced dragons solo. Despite unintentional destruction and economic crises, their transition to druidism and rise to kingship showcase a journey filled with twists and turns, solidifying their status as an unparalleled adventurer."
                  class_name="Barbarian"
                  subclass="Path of the Giant"
                  background="Lawful Neutral"
                  icon_path="/krog.png"
                  race="Gnome"
                  alignment="Lawful Neutral"
                  level="8" />
              </CarouselItem>
              <CarouselItem className="pl-4">
                <CharacterProfile name="Spoops"
                  full_title="God of Life and Death, Grandmaster Spoops The Crusader"
                  description="Spoops, the Undead Skeleton, wakes up along the beach and find himself uncovering fragmented memories of his past. In one recollection, he defends an ancient Elven city from a deity's assault, sealing a powerful minion before its sinking. Another memory paints him as the betrayed Grandmaster of a Paladin order, slain during a war against Liches. Who know what awaits this enigma."
                  class_name="Cleric"
                  subclass="Death Domain"
                  background="Sailor"
                  icon_path="/spoops.jpg"
                  race="Undead Skeleton"
                  alignment="Choatic Neutral"
                  level="20 Boon 10" />
              </CarouselItem>
              <CarouselItem className="pl-4">
                <CharacterProfile name="Os Vrtnica"
                  full_title="Os Vrtnica, The Celestial Inspiration and God of Virility"
                  description="Os, a gifted musician among the high elves, struggled with arrogance and a desire for attention, hindering his relationships. Sent into the world by his family, he made a living performing in taverns. The death of Krorg's pet bear catalyzed Os's realization of life's fleeting nature and spurred his quest for control. Through losses and challenges, including ascending to godhood, Os finds solace and companionship in his bond with Spoops, his trusted ally."
                  class_name="Bard"
                  subclass="College of Eloquence"
                  background="Folk Hero"
                  icon_path="/os.png"
                  race="High Elf"
                  alignment="Choatic Good"
                  level="20" />
              </CarouselItem>
              <CarouselItem className="pl-4">
                <CharacterProfile name="Bazzdos"
                  full_title="The Grand Prophet, The Fragment of Spoops, Lord Duke Bazzdows, Master of the Forge, Artificer Master"
                  description="Bazzdos, is a versatile character skilled in the art of forging and magic. Their journey involves managing factories across different dimensions and providing guidance to others. Amidst their adventures, they confront assassination threats and navigate the mysteries surrounding dead gods and exiled beings."
                  class_name="Artificer, Wizard, Warlock"
                  subclass="Armourer, Hexblade"
                  background="Robot"
                  icon_path="/bazzdos.png"
                  race="Warforged"
                  alignment="Lawfull"
                  level="20 Boon 6" />
              </CarouselItem>
              <CarouselItem className="pl-4">
                <CharacterProfile name="Breezy-E"
                  full_title="Chef Breezy-E, The Master of the Spaghetti"
                  description="Breezy-E is a highly fighter, embodying the chaotic evil alignment. Their arsenal includes powerful weapons like the Arc of Death's Touch and Godsbane, alongside abilities such as Tireless Spirit and Strength Before Death. Alongside their prowess in combat, they possess a unique culinary talent as a Chef, able to provide beneficial food during rests and treats for temporary hit points."
                  class_name="Fighter, Warlock"
                  subclass="Samurai, Great Old One"
                  background="Gladiator"
                  icon_path="/breezy.png"
                  race="Human"
                  alignment="Chaotic Evil"
                  level="20 Boon 6" />
              </CarouselItem>
              <CarouselItem className="pl-4">
                <CharacterProfile name="Adalynn"
                  full_title="Adalynn: Frostborn of the Interplanar Void"
                  description="The most powerfull wizard in the room, Adalynn. Raising castle from the earth into the sky, moving between realms and dimensions, Adalynn is a force to be reckoned with. Her power is only matched by her cunning and her ability to manipulate the world around her. She is a master of the arcane and a master of the mind. Known to have a plane for any outcome on the timeline."
                  class_name="Wizard"
                  subclass="Chronurgy"
                  background="Sage"
                  icon_path="/Adalynn.jpg"
                  race="Bronze Dragon"
                  alignment="Neutral Good"
                  level="20 Boon 6" />
              </CarouselItem>
              <CarouselItem className="pl-4">
                <CharacterProfile name="Elira Aniveshak"
                  full_title="Elira Aniveshak"
                  description="Elira Aniveshak, once a devout Inkling for the revered religion of Profeta, becomes disenchanted with the oppressive practices of her order and finds refuge in a traveling theater troupe, only to be pursued by the wrath of a vengeful deity, prompting her to embark on a journey to another dimension in a bid to protect her newfound family, all while grappling with a myriad of new challenges and adversaries."
                  class_name="Sorcerer"
                  subclass="Divine Soul"
                  background="Acolyte"
                  icon_path="/elira.jpg"
                  race="Wood Elf"
                  alignment="Neutral"
                  level="20" />
              </CarouselItem>
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
      < main id="maps" className="flex min-h-screen flex-col items-center justify-between lg:p-24 md:p-4 bg-neutral-200 dark:bg-neutral-800">

        <div className="z-10 w-full max-w-[75%] items-center justify-left font-mono text-sm lg:flex">
          <Image className="relative drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]" src="/dragon.svg" alt="LBB Logo" width={40} height={40} priority />
          <h2 className="text-2xl font-bold tracking-tight">&nbsp; Maps &nbsp;</h2>
        </div>

        <div className="w-full max-w-[75%] mx-auto">
          <World />
        </div>

        <div className="text-left w-full max-w-[75%]">
          Explore the map to find out more about the world.
        </div>

      </main >


      {/* footer */}
      <footer className="flex items-center justify-center p-4 bg-neutral-400 dark:bg-neutral-500">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Made with</span>
          <Image src="/nextjs.svg" alt="Next.js" width={18} height={18} />
          <span className="text-sm">Next.js</span>
          <Image src="/tailwindcss.svg" alt="Tailwind CSS" width={18} height={18} />
          <span className="text-sm">Tailwind</span>
          <Image src="/shadcnui.svg" alt="shadcn/ui" width={18} height={18} />
          <span className="text-sm">shadcn/ui</span>
          <Image src="/portfolio.webp" alt="Bazzert" width={18} height={18} />
          <span className="text-sm">by Bazzert</span>
        </div>
      </footer>

    </div >
  );
}
