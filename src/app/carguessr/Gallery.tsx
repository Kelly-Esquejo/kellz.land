// https://icons8.com/icon/set/food/doodle

import React from "react";
import cloudinary from "cloudinary";
import { CloudinaryImage } from "../foodle/cloudinary-image";

type SearchResult = {
    public_id: string;
};

export default async function Gallery(params: unknown) {
    const results = (await cloudinary.v2.search
        .expression("folder:Cars AND resource_type:image")
        .max_results(1)
        .execute()) as { resources: SearchResult[] };

    console.log(results);

    return (
        <div>
            {results.resources.map((result) => (
                <CloudinaryImage
                    key={result.public_id}
                    src={result.public_id}
                    alt="Car Image"
                    width={900}
                    height={600}
                />
            ))}
        </div>
    );
}
