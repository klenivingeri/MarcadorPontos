'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistry() {
  useEffect(() => {
    // Verificar se o navegador suporta Service Workers
    if (!('serviceWorker' in navigator)) {
      console.log('[App] Service Workers não são suportados neste navegador');
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('[App] Service Worker registrado com sucesso!');
        console.log('[App] Escopo:', registration.scope);

        // Verificar updates periodicamente
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[App] Nova versão do SW disponível');

          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Novo SW pronto e SW antigo ainda ativo
              console.log('[App] Nova versão pronta, recarregue para usar');
              
              // Notificar o novo SW para ativar
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });

        // Atualizar a cada hora
        setInterval(() => {
          registration.update();
        }, 3600000);
      } catch (error) {
        console.error('[App] Erro ao registrar Service Worker:', error);
      }
    };

    // Aguardar um pouco para garantir que a página está carregada
    window.addEventListener('load', registerServiceWorker);

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return null;
}
