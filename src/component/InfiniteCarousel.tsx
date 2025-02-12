"use client";

import Image from "next/image";
import Link from "next/link";

// Updated interface with mandatory 'url' and optional 'className'
interface CarouselItem {
    src: string;
    url: string; // 'url' is now mandatory
    alt: string;
    className?: string; // Optional className for custom styles (like "coming-soon")
}

interface InfiniteCarouselProps {
    items: CarouselItem[];
    width: string;
    height: string;
    quantity?: number;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
    items,
    width,
    height,
    quantity,
}) => {
    const safeWidth = width ?? "100px"; // Default to "100px" if undefined
    const safeHeight = height ?? "100px";

    return (
        <div
            className="scroller"
            style={
                {
                    "--width": safeWidth,
                    "--height": safeHeight,
                    "--quantity": quantity ?? items.length, // Defaults to items.length
                } as React.CSSProperties
            }>
            <div className="scroll__inner">
                {items.map((item, index) => (
                    <div key={index} className="item-container">
                        {/* Conditionally render Link and disable if 'coming-soon' class is present */}
                        <Link
                            href={item.url}
                            className={`item ${item.className}`} // Conditionally add className
                            style={
                                {
                                    "--position": index + 1,
                                } as React.CSSProperties
                            }
                            onClick={(e) => {
                                // Prevent navigation if 'coming-soon' class is present
                                if (item.className === "coming-soon") {
                                    e.preventDefault();
                                }
                            }}>
                            <img
                                src={item.src}
                                alt={item.alt}
                                width={parseInt(safeWidth)} // Safely parse the width
                                height={parseInt(safeHeight)}
                                className={item.className}
                            />

                            {/* Add the 'Coming Soon' label if className="coming-soon" */}
                            {item.className === "coming-soon" && (
                                <div className="coming-soon-label">
                                    Coming Soon
                                </div>
                            )}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
