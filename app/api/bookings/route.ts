import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const service = body.service?.name || "Unbekannte Leistung";
    const date = body.appointment?.date;
    const time = body.appointment?.time;
    const customer = body.customer;

    if (!date || !time || !customer?.name || !customer?.phone) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen." },
        { status: 400 }
      );
    }

    console.log("Neue Buchung:", {
      service,
      date,
      time,
      customer,
    });

    return NextResponse.json({
      success: true,
      message: "Termin erfolgreich gebucht.",
    });
  } catch (error) {
    console.error("Booking API Fehler:", error);

    return NextResponse.json(
      { error: "Buchung konnte nicht verarbeitet werden." },
      { status: 500 }
    );
  }
}