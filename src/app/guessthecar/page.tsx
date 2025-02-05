"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

const GuessTheCar: React.FC = () => {
    const [carImage, setCarImage] = useState<string>(carImages[0]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getRandomCar = () => {
        setCarImage(carImages[Math.floor(Math.random() * carImages.length)]);
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
            {/* Processed Image with Hidden Logos */}

            <Image
                className="max-w-full h-auto"
                src={carImage}
                alt="Car"
                width={1000}
                height={600}
            />
            <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={getRandomCar}>
                New Car
            </button>
        </div>
    );
};

export default GuessTheCar;
