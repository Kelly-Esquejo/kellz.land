/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import InfiniteCarousel from "@/component/InfiniteCarousel";

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

const logos = [
    {
        src: "carguessr.png",
        url: "/carguessr",
        alt: "Car logo",
        className: "coming-soon",
    },
    {
        src: "joke.png",
        url: "/joke",
        alt: "Joke",
    },
    {
        src: "guess.png",
        url: "/guessthelogo",
        alt: "Guess Logo",
        className: "coming-soon",
    },
    {
        src: "foodguessr.png",
        url: "/foodle",
        alt: "Food Guessr Logo",
        className: "coming-soon",
    },
    {
        src: "reaction.png",
        url: "/reactiontraining",
        alt: "Reaction Training Logo",
        className: "coming-soon",
    },
];
let vehicle = {
    wheels: "4",
    fuelType: "Gasoline",
    color: "Green",
};
let carProps = {
    type: {
        value: "Volkswagen",
    },
    model: {
        value: "Golf",
    },
};

let car = Object.create(vehicle, carProps);
console.log(car);
export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-mono)]">
            <header>
                <pre className="text-[6px] ">{kellzLandArt()}</pre>
            </header>
            {/* <header>kellz.land</header> */}
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-xs sm:max-w-md lg:max-w-lg ">
                {/* button for links */}
                <InfiniteCarousel items={logos} width="100px" height="100px" />
                <ul className="max-w-md space-y-1 text-sm text-center font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2 ">
                        Explore a variety of fun and interactive web activities,
                        inspired by NEAL.FUN, featuring the things I enjoy and
                        love.
                    </li>
                    <li className="mb-2 ">
                        <a
                            className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold"
                            href="https://neal.fun/"
                        >
                            https://neal.fun/
                        </a>
                    </li>
                </ul>
            </main>
            <footer className="flex row-start-3 gap-6 flex-wrap items-center justify-center">
                <h3>I&apos;m Kelly. </h3>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://www.linkedin.com/in/kelly-esquejo/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            unoptimized
                            src="window.svg"
                            alt="Window icon"
                            width={16}
                            height={16}
                        />
                        LinkedIn
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://kellz-land.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            unoptimized
                            src="globe.svg"
                            alt="Globe icon"
                            width={16}
                            height={16}
                        />
                        Go to GitHub →
                    </a>
                </footer>
            </footer>
        </div>
    );
}
