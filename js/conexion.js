// Registro del Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log("Service Worker registrado ✅"))
    .catch(err => console.error("Error al registrar Service Worker ❌", err));
}

// Función para actualizar el estado de conexión
function actualizarEstadoConexion() {
  const circulo = document.getElementById('estado-circulo');
  const texto = document.getElementById('estado-texto');

  if (circulo && texto) {
    if (navigator.onLine) {
      circulo.style.backgroundColor = '#28a745'; // verde
      texto.textContent = 'Online';
    } else {
      circulo.style.backgroundColor = '#dc3545'; // rojo
      texto.textContent = 'Offline';
    }
  }
}

// Detectar cambios en el estado de conexión
window.addEventListener('online', actualizarEstadoConexion);
window.addEventListener('offline', actualizarEstadoConexion);
window.addEventListener('load', actualizarEstadoConexion);

