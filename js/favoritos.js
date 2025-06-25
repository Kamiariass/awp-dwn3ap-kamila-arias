const favoritosContainer = document.getElementById("favoritos-list");

function cargarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  
  if (favoritos.length === 0) {
    favoritosContainer.innerHTML = `<p>No tienes Pokémon en favoritos.</p>`;
  } else {
    favoritosContainer.innerHTML = favoritos.map(pokemon => {
      return `
        <div class="col-md-4">
          <div class="card">
            <img src="${pokemon.imagen}" class="card-img-top" alt="${pokemon.nombre}">
            <div class="card-body">
              <h5 class="card-title">${pokemon.nombre}</h5>
              <button class="btn btn-danger" onclick="confirmarEliminacion(${pokemon.id}, '${pokemon.nombre}')">Eliminar de Favoritos</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function confirmarEliminacion(id, nombre) {
  // SweetAlert2 de confirmación
  Swal.fire({
    title: `¿Estás seguro de eliminar ${nombre} de tus favoritos?`,
    text: `Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarFavorito(id);
      Swal.fire(
        'Eliminado!',
        `${nombre} ha sido eliminado de tus favoritos.`,
        'success'
      );
    }
  });
}

function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(pokemon => pokemon.id !== id); 

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  cargarFavoritos(); 
}

cargarFavoritos();
