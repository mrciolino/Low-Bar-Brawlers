import { useState, type JSX } from "react";
import { Button } from "./ui/button";


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
            <div className="relative flex lg:flex-col max-lg:flex-col items-center max-w-[95%] mx-auto pt-3">
                {/* <div className="w-2/3 relative p-4 divide-y divide-gray-500">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 p-1">{name}</h2>
                    <div className="p-4 w-full aspect-[4/5] relative rounded-md object-cover transition-transform drop-shadow-[0_0_0.3rem_#111111] dark:drop-shadow-[0_0_0.3rem_#ffffff70]">
                        <img src={icon_path} alt={name} className="w-full h-full object-cover object-top" />
                    </div>
                </div> */}
                <div className="mt-2 mb-8 w-full">
                    <h4 className="px-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                        {full_title}
                    </h4>
                    <p className="mt-2 px-2 text-sm sm:text-base text-gray-800 dark:text-gray-200 max-lg:hidden xl:block">
                        {description}
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-2 px-2 w-full text-xs sm:text-sm">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-2 sm:px-3 py-1 sm:py-2 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-[0.5rem] top-5 left-5 xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-tight">CLASS</p>
                        <p className="text-[0.5rem] xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-100 leading-tight">
                            {class_name}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-2 sm:px-3 py-1 sm:py-2 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-[0.5rem] top-5 left-5 xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-tight">SUBCLASS</p>
                        <p className="text-[0.5rem] xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-100 leading-tight">
                            {subclass}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-2 sm:px-3 py-1 sm:py-2 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-[0.5rem] top-5 left-5 xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-tight">BACKGROUND</p>
                        <p className="text-[0.5rem] xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-100 leading-tight">
                            {background}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-2 sm:px-3 py-1 sm:py-2 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-[0.5rem] top-5 left-5 xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-tight">RACE</p>
                        <p className="text-[0.5rem] xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-100 leading-tight">
                            {race}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-2 sm:px-3 py-1 sm:py-2 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-[0.5rem] top-5 left-5 xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-tight">ALIGNMENT</p>
                        <p className="text-[0.5rem] xs:text-xs sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-100 leading-tight">
                            {alignment}
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-gray-100 dark:bg-neutral-700 bg-clip-border px-2 sm:px-3 py-1 sm:py-2 shadow-3xl shadow-shadow-500 dark:shadow-none">
                        <p className="text-[0.5rem] top-5 left-5 xs:text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 leading-tight">LEVEL</p>
                        <p className="text-[0.5rem] xs:text-xs sm:text-xs md:text-sm lg:text-base font-medium text-gray-700 dark:text-gray-100 leading-tight">
                            {level}
                        </p>
                    </div>
                </div>
            </div>

            <CharacterHighlights name={name} />

        </div >
    );
};

function CharacterHighlights(name: any): JSX.Element {
    const [visibleImage, setVisibleImage] = useState(1);

    // reach into dict
    name = name["name"]

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

    if (name == "Breezy-E" || name == "Adalynn") {
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
    let imageUrl = `characters/${name}/icon.png`
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

                <img className={`transition-opacity object-cover relative ${visibleImage === 1 ? '' : 'hidden'}`} src={`/characters/${name}/Frame 1.png`} alt={`${name} 1`} />
                <img className={`transition-opacity object-cover relative ${visibleImage === 2 ? '' : 'hidden'}`} src={`/characters/${name}/Frame 2.png`} alt={`${name} 2`} />
                <img className={`transition-opacity object-cover relative ${visibleImage === 3 ? '' : 'hidden'}`} src={`/characters/${name}/Frame 3.png`} alt={`${name} 3`} />
                <img className={`transition-opacity object-cover relative ${visibleImage === 4 ? '' : 'hidden'}`} src={`/characters/${name}/Frame 4.png`} alt={`${name} 4`} />
                <img className={`transition-opacity object-cover relative ${visibleImage === 5 ? '' : 'hidden'}`} src={`/characters/${name}/Frame 5.png`} alt={`${name} 5`} />
                <img className={`transition-opacity object-cover relative ${visibleImage === 6 ? '' : 'hidden'}`} src={`/characters/${name}/Frame 6.png`} alt={`${name} 6`} />

                {/* text box highlights */}
                {textHighlights}

            </div>
            {/* download button for charactor icon */}
            <div className="relative bottom-0 right-0">
                <Button size="sm" onClick={downloadImage}>Download Character Icon</Button>
            </div>
        </>
    );
}
