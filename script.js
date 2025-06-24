async function getPokemonName() {
  const name = document.getElementById("pokemon_name");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");
  const spinner = document.getElementById("spin");

  try {
    errorDiv.innerHTML = " ";
    if (name.value.trim() === "") {
      errorDiv.innerHTML = "<h3>Enter Pokemon name</h3>";
      return;
    }
    spinner.style.display = "block";
    await new Promise((resolve) => setTimeout(resolve, 500));
    const detail = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.value.toLowerCase()}`
    );
    spinner.style.display = "none";
    if (!detail.ok) {
      throw new Error(
        detail.status === 404 ? "Pokemon not found!!" : "Error fetching data"
      );
    }

    const data = await detail.json();
    resultDiv.style.visibility = "visible";

    const type = data.types.map((typ) => typ.type.name).join(", ");
    const abilities = data.abilities
      .map((abil) => abil.ability.name)
      .join(", ");

    let statsHtml = '<div class="pokemon-stats-container">';
    data.stats.forEach((statInfo) => {
      statsHtml += `<p class="stat-item">${statInfo.stat.name.toUpperCase()}: <span>${
        statInfo.base_stat
      }</span></p>`;
    });
    statsHtml += "</div>";

    const officialArtwork =
      data.sprites.other && data.sprites.other["official-artwork"]
        ? data.sprites.other["official-artwork"].front_default
        : "";

    resultDiv.innerHTML = `
    <h3 class="pokemon-name">${data.name.toUpperCase()}</h3>
    <p class="pokemon-id">Pokedex ID: #${data.id}</p>

    <div class="small-sprites-row"> <img class="pokemon-front-sprite" src="${
      data.sprites.front_shiny
    }" alt="${data.name} Front Shiny">
          <img class="pokemon-back-sprite" src="${
            data.sprites.back_shiny
          }" alt="${data.name} Back Shiny">
      </div>

    ${
      officialArtwork
        ? `<img class="pokemon-official-artwork" src="${officialArtwork}" alt="${data.name} Official Artwork">`
        : ""
    }

    <p class="pokemon-height">Height: ${data.height}</p>
    <p class="pokemon-weight">Weight: ${data.weight}</p>
    <p class="pokemon-type">Type: ${type}</p>
    <p class="pokemon-abilities">Abilities: <span>${abilities}</span></p>
      ${statsHtml}
`;
  } catch (error) {
    resultDiv.style.visibility = "hidden";
    resultDiv.innerHTML = " ";
    errorDiv.innerHTML = `<h3>${error.message}</h3>`;
  }
}
