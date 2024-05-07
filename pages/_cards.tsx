import React from 'react'

const Card: React.FC<{ title: string, image: string }> = ({ title, image }) => {

    const handleDownload = (filePath: string, title: string) => {
        const link = document.createElement('a');
        link.href = filePath.replace('.webp', '.png');
        link.download = title;
        link.click();
    };


    return (
        <div className="p-2 rounded-2xl bg-white dark:bg-gray-400 p-1 shadow-xl relative h-[21rem] w-full">
            <div className="p-2 rounded-2xl p-1 relative bg-no-repeat bg-center bg-cover h-[20rem] w-full"
                style={{ backgroundImage: `url("${image}")` }}>
            </div>
            <div className="mt-4 p-0 text-center align-middle">
                <button className="block w-full select-none rounded-lg bg-white py-2 px-7 font-bold uppercase shadow-md transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-gray-500/20 focus:scale-[1.02] focus:opacity-[0.85] hover:bg-gray-100 focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button" data-ripple-dark="true" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleDownload(image, title)}>
                    {title}
                </button>
            </div>
        </div>
    )
}
export default Card
