import { google } from "googleapis";
import { NextResponse } from "next/server";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.json(
            { error: "Authorization code missing" },
            { status: 400 }
        );
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Store tokens securely (e.g., session or database)
        return NextResponse.json(tokens, { status: 200 });
    } catch (error: unknown) {
        // Type guard to check if error is an instance of Error
        if (error instanceof Error) {
            console.error(error.message); // Log the error message
            return NextResponse.json(
                { error: "Failed to authenticate", details: error.message },
                { status: 500 }
            );
        } else {
            // In case the error is not an instance of Error
            console.error("Unknown error occurred");
            return NextResponse.json(
                { error: "Failed to authenticate", details: "Unknown error" },
                { status: 500 }
            );
        }
    }
}
