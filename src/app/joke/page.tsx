/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const kellzLandArt = () => {
    return ` █████               ████  ████                ████                           █████
░░███               ░░███ ░░███               ░░███                          ░░███ 
 ░███ █████  ██████  ░███  ░███   █████████    ░███   ██████   ████████    ███████ 
 ░███░░███  ███░░███ ░███  ░███  ░█░░░░███     ░███  ░░░░░███ ░░███░░███  ███░░███ 
 ░██████░  ░███████  ░███  ░███  ░   ███░      ░███   ███████  ░███ ░███ ░███ ░███ 
 ░███░░███ ░███░░░   ░███  ░███    ███░   █    ░███  ███░░███  ░███ ░███ ░███ ░███ 
 ████ █████░░██████  █████ █████  █████████ ██ █████░░████████ ████ █████░░████████
░░░░ ░░░░░  ░░░░░░  ░░░░░ ░░░░░  ░░░░░░░░░ ░░ ░░░░░  ░░░░░░░░ ░░░░ ░░░░░  ░░░░░░░░ `;
};

const jokeTitleArt = () => {
    return ` ███████████ █████                        █████          █████                    █████████                                                    █████                      
░█░░░███░░░█░░███                        ░░███          ░░███                    ███░░░░░███                                                  ░░███                       
░   ░███  ░  ░███████    ██████           ░███   ██████  ░███ █████  ██████     ███     ░░░   ██████  ████████    ██████  ████████   ██████   ███████    ██████  ████████ 
    ░███     ░███░░███  ███░░███          ░███  ███░░███ ░███░░███  ███░░███   ░███          ███░░███░░███░░███  ███░░███░░███░░███ ░░░░░███ ░░░███░    ███░░███░░███░░███
    ░███     ░███ ░███ ░███████           ░███ ░███ ░███ ░██████░  ░███████    ░███    █████░███████  ░███ ░███ ░███████  ░███ ░░░   ███████   ░███    ░███ ░███ ░███ ░░░ 
    ░███     ░███ ░███ ░███░░░      ███   ░███ ░███ ░███ ░███░░███ ░███░░░     ░░███  ░░███ ░███░░░   ░███ ░███ ░███░░░   ░███      ███░░███   ░███ ███░███ ░███ ░███     
    █████    ████ █████░░██████    ░░████████  ░░██████  ████ █████░░██████     ░░█████████ ░░██████  ████ █████░░██████  █████    ░░████████  ░░█████ ░░██████  █████    
   ░░░░░    ░░░░ ░░░░░  ░░░░░░      ░░░░░░░░    ░░░░░░  ░░░░ ░░░░░  ░░░░░░       ░░░░░░░░░   ░░░░░░  ░░░░ ░░░░░  ░░░░░░  ░░░░░      ░░░░░░░░    ░░░░░   ░░░░░░  ░░░░░     `;
};

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
    const [safeMode, setSafeMode] = useState(true);

    const [flags, setFlags] = useState({
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
    });

    const toggleSafeMode = () => setSafeMode(!safeMode);

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
        // getRandomBgImg(); // Change the background image on each click

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

        // Check if safeMode is true and change apiUrl
        if (safeMode) {
            apiUrl = `https://v2.jokeapi.dev/joke/Any?safe-mode`;
        }

        // Testing purposes: Log the API URL to the console
        //console.log("API URL:", apiUrl);
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
        <div className="flex flex-col min-h-screen justify-between p-4">
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
                className="absolute top-0 left-0 z-[-1] object-cover w-full h-full sm:object-center brightness-50"
                priority
            />
            <header className="text-center">
                <pre className="text-[4px] text-purple-100">
                    <Link
                        href="https://kelly-esquejo.github.io/kellz.land/"
                        className="">
                        {kellzLandArt()}
                    </Link>
                </pre>
                {/* <pre className="text-[4px] pt-2 text-purple-100">
                    {jokeTitleArt()}
                </pre> */}
                <h4 className="text-3xl font-extrabold text-center text-yellow-400 drop-shadow-md md:text-4xl animate-bounce pt-2 font-[family-name:var(--font-geist-mono)]">
                    The Joke Generator
                </h4>
            </header>
            <main className="relative flex flex-col justify-center items-center">
                {/* When user presses Click Me! button, introduction will be 
                replaced with the joke */}
                <div className="grid grid-cols-1 pt-4 pb-4">
                    {/* Glass morphism container for introduction to the joke generator */}
                    <div className="flex justify-center">
                        {intro ? (
                            <div className="w-[90%] sm:w-[60%] h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex flex-col justify-center items-center border-solid rounded-md border-[2px] border-[#b2a293] p-6 sm:p-8 md:p-12 backdrop-blur-[20px] bg-slate-600 bg-opacity-30 font-[family-name:var(--font-geist-mono)] space-y-4">
                                <h3 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight text-white">
                                    Welcome to the Joke Generator! Click the
                                    button below to get a random joke. You can
                                    filter jokes based on different categories
                                    to customize your experience. Enjoy!
                                </h3>
                                <div className="text-center space-y-2">
                                    <h4 className="text-xl font-semibold text-red-500">
                                        Disclaimer:
                                    </h4>
                                    <span className="text-white text- uppercase">
                                        All jokes are not written by Kellz.Land
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-center w-[600px] h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] tracking-wider items-center text-center text-3xl text-md text-gray-200  bangers drop-shadow-lg ">
                                {isLoading ? (
                                    <div className="bangers">Loading...</div>
                                ) : joke ? (
                                    joke.type === "twopart" ? (
                                        <>
                                            <div className="">
                                                {joke.setup.toUpperCase()}
                                            </div>
                                            <div className="pt-12 text-5xl hide-punchline">
                                                {joke.delivery.toUpperCase()}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="pt-12 text-4xl ">
                                            {joke.joke.toUpperCase()}
                                        </div>
                                    )
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    {/* Fetches a random joke */}
                    <button
                        onClick={fetchJoke}
                        className="font-bold bangers relative rounded border-2 bg-gray-200 py-1 text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-[150px] sm:w-[180px]">
                        Click Me!
                    </button>
                    <button
                        className={`font-bold bangers relative rounded border-2 py-1 text-black transition duration-100 gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-[150px] sm:w-[180px] whitespace-nowrap ${
                            safeMode
                                ? "border-red-500 bg-red-300 hover:bg-red-400 hover:text-gray-900"
                                : "border-green-500 bg-green-300 hover:bg-green-400 hover:text-gray-900"
                        }`}
                        onClick={toggleSafeMode}>
                        {safeMode ? "Disable Safe Mode" : "Enable Safe Mode"}
                    </button>
                </div>
            </main>
            {/* Safe mode toggle */}
            {safeMode ? (
                <div></div>
            ) : (
                <footer className="flex flex-col items-center">
                    <h3 className="text-gray-200 text-wrap text-center text-xs sm:text-sm md:text-sm lg:text-lg font-[family-name:var(--font-geist-mono)]">
                        NOTE: The jokes can be filtered through the following
                        buttons.
                    </h3>
                    {/* User can toggle which flags to blacklist*/}
                    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:flex-wrap items-center justify-center pt-4">
                        {Object.keys(flags).map((key) => (
                            <button
                                key={key}
                                onClick={() =>
                                    toggleFlag(key as keyof typeof flags)
                                }
                                className={`font-bold bangers relative rounded border-2 hover:bg-yellow-400 hover:text-gray-900 py-1 transition duration-100 flex items-center justify-center gap-2 text-xs sm:text-sm md:text-sm lg:text-lg h-6 sm:h-10 px-3 sm:px-4 w-[120px] sm:w-[50px] md:w-[80px] ${
                                    flags[key as keyof typeof flags]
                                        ? "bg-yellow-400 text-gray-900"
                                        : "bg-gray-200 text-black"
                                }`}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>
                        ))}
                    </div>
                </footer>
            )}
        </div>
    );
};

export default JokeGenerator;
