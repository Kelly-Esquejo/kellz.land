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
        <div className="flex flex-col  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <button
                onClick={fetchJoke}
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                {isLoading ? "Loading..." : "Get a Joke"}
            </button>

            {joke && !isLoading && (
                <>
                    {joke.type === "twopart" ? (
                        <>
                            <div className="">{joke.setup}</div>
                            <div className="">{joke.delivery}</div>
                        </>
                    ) : (
                        <div className="">{joke.joke}</div>
                    )}
                </>
            )}
        </div>
    );
};

export default JokeGenerator;
