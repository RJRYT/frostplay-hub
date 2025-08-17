import { Workbox } from 'workbox-window';

interface PWAUpdateEvent {
  type: 'update-available' | 'updated';
  payload?: any;
}

type PWAEventListener = (event: PWAUpdateEvent) => void;

class PWAManager {
  private wb: Workbox | null = null;
  private listeners: PWAEventListener[] = [];
  private registration: ServiceWorkerRegistration | null = null;

  async init() {
    if ('serviceWorker' in navigator) {
      this.wb = new Workbox('/sw.js');
      
      this.wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      this.wb.addEventListener('waiting', () => {
        this.notifyListeners({ type: 'update-available' });
      });

      this.wb.addEventListener('activated', () => {
        this.notifyListeners({ type: 'updated' });
      });

      try {
        this.registration = await this.wb.register();
        console.log('SW registered: ', this.registration);
      } catch (registrationError) {
        console.log('SW registration failed: ', registrationError);
      }
    }
  }

  addEventListener(listener: PWAEventListener) {
    this.listeners.push(listener);
  }

  removeEventListener(listener: PWAEventListener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(event: PWAUpdateEvent) {
    this.listeners.forEach(listener => listener(event));
  }

  async skipWaiting() {
    if (this.wb) {
      this.wb.messageSkipWaiting();
    }
  }

  async update() {
    if (this.registration) {
      await this.registration.update();
    }
  }
}

export const pwaManager = new PWAManager();

// Install prompt handling
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export const showInstallPrompt = async (): Promise<boolean> => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    return outcome === 'accepted';
  }
  return false;
};

export const isInstallable = () => !!deferredPrompt;

export const isStandalone = () => 
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as any).standalone === true;