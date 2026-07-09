"use client";

import Image from "next/image";
import { useState } from "react";

const services = [
  {
    id: "fenster",
    title: "Fensterreinigung",
    description: "Glasklare Fenster inklusive Rahmen und Fensterbänke.",
    price: 49,
    icon: "🪟",
  },
  {
    id: "glas",
    title: "Glasreinigung",
    description: "Perfekt für Glasflächen, Wintergärten und Schaufenster.",
    price: 59,
    icon: "✨",
  },
  {
    id: "solar",
    title: "Solaranlagen",
    description: "Schonende Reinigung für maximale Energieeffizienz.",
    price: 69,
    icon: "☀️",
  },
];

const times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

function formatDate(date: string) {
  if (!date) return "-";

  const d = new Date(`${date}T00:00:00`);

  return `${String(d.getDate()).padStart(2, "0")}.${String(
    d.getMonth() + 1
  ).padStart(2, "0")}.${d.getFullYear()}`;
}

export default function Home() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    notes: "",
  });

  async function submitBooking(type: "booking" | "request") {
    if (!date) return setMessage("Bitte Datum auswählen.");
    if (!selectedTime) return setMessage("Bitte Uhrzeit auswählen.");
    if (!form.firstName.trim()) return setMessage("Bitte Vorname ausfüllen.");
    if (!form.lastName.trim()) return setMessage("Bitte Nachname ausfüllen.");
    if (!form.phone.trim()) return setMessage("Bitte Telefon ausfüllen.");
    if (!form.street.trim()) return setMessage("Bitte Straße ausfüllen.");
    if (!form.city.trim()) return setMessage("Bitte PLZ / Ort ausfüllen.");

    setSending(true);
    setMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          service: {
            id: selectedService.id,
            name: selectedService.title,
            estimatedPrice: selectedService.price,
            quantity: 1,
            heavyDirt: false,
          },
          appointment: {
            date,
            time: selectedTime,
          },
          customer: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
            street: form.street,
            postalCode: "",
            city: form.city,
            notes: form.notes,
          },
          paymentMethod: "Bar vor Ort",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Buchung konnte nicht gespeichert werden.");
        return;
      }

      setMessage(
        type === "booking"
          ? "✔ Termin erfolgreich gebucht."
          : "✔ Anfrage erfolgreich gesendet."
      );
    } catch {
      setMessage("Serverfehler. Bitte später erneut versuchen.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-200 via-lime-100 to-pink-100 p-5 text-black">
      <div className="mx-auto max-w-7xl">
        <header className="glass mb-10 rounded-[40px] p-10 shadow-2xl">
          <div className="flex flex-col items-start">
            <Image
              src="/logo.png"
              alt="ZeroCO Gebäudereinigung"
              width={240}
              height={240}
              priority
              className="h-auto w-[240px] object-contain"
            />

            <p className="mt-4 text-xl text-slate-700">
              Gebäude-, Glas- & Fensterreinigung online buchen
            </p>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-5xl font-black">Leistungen auswählen</h2>

          <p className="mt-3 text-xl text-slate-700">
            Wählen Sie Ihre gewünschte Reinigung aus.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className={`service-card ${
                  selectedService.id === service.id ? "active-service" : ""
                }`}
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-4xl text-white">
                  {service.icon}
                </div>

                <h3 className="text-3xl font-black">{service.title}</h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {service.description}
                </p>

                <div className="mt-6 text-2xl font-black">
                  ab {service.price} €
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-8">
            <Card title="Termin auswählen">
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Datum"
                  type="date"
                  required
                  value={date}
                  onChange={setDate}
                />

                <div>
                  <div className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500">
                    Uhrzeit
                    <span className="ml-1 text-red-500">*</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {times.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`time-button ${
                          selectedTime === time ? "active-time" : ""
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Kundendaten">
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Vorname"
                  required
                  value={form.firstName}
                  onChange={(value) => setForm({ ...form, firstName: value })}
                />

                <Input
                  label="Nachname"
                  required
                  value={form.lastName}
                  onChange={(value) => setForm({ ...form, lastName: value })}
                />

                <Input
                  label="E-Mail"
                  type="email"
                  value={form.email}
                  onChange={(value) => setForm({ ...form, email: value })}
                />

                <Input
                  label="Telefon"
                  required
                  value={form.phone}
                  onChange={(value) => setForm({ ...form, phone: value })}
                />

                <Input
                  label="Straße"
                  required
                  value={form.street}
                  onChange={(value) => setForm({ ...form, street: value })}
                />

                <Input
                  label="PLZ / Ort"
                  required
                  value={form.city}
                  onChange={(value) => setForm({ ...form, city: value })}
                />
              </div>
            </Card>

            <Card title="Zusätzliche Informationen">
              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({ ...form, notes: event.target.value })
                }
                placeholder="Weitere Hinweise..."
                className="input-style min-h-[160px] p-5"
              />
            </Card>
          </div>

          <aside className="glass h-fit rounded-[40px] p-8 shadow-2xl">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-lime-500">
              Ihre Buchung
            </div>

            <h2 className="mt-3 text-4xl font-black">Zusammenfassung</h2>

            <div className="mt-8 space-y-4">
              <SummaryRow label="Leistung" value={selectedService.title} />
              <SummaryRow label="Preis ab" value={`${selectedService.price} €`} />
              <SummaryRow label="Datum" value={formatDate(date)} />
              <SummaryRow label="Uhrzeit" value={selectedTime || "-"} />
              <SummaryRow label="Anfahrt" value="inklusive" />
            </div>

            <div className="mt-8 rounded-3xl bg-lime-400 p-6 text-black shadow-xl">
              <div className="text-lg font-black">✓ Keine Vorauszahlung</div>
              <div className="mt-3 font-medium">✓ Flexible Terminvergabe</div>
              <div className="mt-3 font-medium">
                ✓ Professioneller Reinigungsservice
              </div>
            </div>

            <button
              type="button"
              disabled={sending}
              onClick={() => submitBooking("booking")}
              className="booking-button disabled:opacity-60"
            >
              {sending ? "Wird gesendet..." : "Termin verbindlich buchen"}
            </button>

            <button
              type="button"
              disabled={sending}
              onClick={() => submitBooking("request")}
              className="offer-button disabled:opacity-60"
            >
              Angebot anfragen
            </button>

            {message && (
              <div
                className={`mt-5 rounded-3xl p-5 font-bold ${
                  message.startsWith("✔")
                    ? "bg-lime-100 text-lime-900"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-[35px] p-8 shadow-xl">
      <h3 className="mb-6 text-3xl font-black">{title}</h3>
      {children}
    </div>
  );
}

function Input({
  label,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </div>

      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-style"
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span className="text-gray-600">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}