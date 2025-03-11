import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

export async function GET(
    req: Request,
    { params }: { params: { fieldId: string } }
) {
    try {
        const { fieldId } = params; // Extract the fieldId from URL
        if (!fieldId) {
            return NextResponse.json(
                { error: "Missing fieldId" },
                { status: 400 }
            );
        }

        const result = await cloudinary.v2.api.metadata_field_by_field_id(
            fieldId
        );

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching metadata field:", error);
        return NextResponse.json(
            { error: "Failed to fetch metadata field" },
            { status: 500 }
        );
    }
}
