"use client";
import React, { useState } from "react";

interface SingleJoke {
    type: "single";
    joke: string;
}

interface TwoPartJoke {
    type: "twopart";
    setup: string;
    delivery: string;
}

type Joke = SingleJoke | TwoPartJoke;

const JokeGenerator: React.FC = () => {
    const [joke, setJoke] = useState<Joke | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchJoke = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
            );
            const data: Joke = await response.json();
            setJoke(data);
        } catch (error) {
            console.error("Error fetching joke:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col items-center gap-16">
                {/* Joke container stays centered and does not affect layout */}
                <div className="text-center min-h-[80px] min-w-[80px]">
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
                {/* Button stays centered and retains normal size */}
                <button
                    onClick={fetchJoke}
                    className="fold-bold relative rounded border-2 border-black bg-white  py-1 font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900  border-solid border-transparent flex items-center justify-center bg-foreground text-background gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                    Click Me!
                </button>
            </div>
        </div>
    );
};

export default JokeGenerator;
