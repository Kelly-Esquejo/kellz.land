import React from "react";
import Image from "next/image";

/* 
    From 59 car brands
    Pull images from Google Drive
    Folder Structure:
        Car Images
            Car Brand Name
                Model
                    Year

*/
const GuessTheCar = () => {
    return (
        <div>
            <Image className="" src="/toyota-86-2016.png" alt="" fill />
        </div>
    );
};

export default GuessTheCar;
