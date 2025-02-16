import { google } from "googleapis";
import { NextResponse } from "next/server";

// You should retrieve the access token from your session or database here
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Example: Set access token retrieved from session or DB
oauth2Client.setCredentials({
    access_token: "user-access-token", // Replace with actual token
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

export async function GET() {
    try {
        const response = await drive.files.list({
            pageSize: 10,
            fields: "nextPageToken, files(id, name)",
        });

        return NextResponse.json(response.data.files);
    } catch (error: unknown) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            console.error(error.message); // Log the error message
            return NextResponse.json(
                {
                    error: "Error fetching files from Google Drive",
                    details: error.message,
                },
                { status: 500 }
            );
        } else {
            // Handle unexpected error type
            console.error("Unknown error occurred");
            return NextResponse.json(
                {
                    error: "Error fetching files from Google Drive",
                    details: "Unknown error",
                },
                { status: 500 }
            );
        }
    }
}
