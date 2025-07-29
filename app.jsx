import { useState } from "react";
import ReactDOM from "react-dom/client";
import logoImg from "./img/logo.png";

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const getPokemonName = async () => {
    setError(null);
    if (pokemonName.trim() === "") {
      setError("Enter Pokemon Name");
      return;
    }
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const detail = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );

      if (!detail.ok) {
        throw new Error(
          detail.status === 404 ? "Pokemon Not Found" : "Error fetching data"
        );
      }
      const data = await detail.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="body_div">
      <div id="header">
        <img id="logo" src={logoImg} alt="logo" />
        <h1>Get Your Pokemon Info!</h1>
      </div>
      <div id="input_field">
        <input
          type="text"
          id="pokemon_name"
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
      </div>
      {loading && (
        <div id="spin">
          <span className="dot">
            <img src="/img/loading_img.png" />
          </span>
          <span className="dot">
            <img src="/img/loading_img.png" />
          </span>
          <span className="dot">
            <img src="/img/loading_img.png" />
          </span>
        </div>
      )}
      <div id="button">
        <input
          type="image"
          src="/img/btn.png"
          alt="button image"
          id="btn"
          onClick={getPokemonName}
        />
      </div>
      {error && (
        <div id="error">
          <h3>{error}</h3>
        </div>
      )}

      <div id="result" className={result ? "visible" : ""}>
        {result && <PokemonResult data={result} />}
      </div>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
