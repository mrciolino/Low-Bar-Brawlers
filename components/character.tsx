import { ReactNode } from "react";

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


export function CharacterProfile({ name, full_title, class_name, subclass, background, description, race, alignment, level, icon_path }: Character): ReactNode {
    return (
        < div className="flex flex-col justify-center items-center py-8" >
            <div className="relative flex flex-row items-center rounded-[20px] w-2/3] max-w-[95%] mx-auto bg-gray-200 dark:bg-neutral-800 bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white dark:shadow-none p-3">
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
                    <p className="mt-2 px-2 text-base text-gray-800 dark:text-gray-200">
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
        </div >
    );
};
