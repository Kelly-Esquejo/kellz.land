import cloudinary from "cloudinary";

export async function GET() {
    try {
        const results = await cloudinary.v2.api.resource("IMG_996_khvewz");
        // Extract only the metadata field
        const metadata = results.metadata;

        return Response.json(metadata, { status: 200 });
    } catch (error) {
        console.error("Cloudinary API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
