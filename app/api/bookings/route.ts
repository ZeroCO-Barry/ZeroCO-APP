import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function getAuth() {
  return new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "secrets", "service-account.json"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

function isSunday(date: string) {
  return new Date(`${date}T00:00:00`).getDay() === 0;
}

function slotToDate(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ bookedSlots: [] });
    }

    if (isSunday(date)) {
      return NextResponse.json({
        bookedSlots: TIMES.map((time) => ({ date, time })),
      });
    }

    const calendar = google.calendar({
      version: "v3",
      auth: getAuth(),
    });

    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);

    const response = await calendar.events.list({
      calendarId,
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];

    const bookedSlots = TIMES.filter((time) => {
      const slotStart = slotToDate(date, time);
      const slotEnd = new Date(slotStart);
      slotEnd.setHours(slotEnd.getHours() + 1);

      return events.some((event) => {
        const eventStartRaw = event.start?.dateTime || event.start?.date;
        const eventEndRaw = event.end?.dateTime || event.end?.date;

        if (!eventStartRaw || !eventEndRaw) return false;

        const eventStart = new Date(eventStartRaw);
        const eventEnd = new Date(eventEndRaw);

        return slotStart < eventEnd && slotEnd > eventStart;
      });
    }).map((time) => ({ date, time }));

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error("Slots API Fehler:", error);

    return NextResponse.json(
      { error: "Slots konnten nicht geladen werden", bookedSlots: [] },
      { status: 500 }
    );
  }
}