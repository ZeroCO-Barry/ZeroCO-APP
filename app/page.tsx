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

const times = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function Home() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <main className="min-h-screen bg-[#f4f7fb] p-5 text-black">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <header className="mb-10 rounded-[40px] bg-black px-10 py-8 text-white shadow-2xl">
          <div className="flex items-center justify-between gap-6">

            <div>
              <h1 className="text-6xl font-black tracking-tight">
                ZeroCO₂
              </h1>

              <p className="mt-4 text-xl text-gray-300">
                Gebäude-, Glas- & Fensterreinigung online buchen
              </p>
            </div>

            <Image
              src="/logo.png"
              alt="ZeroCO Gebäudereinigung"
              width={180}
              height={180}
              priority
              className="object-contain"
            />

          </div>
        </header>

        {/* SERVICES */}
        <section className="mb-10">
          <h2 className="text-5xl font-black">
            Leistungen auswählen
          </h2>

          <p className="mt-3 text-xl text-gray-500">
            Wählen Sie Ihre gewünschte Reinigung aus.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className={`rounded-[35px] border p-8 text-left transition-all duration-300 ${
                  selectedService.id === service.id
                    ? "border-lime-400 bg-lime-50 shadow-2xl"
                    : "border-gray-200 bg-white hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-4xl text-white">
                  {service.icon}
                </div>

                <h3 className="text-3xl font-black">
                  {service.title}
                </h3>

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

        {/* MAIN */}
        <section className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* DATE */}
            <Card title="Termin auswählen">
              <div className="grid gap-5 md:grid-cols-2">

                <Input
                  label="Datum"
                  type="date"
                  required
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
                        className={`rounded-2xl border px-4 py-4 text-lg font-bold transition ${
                          selectedTime === time
                            ? "border-lime-400 bg-lime-400 text-black"
                            : "border-gray-300 bg-white hover:border-lime-400 hover:bg-lime-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </Card>

            {/* CUSTOMER */}
            <Card title="Kundendaten">
              <div className="grid gap-5 md:grid-cols-2">

                <Input
                  label="Vorname"
                  required
                />

                <Input
                  label="Nachname"
                  required
                />

                <Input
                  label="E-Mail"
                  type="email"
                />

                <Input
                  label="Telefon"
                  required
                />

                <Input
                  label="Straße"
                  required
                />

                <Input
                  label="PLZ / Ort"
                  required
                />

              </div>
            </Card>

            {/* NOTES */}
            <Card title="Zusätzliche Informationen">
              <textarea
                placeholder="Weitere Hinweise..."
                className="min-h-[160px] w-full rounded-3xl border border-gray-300 p-5 text-lg outline-none transition focus:border-lime-400"
              />
            </Card>

          </div>

          {/* RIGHT */}
          <aside className="h-fit rounded-[40px] bg-black p-8 text-white shadow-2xl">

            <div className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
              Ihre Buchung
            </div>

            <h2 className="mt-3 text-4xl font-black">
              Zusammenfassung
            </h2>

            <div className="mt-8 space-y-4">

              <SummaryRow
                label="Leistung"
                value={selectedService.title}
              />

              <SummaryRow
                label="Preis ab"
                value={`${selectedService.price} €`}
              />

              <SummaryRow
                label="Uhrzeit"
                value={selectedTime || "-"}
              />

              <SummaryRow
                label="Anfahrt"
                value="inklusive"
              />

            </div>

            {/* WHITE BOX */}
            <div className="mt-8 rounded-3xl bg-white p-6 text-black shadow-xl">

              <div className="text-lg font-black">
                ✓ Keine Vorauszahlung
              </div>

              <div className="mt-3 font-medium">
                ✓ Flexible Terminvergabe
              </div>

              <div className="mt-3 font-medium">
                ✓ Professioneller Reinigungsservice
              </div>

            </div>

            <button className="mt-8 w-full rounded-3xl bg-white px-6 py-5 text-xl font-black text-black transition hover:bg-lime-400">
              Termin verbindlich buchen
            </button>

            <button className="mt-4 w-full rounded-3xl border border-white px-6 py-5 text-lg font-bold text-white transition hover:bg-white hover:text-black">
              Angebot anfragen
            </button>

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
    <div className="rounded-[35px] bg-white p-8 shadow-xl">
      <h3 className="mb-6 text-3xl font-black">
        {title}
      </h3>

      {children}
    </div>
  );
}

function Input({
  label,
  type = "text",
  required = false,
}: {
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">

      <div className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}

      </div>

      <input
        required={required}
        type={type}
        className="h-16 w-full rounded-3xl border border-gray-300 px-5 text-lg outline-none transition focus:border-lime-400"
      />

    </label>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4">
      <span className="text-gray-300">
        {label}
      </span>

      <span className="font-black">
        {value}
      </span>
    </div>
  );
}