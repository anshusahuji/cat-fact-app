import { useState } from "react";
import "./App.css";

function App() {
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFact = async () => {
    try {
      setLoading(true);
      setError("");
      setFact("");

      const res = await fetch("https://catfact.ninja/fact");
      if (!res.ok) throw new Error("Failed to fetch fact");

      const data = await res.json();
      setFact(data.fact);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🐱 Cat Fact Generator</h1>

      <button onClick={fetchFact} className="button">
        {loading ? "Loading..." : "Get New Fact"}
      </button>

      {error && <p className="error">{error}</p>}

      {fact && <div className="factBox">{fact}</div>}
    </div>
  );
}

export default App;
