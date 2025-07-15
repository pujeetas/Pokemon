import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import logo from "./img/logo.png";

const PokemonResult = ({ data }) => {
  if (!data) return null;

  const type = data.types.map((typ) => typ.type.name).join(", ");
  const abilities = data.abilities.map((abil) => abil.ability.name).join(", ");
  const officialArtwork =
    data.sprites?.other?.["official-artwork"]?.front_default || "";

  return (
    <div id="result">
      <h3 className="pokemon-name">{data.name.toUpperCase()}</h3>
      <p className="pokemon-id">Pokedex ID: #{data.id}</p>

      <div className="small-sprites-row">
        <img
          className="pokemon-front-sprite"
          src={data.sprites.front_shiny}
          alt={`${data.name} Front Shiny`}
        />
        <img
          className="pokemon-back-sprite"
          src={data.sprites.back_shiny}
          alt={`${data.name} Back Shiny`}
        />
      </div>

      {officialArtwork && (
        <img
          className="pokemon-official-artwork"
          src={officialArtwork}
          alt={`${data.name} Official Artwork`}
        />
      )}

      <p className="pokemon-height">Height: {data.height}</p>
      <p className="pokemon-weight">Weight: {data.weight}</p>
      <p className="pokemon-type">Type: {type}</p>
      <p className="pokemon-abilities">
        Abilities: <span>{abilities}</span>
      </p>

      <div className="pokemon-stats-container">
        {data.stats.map((statInfo, index) => (
          <p className="stat-item" key={index}>
            {statInfo.stat.name.toUpperCase()}:{" "}
            <span>{statInfo.base_stat}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const getPokemonName = async () => {
    setError(null);
    if (pokemonName.trim() === "") {
      setError("Enter POkemon Name");
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
        <img id="logo" src={logo} alt="logo" />
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
