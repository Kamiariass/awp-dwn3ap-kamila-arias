const buscador = document.getElementById("buscador");

buscador.addEventListener("input", async function () {
  const nombre = buscador.value.trim().toLowerCase();
  const contenedor = document.getElementById("pokemon-list");

  if (nombre === "") {
    contenedor.innerHTML = "";
    obtenerPokemones();
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
    if (!response.ok) {
      contenedor.innerHTML = `<p class="text-danger text-center mt-4">No se pudo realizar la búsqueda.</p>`;
      return;
    }

    const data = await response.json();
    const pokemonsFiltrados = data.results.filter(pokemon =>
      pokemon.name.toLowerCase().startsWith(nombre)
    );

    if (pokemonsFiltrados.length === 0) {
      contenedor.innerHTML = `<p class="text-danger text-center mt-4">No se encontraron Pokémon que comiencen con "${nombre}".</p>`;
      return;
    }

    contenedor.innerHTML = "";

    for (const pokemon of pokemonsFiltrados) {
      const detalles = await obtenerDetallesPokemon(pokemon.url);
      renderPokemon(detalles);
    }

  } catch (error) {
    console.error("Error en la búsqueda:", error);
    contenedor.innerHTML = `<p class="text-danger text-center mt-4">Ocurrió un error al buscar.</p>`;
  }
});

async function obtenerDetallesPokemon(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener detalles del Pokémon:", error);
    return null;
  }
}

function renderPokemon(pokemon) {
  const contenedor = document.getElementById("pokemon-list");

  if (!pokemon || !pokemon.sprites || !pokemon.name) return;

  const col = document.createElement("div");
  col.className = "col-sm-6 col-md-4 col-lg-3";

  col.innerHTML = `
    <div class="card h-100 text-center">
      <img src="${pokemon.sprites.front_default}" class="card-img-top mx-auto mt-3" alt="${pokemon.name}" style="width: 100px;" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
        <button class="btn btn-primary mt-auto" onclick="verDetalles(${pokemon.id})">Ver Detalles</button>
      </div>
    </div>
  `;

  contenedor.appendChild(col);
}

async function obtenerPokemones() {
  const contenedor = document.getElementById("pokemon-list");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
    const data = await response.json();

    contenedor.innerHTML = "";

    for (const pokemon of data.results) {
      const detalles = await obtenerDetallesPokemon(pokemon.url);
      renderPokemon(detalles);
    }

  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    contenedor.innerHTML = `<p class="text-danger text-center mt-4">No se pudo cargar los Pokémon.</p>`;
  }
}
