const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

const contenedor = document.getElementById("pokemon-detalle");

async function obtenerPokemonPorId(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    mostrarDetalle(pokemon);
  } catch (error) {
    contenedor.innerHTML = `<p>Error al cargar detalles.</p>`;
    console.error("Error al obtener detalles:", error);
  }
}

function mostrarDetalle(pokemon) {
  const imagen = pokemon.sprites.other["official-artwork"]?.front_default;

  if (!imagen) {
    contenedor.innerHTML = `
      <div class="card mx-auto mt-4" style="max-width: 500px;">
        <div class="card-body">
          <h3 class="card-title text-capitalize">${pokemon.name}</h3>
          <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> ${pokemon.abilities.map(h => h.ability.name).join(", ")}</p>
          <p class="text-center">No hay imagen disponible para este Pokémon.</p>
          <button class="btn btn-warning" onclick="agregarAFavoritos(${pokemon.id}, '${pokemon.name}', '${imagen}')">⭐ Agregar a Favoritos ⭐</button>
        </div>
      </div>
    `;
  } else {
    contenedor.innerHTML = `
      <div class="card mx-auto mt-4" style="max-width: 500px;">
        <img src="${imagen}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
          <h3 class="card-title text-capitalize">${pokemon.name}</h3>
          <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> ${pokemon.abilities.map(h => h.ability.name).join(", ")}</p>
          <button class="btn btn-warning" onclick="agregarAFavoritos(${pokemon.id}, '${pokemon.name}', '${imagen}')">⭐ Agregar a Favoritos ⭐</button>
        </div>
      </div>
    `;
  }
}

function agregarAFavoritos(id, nombre, imagen) {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.find(poke => poke.id === id);

  if (!existe) {
    favoritos.push({ id, nombre, imagen });
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    Swal.fire({
      title: `${nombre} agregado a favoritos!`,
      text: `¡Este Pokémon se ha añadido correctamente a tu lista de favoritos!`,
      icon: 'success',
      confirmButtonText: '¡Genial!'
    });
  } else {
    Swal.fire({
      title: `${nombre} ya está en tus favoritos`,
      text: `Este Pokémon ya ha sido agregado previamente.`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  }
}

if (pokemonId) {
  obtenerPokemonPorId(pokemonId);
}
