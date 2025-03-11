// https://icons8.com/icon/set/food/doodle
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { CloudinaryImage } from "@/component/CloudinaryImage";

type SearchResult = {
    public_id: string;
};

export default async function Gallery() {
    const results = (await cloudinary.v2.search
        .expression("folder:Car AND resource_type:image")
        .max_results(3)
        .execute()) as { resources: SearchResult[] };

    console.log(results);

    return (
        <div>
            {results.resources.map((result) => (
                <CloudinaryImage
                    key={result.public_id}
                    src={result.public_id}
                    width={900}
                    height={600}
                    alt="Car Image"
                />
            ))}
        </div>
    );
}
