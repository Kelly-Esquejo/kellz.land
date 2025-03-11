"use client";
import { CldImage } from "next-cloudinary";

export function CloudinaryImage(props: any) {
    return (
        <div>
            <CldImage {...props} />
        </div>
    );
}
