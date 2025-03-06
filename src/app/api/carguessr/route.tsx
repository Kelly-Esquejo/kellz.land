import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await cloudinary.v2.search
            .expression("folder:Cars AND resource_type:image")
            .max_results(1)
            .execute();
        res.status(200).json({ resources: results.resources });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch images from Cloudinary",
        });
    }
}

export default handler;
