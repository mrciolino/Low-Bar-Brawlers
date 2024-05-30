"use client"

import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false)

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button aria-label="Dark Mode Toggle" variant="outline" size="icon" onClick={toggleTheme} title="Toggle dark mode">
            {theme === "light" ? (
                <>
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Switch to light mode</span>
                </>
            ) : (
                <>
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all" />
                    <span className="sr-only">Switch to dark mode</span>
                </>
            )}
        </Button>
    );
}