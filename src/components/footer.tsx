export default function Footer() {
    return (
        <footer className="flex items-center justify-center p-4 bg-neutral-200 dark:bg-neutral-800">
            <div className="flex items-center space-x-5">
                <div className="relative w-4 h-4">
                    <img src="/assets/vite.svg" alt="Vite" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm">Vite</span>
                <div className="relative w-4 h-4">
                    <img src="/assets/tailwindcss.svg" alt="Tailwind CSS" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm">Tailwindcss</span>
                <div className="relative w-4 h-4">
                    <img src="/assets/shadcnui.svg" alt="shadcn/ui" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm">shadcn/ui</span>
            </div>
        </footer>
    );
}