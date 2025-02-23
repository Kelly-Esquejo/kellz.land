"use client";

import Image from "next/image";

const bgImages = [
    "/cars/car1.png",
    "/cars/car2.png",
    "/cars/car3.png",
    "/cars/car4.png",
    "/cars/car5.png",
    "/cars/car6.png",
    "/cars/car7.png",
];

export default function Background() {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden -z-10">
            {bgImages.map((src, index) => {
                const isLeftSide = Math.random() < 0.5; // 50% chance for left or right side
                const randomX = isLeftSide
                    ? Math.random() * 35 // 0% - 40%
                    : Math.random() * 35 + 65; // 60% - 100%

                const randomY = Math.random() * 80 + 10; // Y position (10% - 90%)
                const randomSize = Math.random() * 100 + 50; // Size between 50px - 150px

                return (
                    <Image
                        unoptimized
                        key={index}
                        src={src}
                        alt={`Car ${index + 1}`}
                        width={randomSize}
                        height={randomSize}
                        className="absolute"
                        style={{
                            top: `${randomY}%`,
                            left: `${randomX}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                        priority
                    />
                );
            })}
        </div>
    );
}
