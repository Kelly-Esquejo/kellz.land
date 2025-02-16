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
    const [intro, setIntro] = useState(true);

    const [flags, setFlags] = useState({
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

    const toggleFlag = (flag: keyof typeof flags) => {
        setFlags((prevFlags) => ({
            ...prevFlags,
            [flag]: !prevFlags[flag],
        }));
    };

    const fetchJoke = async () => {
        setIsLoading(true);
        setIntro(false);
        getRandomBgImg(); // Change the background image on each click

        const activeFlags = Object.keys(flags).filter(
            (key) => flags[key as keyof typeof flags]
        );

        let apiUrl =
            "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

        // Extract the blacklist part of the URL
        //  // Get everything after 'blacklistFlags='
        let blacklistFlags = apiUrl.split("=")[1];

        // Remove active filters
        activeFlags.forEach((flag) => {
            blacklistFlags = blacklistFlags
                .replace(flag, "")
                .replace(",,", ","); // Remove filter and fix double commas
        });
        // Clean up leading/trailing commas
        blacklistFlags = blacklistFlags.replace(/^,|,$/g, "");

        // Reconstruct API URL
        apiUrl = blacklistFlags
            ? `https://v2.jokeapi.dev/joke/Any?blacklistFlags=${blacklistFlags}`
            : "https://v2.jokeapi.dev/joke/Any";

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
        <div className="h-screen w-screen justify-center items-center">
            {/* Following does not work when deployed
            Solution: Have background position underneath content */}
            {/* style={{
                backgroundImage: "url('/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} */}

            {/* Background Image */}
            <Image
                unoptimized
                src={bgImg.src}
                alt={bgImg.alt}
                fill
                className="absolute top-0 left-0 z-[-1] object-cover w-full h-full sm:object-center brightness-75"
                priority
            />
            <div className="relative h-screen w-screen flex flex-col justify-center items-center  sm:p-20">
                {/* When user presses Click Me! button, introduction will be
                replaced with the joke */}
                <div className="grid grid-cols-1 gap-12">
                    {/* Glass morphism container for introduction to the joke generator */}
                    <div className="flex justify-center">
                        {intro ? (
                            <div className="w-[60%] h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex justify-center items-center border-solid border-[2px] border-[#b2a293] p-6 sm:p-8 md:p-12 backdrop-blur-[20px] bg-slate-600 bg-opacity-30">
                                <h3 className="bangers text-center items-center  text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                                    Welcome to the Joke Generator! Click the
                                    button below to get a random joke. You can
                                    filter jokes based on different categories
                                    to customize your experience. Enjoy!
                                </h3>
                            </div>
                        ) : (
                            <div className="w-[600px] h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]  tracking-wider text-center text-3xl text-md text-gray-200 pt-12 bangers drop-shadow-lg border ">
                                {isLoading ? (
                                    <div className="bangers">Loading...</div>
                                ) : joke ? (
                                    joke.type === "twopart" ? (
                                        <>
                                            <div className="pt-12">
                                                {joke.setup.toUpperCase()}
                                            </div>
                                            <div className="pt-12 text-5xl hide-punchline">
                                                {joke.delivery.toUpperCase()}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="pt-12 text-4xl">
                                            {joke.joke.toUpperCase()}
                                        </div>
                                    )
                                ) : null}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        {/* Fetches a random joke */}
                        <button
                            onClick={fetchJoke}
                            className="font-bold bangers relative rounded border-2 border-black bg-gray-200 py-1 text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-[150px] sm:w-[180px]">
                            Click Me!
                        </button>
                    </div>
                </div>

                {/* User can toggle which flags to blacklist*/}
                <footer className="flex flex-col items-center pt-4">
                    <h3 className="text-gray-200 bangers text-wrap text-center text-[1.5rem]">
                        NOTE: The jokes can be filtered through the following
                        buttons.
                    </h3>
                    <div className="flex flex-row flex-wrap items-end">
                        {Object.keys(flags).map((key) => (
                            <button
                                key={key}
                                onClick={() =>
                                    toggleFlag(key as keyof typeof flags)
                                }
                                className={`font-bold bangers relative rounded border-2 border-black  hover:bg-yellow-400 hover:text-gray-900 py-1 transition duration-100 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-sm lg:text-lg h-6 sm:h-10 px-3 sm:px-4 w-[120px] sm:w-[60px] md:w-[80px] ${
                                    flags[key as keyof typeof flags]
                                        ? "bg-yellow-400 text-gray-900"
                                        : "bg-gray-200 text-black"
                                }`}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>
                        ))}
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default JokeGenerator;
