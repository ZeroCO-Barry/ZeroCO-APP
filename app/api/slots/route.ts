import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

function getAuth() {
  return new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "secrets", "service-account.json"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({
        bookedSlots: [],
      });
    }

    const auth = getAuth();

    const calendar = google.calendar({
      version: "v3",
      auth,
    });

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const bookedSlots =
      response.data.items?.map((event) => {
        const start = event.start?.dateTime;

        if (!start) return null;

        const d = new Date(start);

        return {
          date,
          time: `${String(d.getHours()).padStart(2, "0")}:${String(
            d.getMinutes()
          ).padStart(2, "0")}`,
        };
      }).filter(Boolean) || [];

    return NextResponse.json({
      bookedSlots,
    });
  } catch (error) {
    console.error("Slots API Fehler:", error);

    return NextResponse.json({
      bookedSlots: [],
    });
  }
}