import { CreateData, UpdateInfo, QueryOptions } from './types';

class Windows {
  public static async get(windowId: number, getInfo?: QueryOptions): Promise<chrome.windows.Window> {
    return new Promise((resolve, reject) => {
      chrome.windows.get(windowId, getInfo || {}, (window) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(window);
        }
      });
    });
  }

  public static async getCurrent(getInfo?: QueryOptions): Promise<chrome.windows.Window> {
    return new Promise((resolve, reject) => {
      chrome.windows.getCurrent(getInfo || {}, (window) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(window);
        }
      });
    });
  }

  public static async getLastFocused(getInfo?: QueryOptions): Promise<chrome.windows.Window> {
    return new Promise((resolve, reject) => {
      chrome.windows.getLastFocused(getInfo || {}, (window) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(window);
        }
      });
    });
  }

  public static async getAll(getInfo?: QueryOptions): Promise<chrome.windows.Window[]> {
    return new Promise((resolve, reject) => {
      chrome.windows.getAll(getInfo || {}, (windows) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(windows);
        }
      });
    });
  }

  public static async create(createData?: CreateData): Promise<chrome.windows.Window> {
    return new Promise((resolve, reject) => {
      chrome.windows.create(createData || {}, (window) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          if (!window) reject(new Error('Window not created'));
          else resolve(window);
        }
      });
    });
  }

  public static async update(windowId: number, updateInfo: UpdateInfo): Promise<chrome.windows.Window> {
    return new Promise((resolve, reject) => {
      chrome.windows.update(windowId, updateInfo, (window) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(window);
        }
      });
    });
  }

  public static async remove(windowId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.windows.remove(windowId, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  public static addCreatedListener(callback: (window: chrome.windows.Window) => void): void {
    chrome.windows.onCreated.addListener(callback);
  }

  public static addRemovedListener(callback: (windowId: number) => void): void {
    chrome.windows.onRemoved.addListener(callback);
  }

  public static addFocusChangedListener(callback: (windowId: number) => void): void {
    chrome.windows.onFocusChanged.addListener(callback);
  }

  public static addBoundsChangedListener(callback: (window: chrome.windows.Window) => void): void {
    chrome.windows.onBoundsChanged.addListener(callback);
  }

  public static removeCreatedListener(callback: (window: chrome.windows.Window) => void): void {
    chrome.windows.onCreated.removeListener(callback);
  }

  public static removeRemovedListener(callback: (windowId: number) => void): void {
    chrome.windows.onRemoved.removeListener(callback);
  }

  public static removeFocusChangedListener(callback: (windowId: number) => void): void {
    chrome.windows.onFocusChanged.removeListener(callback);
  }

  public static removeBoundsChangedListener(callback: (window: chrome.windows.Window) => void): void {
    chrome.windows.onBoundsChanged.removeListener(callback);
  }
}

export { Windows };