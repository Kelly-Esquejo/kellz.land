import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

type SearchResult = {
    public_id: string;
};

export async function GET() {
    const results = (await cloudinary.v2.search
        .expression("folder:Car AND resource_type:image")
        .max_results(3)
        .execute()) as { resources: SearchResult[] };

    console.log("Results.resources");
    console.log(results.resources);

    // Send JSON response back to client
    return Response.json({ resources: results.resources }, { status: 200 });
}
