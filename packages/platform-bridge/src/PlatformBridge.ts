export interface IPlatformBridge {
  platformName: 'STEAM' | 'IOS' | 'ANDROID' | 'WEB';
  unlockAchievement(id: string): Promise<boolean>;
  setRichPresence(status: string, roomInfo?: string): Promise<void>;
  saveCloudData(key: string, payload: string): Promise<boolean>;
  loadCloudData(key: string): Promise<string | null>;
  purchaseProduct(productId: string): Promise<{ success: boolean; transactionId?: string }>;
}

export class PlatformBridge implements IPlatformBridge {
  public platformName: 'STEAM' | 'IOS' | 'ANDROID' | 'WEB' = 'WEB';

  constructor() {
    if (typeof window !== 'undefined' && (window as any).__TAURI__) {
      this.platformName = 'STEAM';
    } else if (typeof window !== 'undefined' && (window as any).Capacitor) {
      this.platformName = /iPad|iPhone|iPod/.test(navigator.userAgent) ? 'IOS' : 'ANDROID';
    } else {
      this.platformName = 'WEB';
    }
  }

  public async unlockAchievement(id: string): Promise<boolean> {
    console.log(`[PlatformBridge:${this.platformName}] Unlocked achievement: ${id}`);
    return true;
  }

  public async setRichPresence(status: string, roomInfo?: string): Promise<void> {
    console.log(`[PlatformBridge:${this.platformName}] Rich Presence: ${status} (${roomInfo || ''})`);
  }

  public async saveCloudData(key: string, payload: string): Promise<boolean> {
    try {
      localStorage.setItem(`tycoon_cloud_${key}`, payload);
      return true;
    } catch {
      return false;
    }
  }

  public async loadCloudData(key: string): Promise<string | null> {
    return localStorage.getItem(`tycoon_cloud_${key}`);
  }

  public async purchaseProduct(productId: string): Promise<{ success: boolean; transactionId?: string }> {
    console.log(`[PlatformBridge:${this.platformName}] Simulated IAP Purchase: ${productId}`);
    return {
      success: true,
      transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
  }
}

export const platform = new PlatformBridge();
