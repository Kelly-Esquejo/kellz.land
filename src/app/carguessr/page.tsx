"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Input from "@/component/Input";
import Tesseract from "tesseract.js";

/* 
    From 59 car brands
    Pull images from Google Drive
    Folder Structure:
        Car Images
            Car Brand Name
                Model
                    Year

*/
// Replace with Google Drive direct links if needed

const carImages = [
    "/toyota-86-2016.png",
    "/shelby427Cobra-1966.png",
    "/HONDA-CIVIC-TYPE-R-CAR.png",
];

const CarGuessr: React.FC = () => {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    const [error, setError] = useState(false);

    const [carImage, setCarImage] = useState<string>(carImages[0]);

    const getRandomCar = () => {
        setCarImage(carImages[Math.floor(Math.random() * carImages.length)]);
    };

    const handleMakeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMake(e.target.value);
    };
    const handleModelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setModel(e.target.value);
    };
    const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
        setYear(e.target.value);
    };

    // Function to process the image and use Tesseract.js to detect text
    const processImageForText = (imageSrc: string) => {
        Tesseract.recognize(imageSrc, "eng", {
            logger: (m) => console.log(m), // Optional: logs progress info
        })
            .then(({ data: { text } }) => {
                console.log("Detected Text:", text); // Logs detected text
            })
            .catch((error) => {
                console.error("Error with Tesseract.js:", error);
            });
    };

    useEffect(() => {
        // Process the current car image when it's set
        processImageForText(carImage);
    }, [carImage]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full gap-4">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Car Guessr
            </h1>
            {/* Processed Image with Hidden Logos */}
            <Image
                className="w-[900px] h-[600px] items-center justify-center object-contain"
                src={carImage}
                alt="Car"
                width={900}
                height={600}
            />
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <form className="w-full flex gap-4 items-center justify-center">
                    <Input
                        labelClassName="block uppercase tracking-wide text-gray-950 text-xs font-bold mb-2"
                        inputClassName="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        label="Make"
                        value={make}
                        name="make"
                        error={error}
                        onChange={handleMakeChange}
                        placeholder="Shelby"
                    />
                    <Input
                        labelClassName="block uppercase tracking-wide text-gray-950 text-xs font-bold mb-2"
                        inputClassName="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        label="Model"
                        value={model}
                        name="model"
                        error={error}
                        onChange={handleModelChange}
                        placeholder="427 Cobra"
                    />

                    <Input
                        labelClassName="block uppercase tracking-wide text-gray-950 text-xs font-bold mb-2"
                        inputClassName="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        label="Year"
                        value={year}
                        name="year"
                        error={error}
                        onChange={handleYearChange}
                        placeholder="1966"
                    />
                    {/* <div>
                        <label
                            className="block uppercase tracking-wide text-gray-950 text-xs font-bold mb-2"
                            htmlFor="year">
                            Year
                        </label>
                        <input
                            className="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="year"
                            type="text"
                            placeholder="1966"
                        />
                    </div> */}
                </form>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={getRandomCar}>
                    New Car
                </button>
            </div>
        </div>
    );
};

export default CarGuessr;
