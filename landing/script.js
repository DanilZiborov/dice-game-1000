let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    alert(outcome === 'accepted' ? 'Приложение установлено!' : 'Установка отменена.');
    deferredPrompt = null;
  } else {
    alert('Установка недоступна в этом браузере.');
  }
});

document.getElementById('open-btn').addEventListener('click', () => {
  window.location.href = './app/';
});
