let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Evita el mini-infobar de Chrome
  deferredPrompt = e;

  const btnInstalar = document.getElementById('btn-instalar');
  btnInstalar.style.display = 'inline-block';

  btnInstalar.addEventListener('click', () => {
    btnInstalar.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('👍 Usuario aceptó la instalación');
      } else {
        console.log('👎 Usuario rechazó la instalación');
      }
      deferredPrompt = null;
    });
  });
});
