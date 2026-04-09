export const toggleFullScreen = () => {
  const el = document.documentElement;

  if (!document.fullscreenElement) {
    // Entra em Full Screen
    el.requestFullscreen?.().catch((err) => {
      console.error(`Erro ao tentar ativar Full Screen: ${err.message}`);
    });
  } else {
    // Sai do Full Screen
    document.exitFullscreen?.().catch((err) => {
      console.error(`Erro ao tentar sair do Full Screen: ${err.message}`);
    });
  }
};