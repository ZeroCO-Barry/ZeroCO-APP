"use client";

import { useState } from "react";

const services = [
  {
    id: "fenster",
    title: "Fenster- reinigung",
    text: "Glasklare Fenster inklusive Rahmen & Fensterbänke.",
    price: 49,
  },
  {
    id: "glas",
    title: "Glas- reinigung",
    text: "Ideal für große Glasflächen & Wintergärten.",
    price: 49,
  },
  {
    id: "solar",
    title: "Sonnen- panelen",
    text: "Schonende Reinigung für maximale Leistung.",
    price: 69,
  },
];

export default function Home() {
  const [selected, setSelected] = useState(services[0]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-lime-50 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-[36px] bg-slate-950 p-8 text-white shadow-2xl">
          <h1 className="text-5xl font-black">ZeroCO</h1>
          <p className="mt-2 text-lg text-slate-300">
            Gebäude-, Glas- & Fensterreinigung online buchen
          </p>
        </header>

        <section className="rounded-[36px] bg-white p-7 shadow-xl">
          <h2 className="mb-6 text-3xl font-black">
            Welche Leistung wünschen Sie?
          </h2>

          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelected(service)}
                className={`min-h-[260px] rounded-[30px] border p-7 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                  selected.id === service.id
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-lime-400 text-2xl font-black">
                  Z
                </div>

                <h3 className="whitespace-pre-line text-4xl font-black leading-none">
                  {service.title.replace(" ", "\n")}
                </h3>

                <p className="mt-5 leading-7 text-slate-600">
                  {service.text}
                </p>

                <div className="mt-6 text-2xl font-black">
                  ab {service.price} €
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Card title="Preis berechnen">
              <Input label="Menge / Fläche" placeholder="z. B. 4 m²" />
              <label className="mt-4 flex items-center justify-between rounded-2xl bg-cyan-50 p-5 font-bold">
                Starke Verschmutzung (+24 €)
                <input type="checkbox" />
              </label>
            </Card>

            <Card title="Termin auswählen">
              <Input type="date" label="Datum" />
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map(
                  (time) => (
                    <button
                      key={time}
                      type="button"
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold hover:border-cyan-500 hover:bg-cyan-50"
                    >
                      {time}
                    </button>
                  )
                )}
              </div>
            </Card>

            <Card title="Kundendaten">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Name *" />
                <Input label="Telefon *" />
                <Input label="E-Mail" />
                <Input label="Straße und Hausnummer *" />
                <Input label="PLZ *" />
                <Input label="Wohnort *" />
              </div>
            </Card>
          </div>

          <aside className="h-fit rounded-[36px] bg-white p-7 shadow-2xl">
            <div className="text-sm font-bold text-cyan-700">
              Zusammenfassung
            </div>

            <h2 className="mt-2 text-3xl font-black">Ihre Buchung</h2>

            <div className="mt-6 space-y-4">
              <Row label="Leistung" value={selected.title.replace(" ", "")} />
              <Row label="Preis ab" value={`${selected.price} €`} />
              <Row label="Zahlung" value="Bar vor Ort" />
            </div>

            <div className="mt-6 rounded-3xl bg-lime-50 p-5 text-sm text-slate-700">
              <div className="font-bold text-lime-700">
                ✓ Keine Vorauszahlung erforderlich
              </div>
              <div className="mt-2">✓ Kurzfristige Termine möglich</div>
              <div className="mt-2">✓ Zuverlässiger Service</div>
            </div>

            <button className="mt-7 w-full rounded-3xl bg-lime-500 px-6 py-5 text-lg font-black text-white shadow-xl">
              Jetzt Termin sichern
            </button>

            <button className="mt-4 w-full rounded-3xl bg-cyan-500 px-6 py-5 text-lg font-black text-white shadow-xl">
              Anfrage senden
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
    <section className="rounded-[36px] bg-white p-7 shadow-xl">
      <h2 className="mb-6 text-3xl font-black">{title}</h2>
      {children}
    </section>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className="h-14 rounded-2xl border border-slate-300 px-5 text-lg outline-none focus:border-cyan-400"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 rounded-2xl bg-cyan-50 px-5 py-4">
      <span className="font-bold text-slate-500">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}