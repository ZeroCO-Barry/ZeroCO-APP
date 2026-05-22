export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.20),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(132,204,22,0.18),_transparent_28%),linear-gradient(to_bottom,_#f8fafc,_#ecfeff,_#f7fee7)] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[28px] border border-cyan-200 bg-white/90 p-6 shadow-lg md:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Impressum
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Angaben gemäß § 5 TMG
            </p>
          </div>

          <div className="space-y-6 text-sm leading-7 text-slate-700 md:text-base">
            <section>
              <p className="font-semibold text-slate-900">ZeroCO</p>
              <p className="mt-2">
                Barry Op t Veld
              </p>
            </section>

            <section>
              <p className="font-semibold text-slate-900">Post- und Lieferanschrift</p>
              <p className="mt-2">
                Raiffeisenstr. 3
                <br />
                52525 Waldfeucht
              </p>
            </section>

            <section>
              <p className="font-semibold text-slate-900">Kontakt</p>
              <p className="mt-2">
                Telefon +49 (0) 2455 930 8001
                <br />
                Mobil +49 (0) 151 107 82 55 9
              </p>
            </section>

            <section>
              <p className="font-semibold text-slate-900">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz
              </p>
              <p className="mt-2">DE455602477</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}