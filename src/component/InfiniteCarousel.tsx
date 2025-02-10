"use client";
import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// Bite a Byte - Infinite horizontal scroller

const InfiniteCarousel = ({
    items,
}: {
    items: { src: StaticImageData; url: string }[];
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Value of scroll ref
        const scroller = scrollerRef.current;

        function sliderAnimation() {
            // If scroller has loaded on the DOM
            if (!scroller) return;

            const innerScroller = scroller.querySelector(".scroll__inner");

            // If scroll__inner has loaded on the DOM
            if (!innerScroller) return;

            if (innerScroller.getAttribute("data-cloned") === "true") return;

            const innerScrollerChildren = Array.from(innerScroller.children);

            // To imitate the infinite loop, recreate element using cloneNode
            innerScrollerChildren.forEach((item) => {
                // Clone each element
                const extendedLogos = item.cloneNode(true) as HTMLElement;

                // Append cloned elements to innerScroller element
                innerScroller.appendChild(extendedLogos);
            });

            // If the innerScroller has an attribute, don't re-clone
            innerScroller.setAttribute("data-cloned", "true");
        }

        sliderAnimation();
    }, []);

    return (
        <div ref={scrollerRef} className="scroller max-w-[100px] ">
            <div className="scroll__inner flex gap-2 bg-gray-300 py-4 animate-infinite_scroll">
                {items.map((item, index) => {
                    return (
                        <Link key={index} href={item.url} className="p-1">
                            <Image
                                src={item.src}
                                alt={`logo ${index + 1} `}
                                width={100}
                                height={100}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
