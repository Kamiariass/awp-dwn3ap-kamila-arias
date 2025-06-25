const contenedor = document.getElementById("pokemon-list");

async function obtenerPokemones(limit = 20) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de Pokémon.");
    }
    const data = await response.json();
    console.log(data);  
    const pokemones = data.results;
    const detallesPokemones = await Promise.all(pokemones.map(poke => obtenerDetallePokemon(poke.url)));

    detallesPokemones.forEach(pokeData => {
      if (pokeData) renderPokemon(pokeData); 
    });

  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    contenedor.innerHTML = `<p class="text-danger text-center mt-4">Ocurrió un error al obtener los Pokémon.</p>`;
  }
}
async function obtenerDetallePokemon(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("No se pudo obtener los detalles del Pokémon.");
    }
    const data = await response.json();
    console.log(data);  
    return data;
  } catch (error) {
    console.error("Error al obtener detalles del Pokémon:", error);
    return null;
  }
}

function renderPokemon(pokemon) {
  if (!pokemon || !pokemon.sprites || !pokemon.sprites.front_default) {
    return; 
  }

  const col = document.createElement("div");
  col.className = "col-sm-6 col-md-4 col-lg-3";

  col.innerHTML = `
    <div class="card h-100 text-center">
      <img src="${pokemon.sprites.front_default || 'default-image.jpg'}" class="card-img-top mx-auto mt-3" alt="${pokemon.name}" style="width: 100px;" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
        <button class="btn btn-primary mt-auto" onclick="verDetalles(${pokemon.id})">Ver Detalles </button>
      </div>
    </div>
  `;

  contenedor.appendChild(col);
}

function verDetalles(id) {
  window.location.href = `detalles.html?id=${id}`;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('Service Worker registrado:', reg);
    })
    .catch(err => {
      console.error('Error al registrar Service Worker:', err);
    });
}


obtenerPokemones();
