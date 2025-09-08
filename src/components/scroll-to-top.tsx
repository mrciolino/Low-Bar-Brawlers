import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from "./ui/button";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show the button when scrolled past the first main section (viewport height)
            if (window.pageYOffset > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    variant="outline"
                    size="icon"
                    className="fixed top-5 right-5 z-50"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-[1.2rem] w-[1.2rem]" />
                </Button>
            )}
        </>
    );
};

export default ScrollToTop;
