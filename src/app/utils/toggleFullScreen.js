export const toggleFullScreen = () => {
  const el = document.documentElement;
  if (!document.fullscreenElement) {
    el.requestFullscreen?.().then(() => {
      if (screen.orientation?.lock) {
        screen.orientation.lock("landscape").catch((err) => console.error(err));
      }
    });
  } else {
    document.exitFullscreen?.().then(() => {
      if (screen.orientation?.unlock) screen.orientation.unlock();
    });
  }
};