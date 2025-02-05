import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="b">Kellz.fun</h1>
                <ul className="max-w-md space-y-1 text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2 ">
                        Inspired by Neal.Fun
                        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                            https://neal.fun/
                        </code>
                    </li>
                </ul>

                <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                        <Link href="/carguessr">Car Guessr</Link>
                    </div>
                    <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                        <Link href="/guessthelogo">Logo Guessr</Link>
                    </div>
                    <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                        <Link href="/foodle">foodle</Link>
                    </div>
                    <div className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                        <Link href="/aimtraining">Aim Training</Link>
                    </div>
                </div>
            </main>
            <footer className="flex row-start-3 gap-6 flex-wrap items-center justify-center">
                <h3>I'm Kelly</h3>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://www.linkedin.com/in/kelly-esquejo/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            aria-hidden
                            src="/window.svg"
                            alt="Window icon"
                            width={16}
                            height={16}
                        />
                        LinkedIn
                    </a>
                    <a
                        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                        href="https://github.com/Kelly-Esquejo/kellz.fun"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Image
                            aria-hidden4
                            src="/globe.svg"
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
