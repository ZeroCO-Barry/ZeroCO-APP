export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          ZeroCO₂
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#666",
          }}
        >
          Terminbuchung
        </p>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="E-Mail"
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Telefon"
            style={inputStyle}
          />

          <input
            type="date"
            style={inputStyle}
          />

          <select style={inputStyle}>
            <option>Beratung auswählen</option>
            <option>PV-Beratung</option>
            <option>Fördermittel</option>
            <option>Energieberatung</option>
          </select>

          <button
            type="submit"
            style={{
              background: "#000",
              color: "#fff",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Termin buchen
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
};