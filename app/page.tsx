"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Service = {
  id: "fenster" | "glas" | "sonnenpanele";
  name: string;
  display: React.ReactNode;
  description: string;
  basePrice: number;
};

type BookedSlot = {
  date: string;
  time: string;
};

const services: Service[] = [
  {
    id: "fenster",
    name: "Fensterreinigung",
    display: (
      <>
        Fenster-
        <br />
        reinigung
      </>
    ),
    description:
      "Glasklare Fenster inklusive Rahmen & Fensterbänke.",
    basePrice: 49,
  },
  {
    id: "glas",
    name: "Glasreinigung",
    display: (
      <>
        Glas-
        <br />
        reinigung
      </>
    ),
    description:
      "Ideal für große Glasflächen & Wintergärten.",
    basePrice: 49,
  },
  {
    id: "sonnenpanele",
    name: "Sonnenpanelen Reinigung",
    display: (
      <>
        Sonnen-
        <br />
        panelen
      </>
    ),
    description:
      "Schonende Reinigung für maximale Leistung.",
    basePrice: 69,
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

function isSunday(date: string) {
  return new Date(`${date}T00:00:00`).getDay() === 0;
}

function formatDate(date: string) {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}

export default function Page() {
  const [service, setService] = useState<Service>(services[0]);

  const [quantity, setQuantity] = useState(4);

  const [heavy, setHeavy] = useState(false);

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [slots, setSlots] = useState<BookedSlot[]>([]);

  const [sending, setSending] = useState(false);

  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
    notes: "",
  });

  const price = useMemo(() => {
    return (
      service.basePrice +
      Math.max(quantity, 1) * 12 +
      (heavy ? 24 : 0)
    );
  }, [service, quantity, heavy]);

  const availableTimes = useMemo(() => {
    const booked = slots.map((s) => s.time);

    return times.filter((t) => !booked.includes(t));
  }, [slots]);

  useEffect(() => {
    if (!date || isSunday(date)) {
      setSlots([]);
      return;
    }

    fetch(`/api/slots?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.bookedSlots || []);
      })
      .catch(() => {
        setSlots([]);
      });
  }, [date]);

  async function submit(
    type: "booking" | "request"
  ) {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[0-9+\s\-()/]{6,}$/;

    if (form.name.trim().length < 2) {
      return setMsg(
        "Bitte vollständigen Namen eingeben."
      );
    }

    if (!phoneRegex.test(form.phone.trim())) {
      return setMsg(
        "Bitte gültige Telefonnummer eingeben."
      );
    }

    if (
      form.email &&
      !emailRegex.test(form.email)
    ) {
      return setMsg(
        "Bitte gültige E-Mail-Adresse eingeben."
      );
    }

    if (form.street.trim().length < 4) {
      return setMsg(
        "Bitte Straße und Hausnummer eingeben."
      );
    }

    if (form.postalCode.trim().length < 4) {
      return setMsg("Bitte gültige PLZ eingeben.");
    }

    if (form.city.trim().length < 2) {
      return setMsg(
        "Bitte gültigen Wohnort eingeben."
      );
    }

    if (!date) {
      return setMsg("Bitte Datum auswählen.");
    }

    if (!time) {
      return setMsg("Bitte Uhrzeit auswählen.");
    }

    setSending(true);

    setMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          type,

          service: {
            id: service.id,
            name: service.name,
            quantity,
            heavyDirt: heavy,
            estimatedPrice: price,
          },

          appointment: {
            date,
            time,
          },

          customer: form,

          paymentMethod: "Bar vor Ort",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(
          data.error ||
            "Buchung konnte nicht gespeichert werden."
        );

        return;
      }

      setMsg(
        type === "booking"
          ? "✔ Termin erfolgreich gebucht."
          : "✔ Anfrage erfolgreich gesendet."
      );

      setSlots((prev) => [
        ...prev,
        {
          date,
          time,
        },
      ]);
    } catch {
      setMsg(
        "Serverfehler. Bitte später erneut versuchen."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-lime-50 px-4 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl space-y-6">

        <section className="rounded-[40px] bg-slate-950 p-8 text-white shadow-2xl md:p-12">

          <div className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">

            <Image
              src="/logo.png"
              alt="ZeroCO"
              width={130}
              height={130}
              priority
              className="drop-shadow-2xl"
            />

            <div>
              <h1 className="text-5xl font-black tracking-tight">
                ZeroCO
              </h1>

              <p className="mt-2 text-lg text-slate-300">
                Gebäude-, Glas- & Fensterreinigung
              </p>
            </div>

          </div>

        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_420px]">

          <div className="space-y-6">

            <Card title="Welche Leistung wünschen Sie?">

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {services.map((item) => (

                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setService(item)}
                    className={`flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[32px] border p-7 text-left transition-all hover:-translate-y-1 hover:shadow-xl ${
                      service.id === item.id
                        ? "border-cyan-500 bg-cyan-50 shadow-lg"
                        : "border-slate-200 bg-white"
                    }`}
                  >

                    <div>

                      <Image
                        src="/logo.png"
                        alt="ZeroCO"
                        width={70}
                        height={70}
                        className="mb-6"
                      />

                      <div className="text-[34px] font-black leading-[1.02] tracking-[-0.04em]">
                        {item.display}
                      </div>

                      <div className="mt-5 text-base leading-8 text-slate-600">
                        {item.description}
                      </div>

                    </div>

                    <div className="mt-8 text-3xl font-black">
                      ab {item.basePrice} €
                    </div>

                  </button>
                ))}

              </div>

            </Card>

            <Card title="Preis berechnen">

              <div className="space-y-5">

                <Input
                  label={
                    service.id === "sonnenpanele"
                      ? "Anzahl Sonnenpanelen"
                      : "Ungefähre Angabe in m²"
                  }
                  type="number"
                  value={String(quantity)}
                  onChange={(v) =>
                    setQuantity(Number(v))
                  }
                />

                <label className="flex items-center justify-between rounded-2xl bg-cyan-50 p-5 text-sm font-bold">

                  <span>
                    Starke Verschmutzung (+24 €)
                  </span>

                  <input
                    type="checkbox"
                    checked={heavy}
                    onChange={(e) =>
                      setHeavy(e.target.checked)
                    }
                  />

                </label>

              </div>

            </Card>

            <Card title="Freien Termin auswählen">

              <p className="mb-4 text-sm text-slate-500">
                Sonntage sind nicht buchbar.
              </p>

              <input
                type="date"
                value={date}
                onChange={(e) => {
                  const selected = e.target.value;

                  if (isSunday(selected)) {
                    setMsg(
                      "Sonntage sind nicht buchbar."
                    );

                    return;
                  }

                  setDate(selected);

                  setTime("");
                }}
                className="h-14 w-full rounded-2xl border border-slate-300 px-5 text-lg outline-none focus:border-cyan-400"
              />

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">

                {availableTimes.map((slot) => (

                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-2xl border px-4 py-3 font-bold ${
                      time === slot
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    {slot}
                  </button>

                ))}

              </div>

            </Card>

            <Card title="Kundendaten">

              <div className="grid gap-4 md:grid-cols-2">

                <Input
                  label="Name *"
                  value={form.name}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      name: v,
                    })
                  }
                />

                <Input
                  label="Telefon *"
                  value={form.phone}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      phone: v,
                    })
                  }
                />

                <Input
                  label="E-Mail"
                  value={form.email}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      email: v,
                    })
                  }
                />

                <Input
                  label="Straße und Hausnummer *"
                  value={form.street}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      street: v,
                    })
                  }
                />

                <Input
                  label="PLZ *"
                  value={form.postalCode}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      postalCode: v,
                    })
                  }
                />

                <Input
                  label="Wohnort *"
                  value={form.city}
                  onChange={(v) =>
                    setForm({
                      ...form,
                      city: v,
                    })
                  }
                />

                <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">

                  Hinweise

                  <textarea
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                    className="min-h-[120px] rounded-2xl border border-slate-300 p-4 outline-none focus:border-cyan-400"
                  />

                </label>

              </div>

            </Card>

          </div>

          <aside className="h-fit rounded-[36px] bg-white p-7 shadow-2xl lg:sticky lg:top-6">

            <div>
              <div className="text-sm font-bold text-cyan-700">
                Zusammenfassung
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Ihre Buchung
              </h2>
            </div>

            <div className="mt-6 space-y-4">

              <SummaryRow
                label="Leistung"
                value={service.name}
              />

              <SummaryRow
                label="Termin"
                value={`${formatDate(date)} · ${
                  time || "-"
                }`}
              />

              <SummaryRow
                label="Preis"
                value={`${price} €`}
              />

              <SummaryRow
                label="Zahlung"
                value="Bar vor Ort"
              />

            </div>

            <div className="mt-6 rounded-3xl bg-lime-50 p-5 text-sm text-slate-700">

              <div className="font-bold text-lime-700">
                ✓ Keine Vorauszahlung erforderlich
              </div>

              <div className="mt-2">
                ✓ Kurzfristige Termine möglich
              </div>

              <div className="mt-2">
                ✓ Zuverlässiger Service
              </div>

            </div>

            <div className="mt-7 grid gap-4">

              <button
                type="button"
                disabled={sending}
                onClick={() =>
                  submit("booking")
                }
                className="rounded-3xl bg-lime-500 px-6 py-5 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] hover:bg-lime-400 disabled:opacity-60"
              >
                {sending
                  ? "Wird gesendet..."
                  : "Jetzt Termin sichern"}
              </button>

              <button
                type="button"
                disabled={sending}
                onClick={() =>
                  submit("request")
                }
                className="rounded-3xl bg-cyan-500 px-6 py-5 text-lg font-black text-white shadow-xl transition hover:scale-[1.01] hover:bg-cyan-400 disabled:opacity-60"
              >
                Anfrage senden
              </button>

            </div>

            {msg && (

              <div
                className={`mt-5 rounded-3xl p-5 font-bold ${
                  msg.startsWith("✔")
                    ? "bg-lime-50 text-lime-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {msg}
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
    <div className="rounded-[36px] bg-white p-7 shadow-xl">
      <h2 className="mb-6 text-3xl font-black">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="grid gap-2 text-sm font-bold text-slate-700">

      <span>{label}</span>

      <input
        suppressHydrationWarning
        autoComplete="off"
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-14 rounded-2xl border border-slate-300 px-5 text-lg outline-none focus:border-cyan-400"
      />

    </div>
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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-cyan-100 bg-cyan-50 px-5 py-4">

      <span className="text-sm font-bold text-slate-500">
        {label}
      </span>

      <strong className="text-right text-lg text-slate-950">
        {value}
      </strong>

    </div>
  );
}