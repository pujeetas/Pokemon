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
export default PokemonResult;
