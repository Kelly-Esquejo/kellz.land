"use client";
import React, { useState } from "react";
import Image from "next/image";

interface SingleJoke {
    type: "single";
    joke: string;
}

interface TwoPartJoke {
    type: "twopart";
    setup: string;
    delivery: string;
}

const jokeBgImgs = [
    {
        src: "jokebg1.jpg",
        alt: "Joke background 1",
    },
    {
        src: "jokebg2.jpg",
        alt: "Joke background 2",
    },
    {
        src: "jokebg3.jpg",
        alt: "Joke background 3",
    },
    {
        src: "jokebg4.jpg",
        alt: "Joke background 4",
    },
];

type Joke = SingleJoke | TwoPartJoke;

const JokeGenerator: React.FC = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
    });

    const [bgImg, setBgImg] = useState(jokeBgImgs[0]);
    const getRandomBgImg = () => {
        setBgImg(jokeBgImgs[Math.floor(Math.random() * jokeBgImgs.length)]);
    };

    const toggleFilter = (filter: keyof typeof filters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: !prevFilters[filter],
        }));
    };

    const fetchJoke = async () => {
        setIsLoading(true);
        getRandomBgImg(); // Change the background image on each click

        const activeFilters = Object.keys(filters).filter(
            (key) => filters[key as keyof typeof filters]
        );
        const apiUrl =
            activeFilters.length === 0
                ? "https://v2.jokeapi.dev/joke/Any"
                : `https://v2.jokeapi.dev/joke/Any?blacklistFlags=${activeFilters.join(
                      ","
                  )}`;

        console.log("API URL:", apiUrl); // Log the API URL to the console
        try {
            const response = await fetch(apiUrl);
            const data: Joke = await response.json();
            setJoke(data);
        } catch (error) {
            console.error("Error fetching joke:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center font-[family-name:var(--font-geist-sans)] ">
            {/* Following does not work when deployed
            Solution: Have background position underneath content */}
            {/* style={{
                backgroundImage: "url('/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} */}
            <div className="relative h-screen w-screen flex justify-center items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                {/* Background Image */}
                <Image
                    unoptimized
                    src={bgImg.src}
                    alt={bgImg.alt}
                    fill
                    className="absolute top-0 left-0 z-[-1]"
                    priority
                />

                {/* Glass morphism container */}
                {/* className=" border-solid border-[2px] border-[#b2a293] p-12 backdrop-blur-[20px] bg-slate-600 bg-opacity-30 " */}
                <div className="h-[400px] w-[400px] flex flex-col justify-between items-centerrelative">
                    <div className="min-h-[80px] min-w-[80px] text-center text-3xl text-purple-900 pt-12">
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : joke ? (
                            joke.type === "twopart" ? (
                                <>
                                    <div>{joke.setup}</div>
                                    <div>{joke.delivery}</div>
                                </>
                            ) : (
                                <div>{joke.joke}</div>
                            )
                        ) : null}
                    </div>

                    {/* Fetches a random joke */}
                    <button
                        onClick={fetchJoke}
                        className="font-bold relative rounded border-2 border-black bg-gray-200 py-1 text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 flex items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                        Click Me!
                    </button>

                    {/* User can toggle which flags to blacklist*/}
                    <div className="flex flex-row">
                        {Object.keys(filters).map((key) => (
                            <button
                                key={key}
                                onClick={() =>
                                    toggleFilter(key as keyof typeof filters)
                                }
                                className={`font-bold relative rounded border-2 border-black py-1 transition duration-100 flex items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${
                                    filters[key as keyof typeof filters]
                                        ? "bg-yellow-400 text-gray-900"
                                        : "bg-gray-200 text-black"
                                }`}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JokeGenerator;
